from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel
from typing import List, Union, Optional
from queries.users import (
    Error,
    AccountIn,
    AccountOut,
    AccountRepo,
    DuplicateAccountError,
    AccountUpdate,
    BusinessIn,
    BusinessOut,
)


class AccountForm(BaseModel):
    email: str
    picture_url: str
    username: str
    password: str
    business: Optional[int] = None


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
):
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/users", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    print("here hashed_password", hashed_password)
    try:
        account = repo.create(info, hashed_password)
        print("account from create method", account)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form_data = {
        "username": info.email,
        "password": info.password,
        "email": info.email,
        "picture_url": info.picture_url,
    }
    if info.business is not None:
        form_data["business"] = info.business

    form = AccountForm(**form_data)
    token = await authenticator.login(response, request, form, repo)
    print("token", token)
    return AccountToken(account=account, **token.dict())


@router.get("/users", response_model=List[AccountOut] | Error)
def list_all_users(
    repo: AccountRepo = Depends(),
):
    return repo.list_all_users()


@router.delete("/users/{id}", response_model=bool)
async def delete_user(
    id: int,
    repo: AccountRepo = Depends(),
) -> bool:
    return repo.delete(id=id)


@router.get("/businesses", response_model=Union[List[BusinessOut], Error])
def get_all_businesses(
    repo: AccountRepo = Depends(),
):
    businesses = repo.get_all_businesses()
    print(businesses)
    return businesses


@router.get(
    "/users/{user_id}", response_model=Union[Optional[AccountOut], Error]
)
async def get_one_user(
    user_id: int,
    response: Response,
    repo: AccountRepo = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        user = repo.get_one(user_id)
        if user is None:
            response.status_code = 404
        return user


@router.put("/user/{id}", response_model=AccountOut)
async def update_user(
    id: int, update_form: AccountUpdate, repo: AccountRepo = Depends()
):
    try:
        hashed_password = authenticator.hash_password(update_form.password)
        updated_account = repo.update_user(id, hashed_password, update_form)
        return updated_account
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.post("/business", response_model=Union[BusinessOut, Error])
async def create_business(
    business_data: BusinessIn,
    repo: AccountRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.create_business(business_data)


@router.get("/businesses/{business_id}", response_model=BusinessOut)
async def get_business(
    business_id: int,
    repo: AccountRepo = Depends(),
):
    business = repo.get_business(business_id)
    if business is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found",
        )
    return business


@router.put("/businesses/{business_id}", response_model=BusinessOut)
async def update_business(
    business_id: int,
    business_data: BusinessIn,
    repo: AccountRepo = Depends(),
):
    business = repo.update_business(business_id, business_data)
    if business is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found",
        )
    return business


@router.delete("/businesses/{business_id}", response_model=bool)
async def delete_business(
    business_id: int,
    repo: AccountRepo = Depends(),
):
    success = repo.delete_business(business_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found",
        )
    return success
