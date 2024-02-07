# from fastapi.testclient import TestClient
# from main import app
# from queries.users import AccountRepo

# client = TestClient(app)

# class MockAccountRepo:
#     # 为了简化，这里我们直接使用静态数据
#     users = [
#         {"id": 1, "email": "user1@example.com", "picture_url": "http://example.com/picture1.jpg", "username": "user1", "business": None},
#         {"id": 2, "email": "user2@example.com", "picture_url": "http://example.com/picture2.jpg", "username": "user2", "business": None}
#     ]

#     def list_all_users(self):
#         return self.users

#     def get_one(self, user_id: int):
#         return next((user for user in self.users if user["id"] == user_id), None)

#     def delete(self, id: int) -> bool:
#         self.users = [user for user in self.users if user["id"] != id]
#         return True

#     def update_user(self, id: int, user_data):
#         user = self.get_one(id)
#         if user:
#             user.update(user_data)
#             return user
#         return None

# # 设置依赖项覆盖
# app.dependency_overrides[AccountRepo] = MockAccountRepo

# def test_list_all_users():
#     response = client.get("/users")
#     assert response.status_code == 200
#     assert response.json() == MockAccountRepo.users

# def test_get_one_user():
#     user_id = 1
#     response = client.get(f"/users/{user_id}")
#     expected_user = next((user for user in MockAccountRepo.users if user["id"] == user_id), None)
#     assert response.status_code == 200
#     assert response.json() == expected_user

# def test_delete_user():
#     user_id = 2
#     response = client.delete(f"/users/{user_id}")
#     assert response.status_code == 200
#     assert response.json() is True
#     assert not any(user["id"] == user_id for user in MockAccountRepo.users)

# def test_update_user():
#     user_id = 1
#     updated_data = {"email": "updated@example.com", "username": "updateduser"}
#     response = client.put(f"/users/{user_id}", json=updated_data)
#     assert response.status_code == 200
#     updated_user = next((user for user in MockAccountRepo.users if user["id"] == user_id), None)
#     assert updated_user["email"] == "updated@example.com"
#     assert updated_user["username"] == "updateduser"
