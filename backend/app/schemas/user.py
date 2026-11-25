from typing import Optional
from pydantic import BaseModel
class UserCreate(BaseModel):
    name: Optional[str] = None
    password: str
    email: str