from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.orders import Error, OrderIn, OrderOut, OrderRepo

router = APIRouter()


@router.post("/orders", response_model=Union[OrderOut, Error])
def create_order(order: OrderIn, repo: OrderRepo = Depends()):
    return repo.create(order)

@router.get("/orders",response_model=Union[List[OrderOut],Error])
def get_all_orders(
    repo: OrderRepo =  Depends()
):
    orders = repo.get_all()
    print(orders)
    return orders


@router.get("/orders/{order_id}", response_model=Optional[OrderOut])
def get_one_order(
    response: Response, order_id: int, repo: OrderRepo = Depends()
) -> OrderOut:
    order = repo.get_one(order_id)
    if order is None:
        response.status_code = 404
    return order
