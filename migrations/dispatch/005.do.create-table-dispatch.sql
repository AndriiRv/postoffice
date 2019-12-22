CREATE TABLE dispatch
(
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER REFERENCES "user" (id) ON DELETE CASCADE,
    stuff_id     INTEGER REFERENCES stuff (id) ON DELETE CASCADE,
    from_city_id INTEGER REFERENCES city (id) ON DELETE CASCADE,
    to_city_id   INTEGER REFERENCES city (id) ON DELETE CASCADE,
    date         TEXT NOT NULL,
    time         TEXT NOT NULL
);