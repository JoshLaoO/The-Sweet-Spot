from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.orders import Error, OrderIn, OrderOut, OrderRepo
from queries.candy import CandyRepository

router = APIRouter()


@router.post("/orders", response_model=Union[OrderOut, Error])
def create_order(
    order: OrderIn,
    repo: OrderRepo = Depends(),
    candy_repo: CandyRepository = Depends(),
):
    return repo.create(order, candy_repo)


@router.get("/orders", response_model=Union[List[OrderOut], Error])
def get_all_orders(
    repo: OrderRepo = Depends(), candy_repo: CandyRepository = Depends()
):
    orders = repo.get_all(candy_repo)
    return orders


@router.get("/orders/{order_id}", response_model=Optional[OrderOut])
def get_one_order(
    response: Response,
    order_id: int,
    repo: OrderRepo = Depends(),
    candy_repo: CandyRepository = Depends(),
) -> OrderOut:
    order = repo.get_one(order_id, candy_repo)
    if order is None:
        response.status_code = 404
    return order


@router.put("/orders/{order_id}", response_model=Union[OrderOut, Error])
def update_order(
    order_id: int,
    order: OrderIn,
    repo: OrderRepo = Depends(),
    candy_repo: CandyRepository = Depends(),
):
    update = repo.update(order_id, order, candy_repo)
    return update


@router.delete("/orders/{order_id}", response_model=bool)
def delete_order(order_id: int, repo: OrderRepo = Depends()):
    return repo.delete(order_id)
