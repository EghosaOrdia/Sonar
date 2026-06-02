from fastapi import APIRouter, Request, HTTPException, Query, Header, UploadFile, File
from typing import List, Annotated
from fastapi.responses import RedirectResponse, StreamingResponse
import httpx
import json
import subprocess
import base64
import acoustid
import os

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
from app.config import ACOUSTID_KEY, ACOUSTIC_LOOKUP_ENDPOINT
import tempfile

router = APIRouter()
# FRONTEND_URL = "http://localhost:5173"
FRONTEND_URL = "https://spot-sync-omega.vercel.app"
ACOUSTID_URL = "https://api.acoustid.org/v2/lookup"
MUSICBRAINZ_URL = "https://musicbrainz.org/ws/2"
USER_AGENT = "http://localhost:5173/test/1.0.0 (eghordia130@gmail.com)"


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
    def generate():
        for s in songs:
            match = search_track(s.title, s.artist, s.fileName)
            result = {"match": match}
            yield f"data: {json.dumps(result)}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
    # results = [{"match": search_track(s.title, s.artist, s.fileName)} for s in songs]

    # return {
    #     "total": len(songs),
    #     "matched": sum(1 for r in results if r["match"]),
    #     "results": results,
    # }


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
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
        temp_file.write(await file.read())
        temp_path = temp_file.name

    result = subprocess.run(
        ["fpcalc", "-json", temp_path], capture_output=True, text=True, check=True
    )

    duration, fingerprint = acoustid.fingerprint_file(temp_path)
    # fingerprint_data = json.loads(result.stdout)

    # response = list(
    #     acoustid.match(ACOUSTID_KEY, temp_path, meta="recordings+releasegroups+artists")
    # )

    response = requests.get(
        "https://api.acoustid.org/v2/lookup",
        params={
            "client": ACOUSTID_KEY,
            "duration": int(duration),
            "fingerprint": fingerprint,
            "meta": "recordings+releasegroups+artists",
        },
    )
    # print(response.request.url)
    # print(response.json())
    recording_id = "72ea8aab-7ffb-4731-adeb-32afd7c906fd"
    mb_response = requests.get(
        f"{MUSICBRAINZ_URL}/recording/{recording_id}",
        params={
            "inc": "artists+releases+release-groups+isrcs+tags+genres",
            "fmt": "json",
        },
        headers={"User-Agent": USER_AGENT},  # MusicBrainz requires this
    )
    mb_data = mb_response.json()
    mb_response.raise_for_status()
    print(mb_response.request.url)
    print(mb_data)
    return response.json()
