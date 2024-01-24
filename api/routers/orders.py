from fastapi import APIRouter, Depends
from typing import Union
from queries.orders import Error, OrderIn, OrderOut, OrderRepo

router = APIRouter()


@router.post("/orders", response_model=Union[OrderOut, Error])
def create_order(order: OrderIn, repo: OrderRepo = Depends()):
    return repo.create(order)
