from dotenv import load_dotenv
import os

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
ACOUSTID_KEY = os.getenv("ACOUSTID_KEY")
ACOUSTIC_LOOKUP_ENDPOINT = "https://api.acoustid.org/v2/lookup"
