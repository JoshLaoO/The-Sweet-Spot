steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            business SMALLINT NOT NULL,
            email VARCHAR(300) NOT NULL,
            picture_url VARCHAR(500) NOT NULL,
            username VARCHAR(100) NOT NULL,
            hashed_password VARCHAR(300) NOT NULL
        );
        """,
        """
        DROP TABLE users;
        """
    ]
]
