from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class OrderIn(BaseModel):
    candy_id: Union[int, None]
    quantity: int


class OrderOut(BaseModel):
    id: int
    candy_id: Union[int, None]
    quantity: int

class OrderRepo:
    def create(self, order: OrderIn) -> Union[OrderOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO orders
                            (candy_id,quantity)
                        VALUES
                            (%s,%s)
                        RETURNING id;
                        """,
                        [order.candy_id, order.quantity],
                    )
                    id = result.fetchone()[0]
                    return self.order_into_out(id, order)
        except Exception as e:
            return {"Error": e}

    def get_all(self) -> Union[List[OrderOut],Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM orders
                        """
                    )
                    return [
                        self.record_to_out(record)
                        for record in db
                    ]
        except Exception as e:
            return {"Error": e}

    def get_one(self, order_id: int) -> Optional[OrderOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , candy_id
                             , quantity
                        FROM orders
                        WHERE id = %s
                        """,
                        [order_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_out(record)
        except Exception as e:
            return {"Error": e}

    def record_to_out(self, record):
        return OrderOut(
            id=record[0],
            candy_id=record[1],
            quantity=record[2]
        )

    def order_into_out(self, id: int, order: OrderIn):
        old_data = order.dict()
        return OrderOut(id=id, **old_data)
