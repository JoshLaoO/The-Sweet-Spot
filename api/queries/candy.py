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
    def get_one(self, candy_id: int) -> CandyOut:
        try:
            # connect
            with pool.connection() as conn:
                # cursor
                with conn.cursor() as db:
                    # run SELECT
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , business
                            , picture_url
                            , description
                            , price
                            , stock
                            FROM candy
                            WHERE id =%s
                        """,
                        [candy_id],
                    )
                    record = result.fetchone()
                    return self.record_to_candy_out(record)

        except Exception as e:
            print(e)
            return {"message": "Could not get candy"}

    def delete_candy(self, candy_id: int) -> bool:
        try:
            # connect
            with pool.connection() as conn:
                # cursor
                with conn.cursor() as db:
                    # run DELETE
                    db.execute(
                        """
                        DELETE FROM candy
                        WHERE id = %s
                        """,
                        [candy_id],
                    )
                    return True

        except Exception as e:
            print(e)
            return False

    def update(self, candy_id: int, candy: CandyIn) -> Union[CandyOut, Error]:
        try:
            # connect
            with pool.connection() as conn:
                # cursor
                with conn.cursor() as db:
                    # run UPDATE
                    db.execute(
                        """
                        UPDATE candy
                        SET name = %s
                            , picture_url = %s
                            , description = %s
                            , price = %s
                            , stock = %s
                            WHERE id =%s
                        """,
                        [
                            candy.name,
                            candy.picture_url,
                            candy.description,
                            candy.price,
                            candy.stock,
                            candy_id,
                        ],
                    )
                    return self.candy_in_to_out(candy_id, candy)
        except Exception as e:
            print(e)
            return {"message": "Could not get candy"}

    def get_all(self) -> Union[List[CandyOut], Error]:
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

                    return [self.record_to_candy_out(record) for record in db]
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
                return self.candy_in_to_out(id, candy)

    def candy_in_to_out(self, id: int, candy: CandyIn):
        old_data = candy.dict()
        return CandyOut(id=id, **old_data)

    def record_to_candy_out(self, record):
        return CandyOut(
            id=record[0],
            name=record[1],
            business=record[2],
            picture_url=record[3],
            description=record[4],
            price=record[5],
            stock=record[6],
        )
