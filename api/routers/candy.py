from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.candy import Error, CandyIn, CandyOut, CandyRepository


router = APIRouter()


@router.post("/candy", response_model=Union[CandyOut, Error])
async def create_candy(
    candy: CandyIn,
    response: Response,
    repo: CandyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        try:
            new_candy = repo.create(candy)
            return new_candy

        except Exception:
            response.status_code = 400


@router.get("/candy", response_model=List[CandyOut])
def get_all(
    repo: CandyRepository = Depends(),
):
    return repo.get_all()


@router.put("/candy/{id}", response_model=Union[CandyOut, Error])
def update_candy(
    candy_id: int,
    candy: CandyIn,
    repo: CandyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, CandyOut]:
    if account_data:
        return repo.update(candy_id, candy)


@router.delete("/candy/{id}", response_model=bool)
def delete_candy(
    candy_id: int,
    repo: CandyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data:
        return repo.delete_candy(candy_id)


@router.get("/candy/{id}", response_model=Union[CandyOut, Error])
def get_one_candy(
    candy_id: int,
    response: Response,
    repo: CandyRepository = Depends(),
) -> CandyOut:
    candy = repo.get_one(candy_id)
    if candy is None:
        response.status_code = 404
    return candy
