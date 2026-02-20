from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.spotify.routes import router as spotify_router

app = FastAPI(title="Spotify playlist backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5173/#pickfolder",
        "https://spot-sync-omega.vercel.app",
        "https://spot-sync-omega.vercel.app/#pickfolder",
        "http://localhost:5173/",
        "http://localhost:5173/#pickfolder/",
        "https://spot-sync-omega.vercel.app/",
        "https://spot-sync-omega.vercel.app//#pickfolder/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(spotify_router, prefix="/spotify")
