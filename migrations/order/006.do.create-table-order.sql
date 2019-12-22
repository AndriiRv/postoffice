CREATE TABLE "order"
(
    id          SERIAL PRIMARY KEY,
    dispatch_id INTEGER REFERENCES dispatch (id) ON DELETE CASCADE,
    price       DOUBLE PRECISION NOT NULL
);