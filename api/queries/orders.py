from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool
from queries.candy import CandyOut, CandyRepository


class Error(BaseModel):
    message: str


class OrderIn(BaseModel):
    candy_id: int
    quantity: int
    sold: bool


class OrderOut(BaseModel):
    id: int
    candy_id: CandyOut
    quantity: int
    sold: bool


class OrderRepo:
    def create(
        self, order: OrderIn, candy_repo: CandyRepository
    ) -> Union[OrderOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO orders
                            (candy_id,quantity)
                        VALUES
                            (%s,%s)
                        RETURNING id;
                        """,
                        [order.candy_id, order.quantity],
                    )

                    id = db.fetchone()[0]
                    return self.order_into_out(id, order, candy_repo)
        except Exception:
            return {"Error": "Could not create candy"}

    def get_all(
        self, candy_repo: CandyRepository
    ) -> Union[Error, List[OrderOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM orders
                        """
                    )
                    return [
                        self.record_to_out(record, candy_repo) for record in db
                    ]
        except Exception:
            return {"Error": "Could not get all orders"}

    def get_one(
        self, order_id: int, candy_repo: CandyRepository
    ) -> Optional[OrderOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , candy_id
                             , quantity
                             , sold
                        FROM orders
                        WHERE id = %s
                        """,
                        [order_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_out(record, candy_repo)
        except Exception:
            return {"message": "Could not get order"}

    def update(
        self, order_id: int, order: OrderIn, candy_repo: CandyRepository
    ) -> Union[OrderOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE orders
                        SET candy_id = %s,
                            quantity = %s,
                            sold = %s
                        WHERE id = %s
                        RETURNING
                            id,
                            candy_id,
                            quantity,
                            sold
                        """,
                        [order.candy_id, order.quantity, order.sold, order_id],
                    )
                    record = db.fetchone()
                    return self.record_to_out(record, candy_repo)
        except Exception:
            return {"message": "Could not update order"}

    def delete(self, order_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM orders
                        WHERE id = %s
                        """,
                        [order_id],
                    )
                    return True
        except Exception:
            return False

    def record_to_out(self, record, candy_repo: CandyRepository):
        candy = candy_repo.get_one(record[1])
        return OrderOut(
            id=record[0], candy_id=candy, quantity=record[2], sold=record[3]
        )

    def order_into_out(
        self, id: int, order: OrderIn, candy_repo: CandyRepository
    ):
        old_data = order.dict()
        old_data["candy_id"] = candy_repo.get_one(order.candy_id)

        return OrderOut(id=id, **old_data)
