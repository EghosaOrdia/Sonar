import base64
import requests
from app.config import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

TOKEN_URL = "https://accounts.spotify.com/api/token"


class TokenStore:
    _access_token: str | None = None

    @property
    def access_token(self):
        if not self._access_token:
            self.refresh_access_token()
        return self._access_token

    def refresh_access_token(self):
        auth_header = base64.b64encode(
            f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()
        ).decode()

        headers = {
            "Authorization": f"Basic {auth_header}",
            "Content-Type": "application/x-www-form-urlencoded",
        }

        payload = {
            "grant_type": "client_credentials",
        }

        res = requests.post(TOKEN_URL, data=payload, headers=headers)
        res.raise_for_status()

        self._access_token = res.json()["access_token"]
