from pydantic import BaseModel
from typing import Optional, List

class UserModel(BaseModel):
    username: str
    password: str
    shared_blogs: List[str] = []
    email: Optional[str] = None
