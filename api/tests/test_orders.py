from fastapi.testclient import TestClient
from main import app
from queries.orders import OrderRepo
from queries.candy import CandyRepository

client = TestClient(app)

candy_data = [
    {
        "id": 0,
        "name": "string",
        "business": 0,
        "picture_url": "string",
        "description": "string",
        "price": 0,
        "stock": 0,
    },
    {
        "id": 1,
        "name": "Snickers",
        "business": 0,
        "picture_url": "Snickers.png",
        "description": "Snickers are the best",
        "price": 1,
        "stock": 100,
    },
]


class EmptyOrderRepo:
    def get_all(self, candy_repo=CandyRepository):
        return []


class CreateOrderRepo:
    def create(self, order, candy_repo=CandyRepository):
        result = {
            "id": 0,
            "candy_id": 0,
            "quantity": 0,
        }
        result.update(order)
        for candy in candy_data:
            if candy["id"] == order.candy_id:
                result["candy_id"] = candy
        print("I AM HERE: ", result)
        return result


def test_get_all_orders():
    # arrange
    app.dependency_overrides[OrderRepo] = EmptyOrderRepo  # set up empty repo
    # act
    response = client.get("/orders")  # make an "api call" from the client
    app.dependency_overrides = {}  # clear out incase of other functions
    # assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_order():
    # arrange

    app.dependency_overrides[OrderRepo] = CreateOrderRepo  # set up empty repo
    order = {"candy_id": 1, "quantity": 0}
    expected = {
        "id": 0,
        "candy_id": {
            "id": 1,
            "name": "Snickers",
            "business": 0,
            "picture_url": "Snickers.png",
            "description": "Snickers are the best",
            "price": 1,
            "stock": 100,
        },
        "quantity": 0,
    }
    # act
    response = client.post(
        "/orders", json=order
    )  # make an "api call" from the client
    app.dependency_overrides = {}  # clear out incase of other functions
    # assert
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
