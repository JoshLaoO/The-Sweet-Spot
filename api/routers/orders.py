from fastapi import APIRouter, Depends
from typing import Union, List
from queries.orders import Error, OrderIn, OrderOut, OrderRepo

router = APIRouter()


@router.post("/orders", response_model=Union[OrderOut, Error])
def create_order(order: OrderIn, repo: OrderRepo = Depends()):
    return repo.create(order)


@router.get("/orders", response_model=Union[List[OrderOut], Error])
def get_all_orders(repo: OrderRepo = Depends()):
    orders = repo.get_all()
    print(orders)
    return orders
