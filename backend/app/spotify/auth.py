import base64
import requests
from urllib.parse import urlencode
from app.config import (
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
)
from app.spotify.token import TokenStore


SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"

SCOPES = [
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-private",
    "user-read-private",
    "user-read-email",
]

tokenStore = TokenStore()
SESSION_STORE: dict[str, dict] = {}


def get_auth_url(session_id: str) -> str:
    params = {
        "client_id": SPOTIFY_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "scope": " ".join(SCOPES),
        "state": session_id,
    }
    return f"{SPOTIFY_AUTH_URL}?{urlencode(params)}"


def exchange_code_for_token(code: str, session_id: str) -> dict:
    auth_header = base64.b64encode(
        f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()
    ).decode()

    headers = {
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
    }

    response = requests.post(SPOTIFY_TOKEN_URL, headers=headers, data=payload)
    response.raise_for_status()
    data = response.json()

    SESSION_STORE[session_id] = {
        "access_token": data["access_token"],
        "refresh_token": data.get("refresh_token"),
    }

    return data
    # Optional: print for debugging
    # print("ACCESS TOKEN:", tokenStore.access_token)
    # print("REFRESH TOKEN:", tokenStore.refresh_token)


def refresh_user_token(session_id: str) -> str | None:
    session = SESSION_STORE.get(session_id)
    if not session or not session.get("refresh_token"):
        return None

    auth_header = base64.b64encode(
        f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()
    ).decode()

    response = requests.post(
        SPOTIFY_TOKEN_URL,
        headers={
            "Authorization": f"Basic {auth_header}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data={
            "grant_type": "refresh_token",
            "refresh_token": session["refresh_token"],
        },
    )

    if not response.ok:
        return None

    new_token = response.json()["access_token"]
    SESSION_STORE[session_id]["access_token"] = new_token
    return new_token


def get_session_token(session_id: str) -> str | None:
    session = SESSION_STORE.get(session_id)
    return session["access_token"] if session else None


def clear_session(session_id: str):
    SESSION_STORE.pop(session_id, None)
