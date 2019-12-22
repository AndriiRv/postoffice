CREATE TABLE "user"
(
    id            SERIAL PRIMARY KEY,
    credential_id INTEGER UNIQUE REFERENCES credential (id) ON DELETE CASCADE,
    name          TEXT NOT NULL,
    surname       TEXT NOT NULL,
    city          INTEGER UNIQUE REFERENCES city (id) ON DELETE CASCADE,
    address       TEXT,
    email         TEXT,
    telephone     TEXT
);