import requests

BASE_URL = "https://api.spotify.com/v1"


class SpotifyClient:
    def __init__(self, access_token: str):
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

    def search_track(self, query: str):
        params = {
            "q": query,
            "type": "track",
            "limit": 5,
        }
        r = requests.get(f"{BASE_URL}/search", headers=self.headers, params=params)
        r.raise_for_status()
        return r.json()

    def create_playlist(self, user_id: str, name: str, public=False):
        payload = {
            "name": name,
            "public": public,
        }
        r = requests.post(
            f"{BASE_URL}/me/playlists",
            headers=self.headers,
            json=payload,
        )
        if not r.ok:
            raise Exception(f"Spotify error {r.status_code}: {r.text}")
        return r.json()

    def add_tracks(self, playlist_id: str, track_uris: list[str]):
        payload = {"uris": track_uris}
        r = requests.post(
            f"{BASE_URL}/playlists/{playlist_id}/items",
            headers=self.headers,
            json=payload,
        )
        r.raise_for_status()
        return r.json()

    def get_current_user(self):
        r = requests.get(f"{BASE_URL}/me", headers=self.headers)
        r.raise_for_status()
        return r.json()
