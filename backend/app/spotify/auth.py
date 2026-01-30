# import base64
# import requests
# from urllib.parse import urlencode
# from app.config import (
#     SPOTIFY_CLIENT_ID,
#     SPOTIFY_CLIENT_SECRET,
#     SPOTIFY_REDIRECT_URI,
# )
# from app.spotify.token import TokenStore


# SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
# SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"

# SCOPES = [
#     "playlist-modify-private",
#     "playlist-modify-public",
#     "playlist-read-private",
# ]

# tokenStore = TokenStore()


# def get_auth_url():
#     params = {
#         "client_id": SPOTIFY_CLIENT_ID,
#         "response_type": "code",
#         "redirect_uri": SPOTIFY_REDIRECT_URI,
#         "scope": " ".join(SCOPES),
#     }
#     return f"{SPOTIFY_AUTH_URL}?{urlencode(params)}"


# def exchange_code_for_token(code: str):
#     auth_header = base64.b64encode(
#         f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()
#     ).decode()

#     headers = {
#         "Authorization": f"Basic {auth_header}",
#         "Content-Type": "application/x-www-form-urlencoded",
#     }

#     payload = {
#         "grant_type": "authorization_code",
#         "code": code,
#         "redirect_uri": SPOTIFY_REDIRECT_URI,
#     }

#     response = requests.post(SPOTIFY_TOKEN_URL, headers=headers, data=payload)
#     response.raise_for_status()

#     data = response.json()

#     # 🔑 Store tokens in your token store
#     # tokenStore.access_token = data["access_token"]

#     # Store refresh token (Spotify only sends this once)
#     # token_store.refresh_token = data.get("refresh_token")

#     # Optional: print for debugging
#     print("ACCESS TOKEN:", token_store.access_token)
#     print("REFRESH TOKEN:", token_store.refresh_token)

#     return data
