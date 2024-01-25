from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.candy import Error, CandyIn, CandyOut, CandyRepository


router = APIRouter()


@router.post("/candy", response_model=Union[CandyOut, Error])
def create_candy(
    candy: CandyIn, response: Response, repo: CandyRepository = Depends()
):
    try:
        new_candy = repo.create(candy)
        return new_candy

    except Exception as e:
        print(e)
        response.status_code = 400


@router.get("/candy", response_model=List[CandyOut])
def get_all(
    repo: CandyRepository = Depends(),
):

    return repo.get_all()
