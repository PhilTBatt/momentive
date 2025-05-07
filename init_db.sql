DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS attendee;

CREATE TYPE attendee AS (
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    date TIMESTAMP NOT NULL,
    "createdBy" INT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    attendees attendee[] DEFAULT '{}',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("createdBy") REFERENCES users(id) ON DELETE CASCADE
);