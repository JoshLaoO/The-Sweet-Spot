# The Sweet Spot

## Business

| Action                         | Method | Request URL                                          |
| ------------------------------ | ------ | -------------------------------------------- |
| Create a business          | POST   | http://localhost:8000/business   |
| Get a specific business    | GET    | http://localhost:8000/businesses/{business_id} |
| List all businesses            | GET    | http://localhost:8000/businesses     |
| Update a specific business | PUT    | http://localhost:8000/businesses/{business_id} |
| Delete a specific business | DELETE | http://localhost:8000/businesses/{business_id} |
---

## Create a business

To create a business in FastAPI, input the following format:

input:

```
{
  "business_name": "Sweet Tooth",
  "business_email": "toothfaerie@gmail.com"
}
```

A succesful response returns the following:

output:

```
{
  "business_id": 1,
  "business_name": "Sweet Tooth",
  "business_email": "toothfaerie@gmail.com"
}
```

## Get a business

To get a specific business in FastAPI, enter the business_id and execute.
A succesful response returns the following:

```
{
  "business_id": 1,
  "business_name": "Sweet Tooth",
  "business_email": "toothfaerie@gmail.com"
}
```

## List all businesses

To view a list containing all businesses execute this endpoint in FastAPI, it will return the following:

output:

```
[
  {
    "business_id": 1,
    "business_name": "Sweet Tooth",
    "business_email": "toothfaerie@gmail.com"
  },
  {
    "business_id": 2,
    "business_name": "Candy Store",
    "business_email": "sweetspot@gmail.com"
  }
]
```

## Update a business

To update a specific business in FastAPI, enter the business_id, then fill out the request body in the following format:

input:

```
{
  "business_name": "Sweet Tooth",
  "business_email": "toothfaerie@gmail.com"
}
```

A succesful response returns the following:

output:

```
{
  "business_id": 1,
  "business_name": "Sweeter Teeth",
  "business_email": "toothfairy@gmail.com"
}
```

## Delete a business

To delete a specific business in FastAPI, enter the business_id, then execute.

A succesful response returns true.



