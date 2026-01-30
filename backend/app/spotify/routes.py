from fastapi import APIRouter, Request
from typing import List
from fastapi.responses import RedirectResponse

# from app.spotify.auth import get_auth_url, exchange_code_for_token
from app.spotify.client import SpotifyClient
from app.spotify.search import search_track
from pydantic import BaseModel
from app.schema import Song


class SearchRequest(BaseModel):
    query: str


router = APIRouter()

# TEMP storage (replace with DB/Redis later)
TOKENS = {}


@router.get("/me")
def me():
    return {"authenticated": "access_token" in TOKENS}


# @router.get("/login")
# def login():
#     return RedirectResponse(get_auth_url())


# @router.get("/auth/callback")
# def callback(code: str):
#     token_data = exchange_code_for_token(code)
#     TOKENS["access_token"] = token_data["access_token"]
#     return {"status": "authenticated"}


@router.post("/search")
def search_song(song: Song):
    match = search_track(song.title, song.artist)
    return {"match": match}


@router.post("/playlist")
def create_playlist(name: str, user_id: str):
    client = SpotifyClient(TOKENS["access_token"])
    return client.create_playlist(user_id, name)


@router.post("/playlist/add")
def add_to_playlist(playlist_id: str, track_uris: list[str]):
    client = SpotifyClient(TOKENS["access_token"])
    return client.add_tracks(playlist_id, track_uris)


@router.post("/search/batch")
def batch_search(songs: List[Song]):
    results = []

    for song in songs:
        match = search_track(song.title, song.artist)
        results.append({"match": match})

    return {
        "total": len(songs),
        "matched": sum(1 for r in results if r["match"]),
        "results": results,
    }
