from fastapi.testclient import TestClient
from main import app
from queries.users import AccountRepo, BusinessIn, BusinessOut


client = TestClient(app)


class EmptyBusinessRepo:
    def get_all_businesses(self):
        return []


class GetOneBusinessRepo:
    def get_business(self, business_id):
        result = {
            "business_id": business_id,
            "business_name": "string",
            "business_email": "string",
        }
        return result


class DeleteBusinessRepo:
    def delete_business(self, business_id):
        return True


class UpdateBusinessRepo:
    def __init__(self):
        self.business_data = {
            "business_id": 1,
            "business_name": "Test Business",
            "business_email": "test@example.com",
        }

    def get_business(self, business_id: int):
        if business_id == self.business_data["business_id"]:
            return self.business_data
        return None

    def update_business(self, business_id: int, business_data: BusinessIn):
        if business_id == self.business_data["business_id"]:
            self.business_data["business_name"] = business_data.business_name
            self.business_data["business_email"] = business_data.business_email
            return BusinessOut(**self.business_data)
        return None


def test_get_business():
    app.dependency_overrides[AccountRepo] = GetOneBusinessRepo
    business_id = 1
    expected = {
        "business_id": business_id,
        "business_name": "string",
        "business_email": "string",
    }
    response = client.get(f"/businesses/{business_id}")
    assert response.json() == expected


def test_get_all_businesses():
    app.dependency_overrides[AccountRepo] = EmptyBusinessRepo

    response = client.get("/businesses")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_delete_business():
    app.dependency_overrides[AccountRepo] = DeleteBusinessRepo
    business_id = 1
    response = client.delete(f"/businesses/{business_id}")
    assert response.json() is True


def test_update_business():
    app.dependency_overrides[AccountRepo] = UpdateBusinessRepo
    business_id = 1
    business = {
        "business_name": "updated name",
        "business_email": "update email",
    }
    expected = {
        "business_id": business_id,
        "business_name": "updated name",
        "business_email": "update email",
    }
    response = client.put(f"/businesses/{business_id}", json=business)
    assert response.json() == expected
