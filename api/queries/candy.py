from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class CandyIn(BaseModel):
    name: str
    business: Optional[int]
    picture_url: str
    description: str
    price: float
    stock: int


class CandyRepository:
    def create(candy: CandyIn):
        # connect
        with pool.connection() as conn:
            # cursor
            with conn.cursor() as db:
                # run INSERT
                result = db.execute(
                    """
                INSERT INTO candy(name, business, picture_url,
                description, price, stock)
                VALUES(%s, %s, %s, %s, %s, %s)
                RETURNING id;
                """,
                    [
                        candy.name,
                        candy.business,
                        candy.picture_url,
                        candy.description,
                        candy.price,
                        candy.stock,
                    ],
                )
                print(result)
                # return data
