# The Sweet Spot

## Candy

| Action                         | Method | Request URL                                          |
| ------------------------------ | ------ | -------------------------------------------- |
| Create a candy          | POST   | http://localhost:8000/candy   |
| Get a specific candy    | GET    | http://localhost:8000/candy/{candy_id} |
| List all candy            | GET    | http://localhost:8000/candy     |
| Update a specific candy | PUT    | http://localhost:8000/candy/{candy_id} |
| Delete a specific candy | DELETE | http://localhost:8000/candy/{candy_id} |
---

## Create a candy

To create a candy in FastAPI, follow this format in the request body:

input:

```
{
  "name": "Kit Kat",
  "business": 1,
  "picture_url": "https://placehold.co/400",
  "description": "crispy, crunchy, yummy",
  "price": 1,
  "stock": 10
}
```

A succesful response returns the following:

output:

```
{
  "id": 1,
  "name": "Kit Kat",
  "business": 1,
  "picture_url": "https://placehold.co/400",
  "description": "crispy, crunchy, yummy",
  "price": 1,
  "stock": 10
}
```

## Get a candy

To get details of a specific candy in FastAPI, enter the candy_id and execute.
A succesful response returns the following:

```
{
  "id": 1,
  "name": "Kit Kat",
  "business": 1,
  "picture_url": "https://placehold.co/400",
  "description": "crispy, crunchy, yummy",
  "price": 1,
  "stock": 10
}
```

## List all candies

To view a list containing all candies execute this endpoint in FastAPI, a successful response will return the following:

output:

```
[
  {
    "id": 1,
    "name": "Kit Kat",
    "business": 1,
    "picture_url": "https://placehold.co/400",
    "description": "crispy, crunchy, yummy",
    "price": 1,
    "stock": 10
  }
  {
    "id": 2,
    "name": "Snickers",
    "business": 2,
    "picture_url": "https://placehold.co/400",
    "description": "You're not you when you're hungry",
    "price": 1.50,
    "stock": 50
  }
]
```

## Update a candy

To update a specific candy in FastAPI, enter the candy_id, then fill out the request body in the following format:

input:

```
{
  "name": "Kit Kat",
  "business": 1,
  "picture_url": "https://placehold.co/400",
  "description": "even more crispy, extra crunchy, so yummy",
  "price": 1.50,
  "stock": 50
}
```

A succesful response returns the following:

output:

```
{
  "id": 1,
  "name": "Kit Kat",
  "business": 1,
  "picture_url": "https://placehold.co/400",
  "description": "even more crispy, extra crunchy, so yummy",
  "price": 1.5,
  "stock": 50
}
```

## Delete a candy

To delete a specific candy in FastAPI, enter the candy_id, then execute.

A succesful response returns true.
