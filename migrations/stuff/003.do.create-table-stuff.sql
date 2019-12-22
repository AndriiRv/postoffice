CREATE TABLE stuff
(
    id      SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user" (id) ON DELETE CASCADE,
    title   TEXT             NOT NULL,
    weight  DOUBLE PRECISION NOT NULL
);