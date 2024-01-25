from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class CandyIn(BaseModel):
    name: str
    business: Optional[int]
    picture_url: str
    description: str
    price: float
    stock: int


class CandyOut(BaseModel):
    id: int
    name: str
    business: Optional[int]
    picture_url: str
    description: str
    price: float
    stock: int


class CandyRepository:
    def get_all(self) -> Union[Error, List[CandyOut]]:
        try:
            # connect
            with pool.connection() as conn:
                # cursor
                with conn.cursor() as db:
                    # run SELECT
                    db.execute(
                        """
                        SELECT id, name, business,  picture_url,
                        description, price, stock
                        FROM candy;
                        """
                    )

                    return [
                        CandyOut(
                            id=record[0],
                            name=record[1],
                            business=record[2],
                            picture_url=record[3],
                            description=record[4],
                            price=record[5],
                            stock=record[6],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all candies"}

    def create(self, candy: CandyIn) -> CandyOut:
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
                id = result.fetchone()[0]
                # return data
                old_data = candy.dict()
                return CandyOut(id=id, **old_data)
