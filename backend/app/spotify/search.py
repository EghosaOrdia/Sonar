import requests
from app.spotify.token import TokenStore

SEARCH_URL = "https://api.spotify.com/v1/search"
tokenStore = TokenStore()


def search_track(song_title: str, artist_name: str):
    query = f"track:{song_title} artist:{artist_name}"
    params = {"q": query, "type": "track", "limit": 5}

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

    data = response.json()
    tracks = data.get("tracks", {}).get("items", [])
    if not tracks:
        return None

    song_query = song_title.lower().strip()
    artist_query = artist_name.lower().strip()

    for item in tracks:
        track_name = item["name"].lower()
        artists = [a["name"].lower() for a in item["artists"]]

        if song_query in track_name and any(artist_query in a for a in artists):
            return {
                "track_name": item["name"],
                "artist": item["artists"][0]["name"],
                "uri": item["uri"],
                "thumbnail": item["album"]["images"][0]["url"],
                "duration": item["duration_ms"],
            }

    top_hit = tracks[0]
    return {
        "track_name": top_hit["name"],
        "artist": top_hit["artists"][0]["name"],
        "uri": top_hit["uri"],
        "thumbnail": top_hit["album"]["images"][0].get("url"),
        "duration": top_hit["duration_ms"],
    }


def search_single_track(song_title: str, artist_name: str):
    query = f"track:{song_title} artist:{artist_name}"
    params = {"q": query, "type": "track", "limit": 5}

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

    data = response.json()
    tracks = data.get("tracks", {}).get("items", [])
    if not tracks:
        return None

    return tracks
