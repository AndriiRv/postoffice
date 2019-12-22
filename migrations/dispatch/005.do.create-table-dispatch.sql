CREATE TABLE dispatch
(
    id        SERIAL PRIMARY KEY,
    user_id   INTEGER REFERENCES "user" (id) ON DELETE CASCADE,
    stuff_id  INTEGER REFERENCES stuff (id) ON DELETE CASCADE,
    from_city INTEGER REFERENCES city (id) ON DELETE CASCADE,
    to_city   INTEGER REFERENCES city (id) ON DELETE CASCADE,
    DATE      DATE NOT NULL,
    time      TIME NOT NULL
);