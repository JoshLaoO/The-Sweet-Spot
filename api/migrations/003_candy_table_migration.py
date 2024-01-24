steps = [
    [
        """
        CREATE TABLE candy (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(150) UNIQUE NOT NULL,
        business INT REFERENCES businesses(business_id),
        picture_url VARCHAR(1000) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(2) NOT NULL,
        stock INT NOT NULL
        );
        """,
        """
        DROP TABLE candy;
        """,

    ],
    [
        """
        CREATE TABLE orders (
        id SERIAL PRIMARY KEY NOT NULL,
        candy_id INT REFERENCES candy(id),
        quantity INT NOT NULL
        );
        """,
        """
        DROP TABLE orders;
        """,
    ],
    [
        """
        ALTER TABLE users
        ADD COLUMN order_id INT REFERENCES orders(id);
        """,
        """
        DROP TABLE users;
        """
    ]
]
