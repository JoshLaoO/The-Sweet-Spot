steps = [
        """
        CREATE TABLE candy (
            id SERIAL PRIMARY KEY NOT NULL,
            picture_url VARCHAR(500) NOT NULL,
            description TEXT NOT NULL,
            price FLOAT NOT NULL,
            stock INT NOT NULL,
            business INT REFERENCES businesses(business_id),
        );
        """,
        """
        DROP TABLE candy;
        """,
]
