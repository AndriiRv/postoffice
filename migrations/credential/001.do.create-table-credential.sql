CREATE TABLE credential
(
    id       SERIAL PRIMARY KEY,
    role_id  INTEGER REFERENCES role (id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    password TEXT        NOT NULL
);