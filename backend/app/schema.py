from pydantic import BaseModel


class Song(BaseModel):
    title: str
    artist: str


class BatchSearchRequest(BaseModel):
    songs: list[Song]
