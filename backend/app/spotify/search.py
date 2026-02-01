import requests
from app.spotify.token import TokenStore

SEARCH_URL = "https://api.spotify.com/v1/search"
tokenStore = TokenStore()


def _search_tracks(song_title: str, artist_name: str, filename: str, limit: int = 5):
    if song_title == "":
        song_title = filename
    if artist_name == "":
        artist_name = filename

    query = f"track:{song_title} artist:{artist_name}"
    params = {"q": query, "type": "track", "limit": limit}

    def make_request():
        return requests.get(
            SEARCH_URL,
            params=params,
            headers={"Authorization": f"Bearer {tokenStore.access_token}"},
        )

    response = make_request()

    if response.status_code == 401:
        tokenStore.refresh_access_token()
        response = make_request()

    if not response.ok:
        return None

    return response.json().get("tracks", {}).get("items", [])


def _format_track(item):
    images = item["album"].get("images", [])

    return {
        "track_name": item["name"],
        "artist": item["artists"][0]["name"],
        "uri": item["uri"],
        "thumbnail": images[0]["url"] if images else None,
        "duration": item["duration_ms"],
    }


def search_track(song_title: str, artist_name: str, filename: str):
    tracks = _search_tracks(song_title, artist_name, filename)
    if not tracks:
        return None

    song_query = song_title.lower().strip()
    artist_query = artist_name.lower().strip()

    for item in tracks:
        track_name = item["name"].lower()
        artists = [a["name"].lower() for a in item["artists"]]

        if song_query in track_name and any(artist_query in a for a in artists):
            return _format_track(item)

    return _format_track(tracks[0])


def search_single_track(song_title: str, artist_name: str, filename: str):
    return _search_tracks(song_title, artist_name, filename)
