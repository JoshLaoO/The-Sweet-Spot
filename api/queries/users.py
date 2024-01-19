from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    business: int
    email: str
    picture_url: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    business: int
    email: str
    picture_url: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepo:
    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "id": record[0],
            "business": record[1],
            "email": record[2],
            "picture_url": record[3],
            "username": record[4],
            "hashed_password": record[5],
        }

        return account_dict


    def create(self, user: AccountIn,
               hashed_password: str) -> AccountOutWithPassword:
        try:
            print("USER",user)
            print("HASHED",hashed_password)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (business,
                            email,
                            picture_url,
                            username,
                            hashed_password)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING
                        id,
                        business,
                        email,
                        picture_url,
                        username,
                        hashed_password;
                        """,
                        [
                            user.business,
                            user.email,
                            user.picture_url,
                            user.username,
                            hashed_password,
                        ]
                    )
                    print("insert worked?")
                    id = result.fetchone()[0]
                    print("ID GOTTEN",id)
                    return AccountOutWithPassword(
                        id=id,
                        business=user.business,
                        email=user.email,
                        picture_url=user.picture_url,
                        username=user.username,
                        hashed_password=hashed_password,
                    )
        except Exception:
            return {"message": "Could not create a user"}

    def get(self, email: str) -> AccountOutWithPassword:
        try:
            print("email",email)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        business,
                        email,
                        picture_url,
                        username,
                        hashed_password
                        FROM users
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    print("record found",record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}

    def get_all_businesses(self) -> Union[Error,List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT * FROM users
                        WHERE business = 1
                        """
                    )
                    return [
                        self.record_to_account_out(record)
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all businesses" }
