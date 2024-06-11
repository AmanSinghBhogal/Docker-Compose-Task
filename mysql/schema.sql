CREATE DATABASE webapp_task;
USE webapp_task;

CREATE TABLE people(
    name VARCHAR(256) NOT NULL,
    age INT,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO people(name, age)
VALUES
('Henry David', 21),
('Rick Davidson', 22);

SELECT * FROM people;