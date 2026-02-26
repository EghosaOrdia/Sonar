import requests
import uuid
from app.spotify.token import TokenStore

SEARCH_URL = "https://api.spotify.com/v1/search"
tokenStore = TokenStore()


def _search_tracks(song_title: str, artist_name: str, limit: int = 5):
    query = f"track:{song_title} artist:{artist_name}"
    if song_title == artist_name:
        query = f"track:{song_title}"
    params = {"q": query, "type": "track", "limit": limit}

    def make_request():
        try:
            return requests.get(
                SEARCH_URL,
                params=params,
                headers={"Authorization": f"Bearer {tokenStore.access_token}"},
                timeout=10,
            )
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None

    response = make_request()
    if response is None:
        return None

    if response.status_code == 401:
        print("Token expired, refreshing...")
        try:
            refresh_success = tokenStore.refresh_access_token()
            if not refresh_success:
                print("Token refresh failed")
                return None
            response = make_request()
            if response is None:
                return None
        except Exception as e:
            print(f"Error during token refresh: {e}")
            return None

    if not response.ok:
        print(f"Request failed with status {response.status_code}: {response.text}")
        return None

    try:
        data = response.json()
        return data.get("tracks", {}).get("items", [])
    except ValueError as e:
        print(f"Failed to parse JSON: {e}")
        return None


def _format_track(item):
    unique_id = uuid.uuid4()
    images = item["album"].get("images", [])

    return {
        "id": unique_id,
        "track_name": item["name"],
        "artist": item["artists"][0]["name"],
        "uri": item["uri"],
        "thumbnail": images[0]["url"] if images else None,
        "duration": item["duration_ms"],
    }


def search_track(song_title: str, artist_name: str):
    tracks = _search_tracks(song_title, artist_name)
    if not tracks:
        return {
            "id": uuid.uuid4().hex[:4],
            "track_name": song_title,
            "artist": artist_name,
            "uri": None,
            "thumbnail": None,
            "duration": None,
            "found": False,
        }

    song_query = song_title.lower().strip()
    artist_query = artist_name.lower().strip()

    for item in tracks:
        track_name = item["name"].lower()
        artists = [a["name"].lower() for a in item["artists"]]

        if song_query in track_name and any(artist_query in a for a in artists):
            result = _format_track(item)
            result["found"] = True
            return result

    result = _format_track(tracks[0])
    result["found"] = True
    return result


def search_single_track(song_title: str, artist_name: str):
    tracks = _search_tracks(song_title, artist_name, limit=10)
    curated_tracks = []
    if not tracks or len(tracks) == 0:
        return None
    for track in tracks:
        curated_tracks.append(_format_track(track))
    return curated_tracks
