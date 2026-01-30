from pydantic import BaseModel


class Song(BaseModel):
    title: str
    artist: str
    fileName: str | None = None
    size: int | None = None
    duration: float | None = None


class BatchSearchRequest(BaseModel):
    songs: list[Song]
