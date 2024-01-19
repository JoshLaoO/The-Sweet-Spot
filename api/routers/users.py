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
from typing import List, Union
from queries.users import (
    Error,
    AccountIn,
    AccountOut,
    AccountRepo,
    DuplicateAccountError,
)

class AccountForm(BaseModel):
    business: int
    email: str
    picture_url: str
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
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
    print("here hashed_password",hashed_password)
    try:
        account = repo.create(info, hashed_password)
        print("account from create method",account)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password, business=info.business, email=info.email, picture_url=info.picture_url)
    token = await authenticator.login(response, request, form, repo)
    print("token",token)
    return AccountToken(account=account, **token.dict())

@router.get("/businesses", response_model=Union[List[AccountOut],Error])
def get_all_businesses(
    repo: AccountRepo = Depends(),
):
    return repo.get_all_businesses()