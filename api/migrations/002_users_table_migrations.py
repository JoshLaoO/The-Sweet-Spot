steps = [
    [
        """
        CREATE TABLE businesses (
        business_id SERIAL PRIMARY KEY,
        business_name VARCHAR(300) NOT NULL,
        business_email VARCHAR(300) NOT NULL
        )
        """,
        """
        DROP TABLE businesses;
        """,
    ],
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(300) UNIQUE NOT NULL,
            picture_url VARCHAR(500) NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            hashed_password VARCHAR(300) NOT NULL,
            business INT REFERENCES businesses(business_id)
        );
        """,
        """
        DROP TABLE users;
        """,
    ],
]
