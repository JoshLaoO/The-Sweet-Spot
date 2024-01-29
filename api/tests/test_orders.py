from fastapi.testclient import TestClient
from main import app
from queries.orders import OrderRepo
client = TestClient(app)

class EmptyOrderRepo:
    def get_all(self):
        return []


def test_get_all_orders():
    #arrange
    app.dependency_overrides[OrderRepo] = EmptyOrderRepo # set up empty repo
    #act
    response = client.get('/orders') #make an "api call" from thhe client
    app.dependency_overrides = {} # clear out incase of other functions
    #assert
    assert response.status_code == 200

def test_init():
    assert 1==1
