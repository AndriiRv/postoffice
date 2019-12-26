CREATE TABLE "user"
(
    id            SERIAL PRIMARY KEY,
    credential_id INTEGER UNIQUE REFERENCES credential (id) ON DELETE CASCADE,
    name          TEXT NOT NULL,
    surname       TEXT NOT NULL,
    address       TEXT,
    email         TEXT,
    telephone     TEXT
);