from pydantic import BaseModel
from typing import Optional

class CandyIn(BaseModel):
    name: str
    business: Optional[int]
    picture_url: str
    description: str
    price: float
    stock: int
