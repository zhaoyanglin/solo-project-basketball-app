CREATE TABLE "park" (
    "id" SERIAL PRIMARY KEY,
    "latitude" FLOAT NOT NULL,
    "longitudes" FLOAT NOT NULL,
    "park_name" VARCHAR NOT NULL,
    "info_window" VARCHAR (100),
    "img_url" VARCHAR (500)
);
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "user_location" (
    "user_latitude" FLOAT NOT NULL,
    "user_longitude" FLOAT NOT NULL,
    "user_ref_id" INT REFERENCES "user" PRIMARY KEY
);
