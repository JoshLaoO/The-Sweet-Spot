import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import AccountRepo, AccountOutWithPassword


class ExampleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountRepo,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password


authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])
