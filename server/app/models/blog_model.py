from pydantic import BaseModel
from typing import Optional

class BlogModel(BaseModel):
    id: Optional[str] = None
    author: str
    title: str
    content: str
    shared_with: Optional[str] = None
