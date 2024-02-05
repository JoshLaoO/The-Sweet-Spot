from fastapi.testclient import TestClient
from main import app
from queries.candy import CandyRepository

client = TestClient(app)


class EmptyCandyRepository:
    def get_all(self):
        return []


class CreateCandyQueries:
    def create(self, candy):
        result = {
            "id": 0,
            "name": "string",
            "business": 0,
            "picture_url": "string",
            "description": "string",
            "price": 0,
            "stock": 0,
        }
        result.update(candy)
        return result


def test_get_candy():
    # Arrange
    app.dependency_overrides[CandyRepository] = EmptyCandyRepository
    # Act
    response = client.get("/candy")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


# def test_create_candy():
#     # Arrange
#     app.dependency_overrides[CandyRepository] = CreateCandyQueries
#     candy = {
#         "name": "string",
#         "business": 0,
#         "picture_url": "string",
#         "description": "string",
#         "price": 0,
#         "stock": 0,
#     }

#     expected = {
#         "id": 0,
#         "name": "string",
#         "business": 0,
#         "picture_url": "string",
#         "description": "string",
#         "price": 0,
#         "stock": 0,
#     }

#     # Act
#     response = client.post("/candy", json=candy)
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected
