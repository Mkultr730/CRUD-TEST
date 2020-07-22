CREATE TABLE area (
    ID numeric(2,0) NOT NULL,
    name varchar(50) NOT NULL,
    leader_ID numeric(7,0) NOT NULL,
    state bit NOT NULL,
    CONSTRAINT area_pk PRIMARY KEY (ID)
);

-- Table: user
CREATE TABLE users (
    name varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    birthdate date NOT NULL,
    email varchar(50) NOT NULL,
    ID numeric(7,0) NOT NULL,
    area_ID numeric(2,0) NOT NULL,
    salary decimal(12,2) NOT NULL,
    state bit NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (ID)
);

ALTER TABLE users ADD CONSTRAINT user_area FOREIGN KEY user_area (area_ID)
    REFERENCES area (ID);

