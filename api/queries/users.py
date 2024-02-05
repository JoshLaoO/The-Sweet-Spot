from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool
import hashlib
from psycopg.rows import dict_row


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
    picture_url: Optional[str] = None
    username: Optional[str] = None
    password: str
    business: Optional[Union[int, None]] = None


class AccountOut(BaseModel):
    id: int
    email: str
    picture_url: str
    username: str
    business: Optional[BusinessOut]


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountUpdate(BaseModel):

    picture_url: str
    username: str
    email: str
    password: str
    business: int


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
        biz_info = AccountRepo.get_business(self, business_id=record[1])
        account_dict = {
            "id": record[0],
            "business": biz_info,
            "email": record[2],
            "picture_url": record[3],
            "username": record[4],
        }

        return account_dict

    def record_to_business_out(self, record) -> BusinessOut:
        business_dict = {
            "business_id": record[0],
            "business_name": record[1],
            "business_email": record[2],
        }
        return BusinessOut(**business_dict)

    def create(
        self, user: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
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
                    id = result.fetchone()[0]
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

    def list_all_users(self) -> List[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        id,
                        email,
                        picture_url,
                        username,
                        business
                        FROM users
                        """
                    )
                    records = db.fetchall()
                    users = []
                    for record in records:
                        u_data = {
                            "id": record[0],
                            "email": record[1],
                            "picture_url": record[2],
                            "username": record[3],
                            "business": None,
                        }
                        if record[4] is not None:
                            data = self.get_business_data(record[4])
                            u_data["business"] = data.dict() if data else None
                        users.append(AccountOut(**u_data))
                    return users
        except Exception:
            return {"message": "Could not get users"}

    def get(self, email: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
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
                    if record is None:
                        return None
                    return AccountOutWithPassword(**record)
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

    def get_all_businesses(self) -> Union[Error, List[BusinessOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM businesses
                        """
                    )

                    return [
                        self.record_to_business_out(record) for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all businesses"}

    def create_business(
        self, business_data: BusinessIn
    ) -> Optional[BusinessOut]:
        try:
            print("Starting to create business.")
            print(
                f"""
                Business data received: Name
                - {business_data.business_name},
                  Email - {business_data.business_email}
                """
            )

            with pool.connection() as conn:
                with conn.cursor() as db:
                    print("Database connection established.")
                    result = db.execute(
                        """
                        INSERT INTO businesses
                            (business_name, business_email)
                        VALUES
                            (%s, %s)
                        RETURNING
                            business_id,
                            business_name,
                            business_email;
                        """,
                        [
                            business_data.business_name,
                            business_data.business_email,
                        ],
                    )
                    record = result.fetchone()
                    # if record is None:
                    if record:
                        print(f"Business created with ID: {record[0]}")
                        # return None
                        return BusinessOut(
                            business_id=record[0],
                            business_name=record[1],
                            business_email=record[2],
                        )
        except Exception as e:
            print(f"Error during business creation: {e}")
            return None

    def get_business(self, business_id: int) -> Optional[BusinessOut]:
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

    def update_business(
        self, business_id: int, business_data: BusinessIn
    ) -> Optional[BusinessOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE businesses
                        SET
                            business_name = %s,
                            business_email = %s
                        WHERE business_id = %s
                        RETURNING
                            business_id,
                            business_name,
                            business_email;
                        """,
                        [
                            business_data.business_name,
                            business_data.business_email,
                            business_id,
                        ],
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

    def delete_business(self, business_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM businesses
                        WHERE business_id = %s
                        """,
                        [business_id],
                    )
                    return True
        except Exception:
            return False

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
                            hashed_password = %s,
                            business = %s

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
                            user.business,
                            id,
                        ],
                    )
                    record = db.fetchone()
                    if record is None:
                        raise Exception("User not found or no change made")

                    if len(record) < 5:
                        raise Exception(
                            """
                            Unexpected record format from database.
                            Record does not contain enough elements.
                            """
                        )

                    return self.record_to_account_out(record)
                    # biz_info = AccountRepo.get_business(self, business_id=record[1])
                    # return AccountOut(
                    #     id=record[0],
                    #     business=biz_info,
                    #     email=record[2],
                    #     picture_url=record[3],
                    #     username=record[4],
                    # )
        except Exception as e:
            print(f"Error updating user: {e}")
            raise


account_repo = AccountRepo()
