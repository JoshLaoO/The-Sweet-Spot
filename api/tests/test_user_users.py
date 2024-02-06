from fastapi.testclient import TestClient
from main import app
from queries.users import AccountRepo, AccountIn, AccountOut, AccountOutWithPassword

client = TestClient(app)

class EmptyAccountRepo:
    def list_all_users(self):
        return []

    def get(self, email: str):
        return None

class GetOneAccountRepo:
    def get(self, email: str):
        return {
            "id": 1,
            "email": email,
            "picture_url": "http://example.com/picture.jpg",
            "username": "testuser",
            "hashed_password": "hashedpassword",
            "business": None
        }

class DeleteAccountRepo:
    def delete(self, id: str) -> bool:
        return True

class UpdateAccountRepo:
    def __init__(self):
        self.account_data = {
            "id": 1,
            "email": "test@example.com",
            "picture_url": "http://example.com/picture.jpg",
            "username": "testuser",
            "hashed_password": "hashedpassword",
            "business": None
        }

    def get(self, email: str):
        if email == self.account_data["email"]:
            return self.account_data
        return None

    def update_user(self, id: int, user: AccountIn):
        if id == self.account_data["id"]:
            self.account_data["email"] = user.email
            self.account_data["picture_url"] = user.picture_url
            self.account_data["username"] = user.username
            return AccountOut(**self.account_data)
        return None

# Test cases

def test_get_account():
    app.dependency_overrides[AccountRepo] = GetOneAccountRepo
    email = "test@example.com"
    response = client.get(f"/accounts/{email}")
    assert response.json() == GetOneAccountRepo().get(email)

def test_get_all_accounts():
    app.dependency_overrides[AccountRepo] = EmptyAccountRepo
    response = client.get("/accounts")
    app.dependency_overrides = {}
    assert response.json() == []

def test_delete_account():
    app.dependency_overrides[AccountRepo] = DeleteAccountRepo
    account_id = 1
    response = client.delete(f"/accounts/{account_id}")
    assert response.json() is True

def test_update_account():
    app.dependency_overrides[AccountRepo] = UpdateAccountRepo
    account_id = 1
    new_account_data = {
        "email": "updated@example.com",
        "picture_url": "http://example.com/updated.jpg",
        "username": "updateduser",
    }
    response = client.put(f"/accounts/{account_id}", json=new_account_data)
    assert response.json() == UpdateAccountRepo().update_user(account_id, AccountIn(**new_account_data))

# Reset dependency overrides
app.dependency_overrides = {}
