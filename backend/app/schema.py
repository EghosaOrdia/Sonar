from pydantic import BaseModel


class Song(BaseModel):
    title: str
    artist: str
    fileName: str
    


class BatchSearchRequest(BaseModel):
    songs: list[Song]
