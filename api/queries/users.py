from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool
import hashlib


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class BusinessIn(BaseModel):
    business_name: str
    business_email: str


class BusinessOut(BaseModel):
    business_id: int
    business_name: str
    business_email: str


class AccountIn(BaseModel):
    email: str
    picture_url: str
    username: str
    password: str
    business: Optional[Union[int, None]]


class AccountOut(BaseModel):
    id: int
    email: str
    picture_url: str
    username: str
    business: Optional[BusinessOut]


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountUpdate(BaseModel):
    business: int
    picture_url: str
    username: str
    email: str
    password: str


class AccountRepo:
    def get_business_data(self, business_id: int) -> Optional[BusinessOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        business_id,
                        business_name,
                        business_email
                        FROM businesses
                        WHERE business_id = %s
                        """,
                        [business_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return BusinessOut(
                        business_id=record[0],
                        business_name=record[1],
                        business_email=record[2],
                    )
        except Exception:
            return None

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

    def create(
        self, user: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            print("USER", user)
            print("HASHED", hashed_password)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (email,
                            picture_url,
                            username,
                            hashed_password,
                            business)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING
                        id,
                        email,
                        picture_url,
                        username,
                        hashed_password,
                        business;
                        """,
                        [
                            user.email,
                            user.picture_url,
                            user.username,
                            hashed_password,
                            user.business,
                        ],
                    )
                    print("insert worked?")
                    id = result.fetchone()[0]
                    print("ID GOTTEN", id)
                    return AccountOutWithPassword(
                        id=id,
                        email=user.email,
                        picture_url=user.picture_url,
                        username=user.username,
                        hashed_password=hashed_password,
                        business=user.business,
                    )
        except Exception:
            return {"message": "Could not create a user"}

    def get(self, email: str) -> AccountOutWithPassword:
        try:
            print("email", email)
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
                    print("record found", record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}

    def delete(self, id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception:
            return True

    def get_all_businesses(self) -> Union[Error, List[AccountOut]]:
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
                        self.record_to_account_out(record) for record in db
                    ]
        except Exception:
            return {"message": "Could not get all businesses"}

    def get_one(self, user_id: int) -> Union[Optional[AccountOut], Error]:
        try:
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
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None

                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get user information"}

    # anna
    def update_user(self, id: int, user: AccountUpdate) -> AccountOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    hashed_password = hashlib.sha256(
                        user.password.encode()
                    ).hexdigest()

                    db.execute(
                        """
                        UPDATE users
                        SET
                            picture_url = %s,
                            username = %s,
                            email = %s,
                            hashed_password = %s

                        WHERE id = %s
                        RETURNING
                            id,
                            business,
                            email,
                            picture_url,
                            username;

                        """,
                        [
                            user.picture_url,
                            user.username,
                            user.email,
                            hashed_password,
                            id,
                        ],
                    )
                    record = db.fetchone()
                    print(record)
                    if record is None:
                        raise Exception("User not found or no change made")

                    if len(record) < 5:
                        raise Exception(
                            "Unexpected record format from database. Record does not contain enough elements."
                        )
                    return AccountOut(
                        id=record[0],
                        business=record[1],
                        email=record[2],
                        picture_url=record[3],
                        username=record[4],
                    )
        except Exception as e:
            print(f"Error updating user: {e}")
            raise
