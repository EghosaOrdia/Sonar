from fastapi import APIRouter, Request, HTTPException, Query, Header
from typing import List, Annotated
from fastapi.responses import RedirectResponse

from app.spotify.auth import (
    get_auth_url,
    exchange_code_for_token,
    get_session_token,
    refresh_user_token,
    clear_session,
)
from app.spotify.client import SpotifyClient
from app.spotify.search import search_track, search_single_track
from pydantic import BaseModel
from app.schema import Song


router = APIRouter()
FRONTEND_URL = "http://localhost:5173"


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
    match = search_single_track(song.title, song.artist)
    return {"match": match}


@router.post("/search/batch")
def batch_search(songs: List[Song]):
    results = [{"match": search_track(s.title, s.artist)} for s in songs]

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
