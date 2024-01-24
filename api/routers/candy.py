from fastapi import APIRouter
from queries.candy import CandyIn


router = APIRouter()


@router.post("/candy")
def create_candy(candy: CandyIn):
    print('candy', candy.name)
    return candy
