CREATE TABLE role
(
    id    SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

INSERT INTO role (title)
VALUES ('admin'),
       ('user');

CREATE TABLE credential
(
    id       SERIAL PRIMARY KEY,
    role_id  INTEGER REFERENCES role (id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    password TEXT        NOT NULL
);

CREATE TABLE city
(
    id    SERIAL PRIMARY KEY,
    title TEXT UNIQUE NOT NULL
);

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

CREATE TABLE stuff
(
    id     SERIAL PRIMARY KEY,
    title  TEXT             NOT NULL,
    weight DOUBLE PRECISION NOT NULL
);

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

CREATE TABLE "order"
(
    id          SERIAL PRIMARY KEY,
    dispatch_id INTEGER REFERENCES dispatch (id) ON DELETE CASCADE,
    price       DOUBLE PRECISION NOT NULL
);