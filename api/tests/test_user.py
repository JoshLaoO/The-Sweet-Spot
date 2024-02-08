from fastapi.testclient import TestClient
from main import app
from queries.users import (
    AccountRepo,
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
)
import bcrypt

client = TestClient(app)


def mock_get_account_data(email: str, accounts: AccountRepo):
    return AccountOutWithPassword(
        id=1,
        email="authenticated@example.com",
        picture_url="http://example.com/authenticated.jpg",
        username="authenticateduser",
        hashed_password=bcrypt.hashpw(
            "password".encode(), bcrypt.gensalt()
        ).decode(),
        business=None,
    )


class MockAccountRepo(AccountRepo):
    def create(self, user: AccountIn, hashed_password: str):
        return AccountOutWithPassword(
            id=1,
            email=user.email,
            picture_url=user.picture_url,
            username=user.username,
            hashed_password=hashed_password,
            business=None,
        )

    def list_all_users(self):

        return [
            AccountOut(
                id=1,
                email="test@example.com",
                picture_url="http://example.com/picture.jpg",
                username="testuser",
                business=None,
            )
        ]

    def delete(self, id: int) -> bool:

        return True


def test_list_all_users():
    app.dependency_overrides[AccountRepo] = MockAccountRepo

    response = client.get("/users")
    assert response.status_code == 200
    assert len(response.json()) > 0

    app.dependency_overrides = {}


def test_delete_user():
    app.dependency_overrides[AccountRepo] = MockAccountRepo
    user_id = 1

    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json() is True

    app.dependency_overrides = {}
