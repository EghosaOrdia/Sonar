import base64
import requests
from urllib.parse import urlencode
from app.config import (
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
)
from fastapi import Request
import httpx
from app.spotify.token import TokenStore


SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"

SCOPES = [
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-private",
]

tokenStore = TokenStore()
_sessions: dict[str, dict] = {}


def get_auth_url():
    params = {
        "client_id": SPOTIFY_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "scope": " ".join(SCOPES),
    }
    return f"{SPOTIFY_AUTH_URL}?{urlencode(params)}"


def exchange_code_for_token(code: str):
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

    # 🔑 Store tokens in your token store
    # tokenStore.access_token = data["access_token"]

    # Store refresh token (Spotify only sends this once)
    # token_store.refresh_token = data.get("refresh_token")

    # Optional: print for debugging
    # print("ACCESS TOKEN:", tokenStore.access_token)
    # print("REFRESH TOKEN:", tokenStore.refresh_token)

    return data


def get_session(request: Request) -> dict | None:
    """Pull the session dict for this request using the cookie token."""
    token = request.cookies.get("session_token")
    if not token:
        return None
    return _sessions.get(token)


async def refresh_access_token(session: dict) -> str:
    """Use the refresh token to get a new access token; updates session in place."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            SPOTIFY_TOKEN_URL,
            data={
                "grant_type": "refresh_token",
                "refresh_token": session["refresh_token"],
            },
            auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
        )
    resp.raise_for_status()
    data = resp.json()
    session["access_token"] = data["access_token"]
    if "refresh_token" in data:  # Spotify may rotate it
        session["refresh_token"] = data["refresh_token"]
    return session["access_token"]


async def spotify_get(url: str, session: dict) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            url, headers={"Authorization": f"Bearer {session['access_token']}"}
        )
    if resp.status_code == 401:  # Token expired → refresh and retry
        token = await refresh_access_token(session)
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers={"Authorization": f"Bearer {token}"})
    resp.raise_for_status()
    return resp.json()


async def spotify_post(url: str, session: dict, payload: dict) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            url,
            json=payload,
            headers={
                "Authorization": f"Bearer {session['access_token']}",
                "Content-Type": "application/json",
            },
        )
    if resp.status_code == 401:
        token = await refresh_access_token(session)
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                url,
                json=payload,
                headers={
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json",
                },
            )
    resp.raise_for_status()
    return resp.json()
