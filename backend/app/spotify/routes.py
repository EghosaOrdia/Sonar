from fastapi import APIRouter, Request, HTTPException, Query, Header, UploadFile, File
from typing import List, Annotated
from fastapi.responses import RedirectResponse
import httpx

from app.spotify.auth import (
    get_auth_url,
    exchange_code_for_token,
    get_session_token,
    refresh_user_token,
    clear_session,
)
from app.spotify.client import SpotifyClient
from app.spotify.search import (
    search_track,
    search_single_track,
    generate_fingerprint,
    extract_fingerprint_from_bytes,
)
from pydantic import BaseModel
from app.schema import Song
import requests
from app.config import ACOUSTIC_KEY, ACOUSTIC_LOOKUP_ENDPOINT
import tempfile

router = APIRouter()
# FRONTEND_URL = "http://localhost:5173"
FRONTEND_URL = "https://spot-sync-omega.vercel.app"


def get_client(session_id: str) -> SpotifyClient:
    token = get_session_token(session_id)
    if not token:
        raise HTTPException(status_code=401, detail="Not Authenticated, please log in")
    return SpotifyClient(token)


@router.get("/login")
def login(session_id: str = Query(...)):
    return RedirectResponse(get_auth_url(session_id))


@router.get("/auth/callback")
def callback(code: str, state: str):
    token_data = exchange_code_for_token(code, session_id=state)
    return RedirectResponse(f"{FRONTEND_URL}?authenticated=true&session_id={state}")


@router.get("/user/profile")
def get_user_profile(session_id: Annotated[str, Header()]):
    client = get_client(session_id)
    user = client.get_current_user()
    return {
        "display_name": user.get("display_name"),
        "product": user.get("product"),
        "images": user.get("images", []),
        "id": user.get("id"),
    }


@router.get("/debug/session")
def debug_session(session_id: Annotated[str | None, Header()] = None):
    from app.spotify.auth import SESSION_STORE

    return {
        "session_id_received": session_id,
        "keys_in_store": list(SESSION_STORE.keys()),
        "found": session_id in SESSION_STORE if session_id else False,
    }


@router.get("/me")
def me(session_id: Annotated[str | None, Header()] = None):
    if not session_id or not get_session_token(session_id):
        return {"authenticated": False}
    return {"authenticated": True}


@router.delete("/session")
def logout(session_id: Annotated[str, Header()]):
    clear_session(session_id)
    return {"status": "cleared"}


@router.post("/search")
def search_song(song: Song):
    match = search_single_track(song.title, song.artist, song.fileName)
    return {"match": match}


@router.post("/search/batch")
def batch_search(songs: List[Song]):
    results = [{"match": search_track(s.title, s.artist, s.fileName)} for s in songs]

    return {
        "total": len(songs),
        "matched": sum(1 for r in results if r["match"]),
        "results": results,
    }


class PlayListRequest(BaseModel):
    name: str
    public: bool = False


@router.post("/playlist")
def create_playlist(body: PlayListRequest, session_id: Annotated[str, Header()]):
    try:
        client = get_client(session_id)
        user = client.get_current_user()
        playlist = client.create_playlist(user["id"], body.name, body.public)
        return {
            "playlist_id": playlist["id"],
            "playlist_url": playlist["external_urls"]["spotify"],
            "name": playlist["name"],
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


class AddTracksRequest(BaseModel):
    playlist_id: str
    track_uris: List[str]


@router.post("/playlist/add")
def add_to_playlist(
    body: AddTracksRequest,
    session_id: Annotated[str, Header()],
):
    client = get_client(session_id)
    result = client.add_tracks(body.playlist_id, body.track_uris)
    return result


@router.post("/fingerprint-identify")
async def identify_song(file: UploadFile = File(...)):
    allowed = {".mp3", ".wav", ".flac", ".m4a", ".ogg"}
    filename = file.filename or ""
    if "." not in filename:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    suffix = "." + filename.rsplit(".", 1)[-1].lower()
    if suffix not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    audio_bytes = await file.read()

    try:
        result = extract_fingerprint_from_bytes(audio_bytes, suffix=suffix)
        fingerprint = result["fingerprint"]
        duration = result["duration"]

        async with httpx.AsyncClient() as client:
            response = requests.get(
                "https://api.acoustid.org/v2/lookup",
                params={
                    "client": ACOUSTIC_KEY,
                    "meta": "recordings",
                    "fingerprint": fingerprint,
                    "duration": duration,
                },
            )
        data = response.json()

        artist = data["results"][0]["recordings"][0]["artists"][0]["name"]
        title = data["results"][0]["recordings"][0]["title"]

        match = search_single_track(title, artist, title)

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Fingerprint extraction failed: {e}"
        )

    return {"match": match}
    results[0]["recordings"][0]["artists"][0]["name"]
    results[0]["recordings"][0]["title"]
