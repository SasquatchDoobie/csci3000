DROP DATABASE IF EXISTS project_database;

CREATE DATABASE project_database;

USE project_database;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	id varchar(40) NOT NULL UNIQUE,
	fname varchar(40) NOT NULL,
	lname varchar(40) NOT NULL,
    username varchar(40) NOT NULL UNIQUE,
	password char(128) NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Images;

CREATE TABLE Images (
	imagepath VARCHAR(255) NOT NULL,
	imageowner varchar(40) NOT NULL,
    PRIMARY KEY (imagepath),
    CONSTRAINT `fk_imageowner`
		FOREIGN KEY (imageowner) REFERENCES Users(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

DROP TABLE IF EXISTS Album;

CREATE TABLE Album (
	albumid varchar(40) NOT NULL UNIQUE,
	albumname varchar(100) NOT NULL DEFAULT "",
	albumcontent LONGTEXT CHECK (JSON_VALID(albumcontent)),
    albumowner varchar(40) NOT NULL,
    PRIMARY KEY (albumid),
    CONSTRAINT `fk_albumowner`
		FOREIGN KEY (albumowner) REFERENCES Users (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

#password is bob
INSERT INTO Users VALUES ('1682206971262', 'bob', 'duncan', 'bobduncan01', '$2b$12$ICr74Suh8TuFstwSHGlwXuVV/ZgOiKUC7p.Agv9qqDGzDvDV0N1Pq');

#bob has these five images
INSERT INTO Images VALUES ('1682629763984_3fbffc827732bba9d8822c9be8da0400.jpg','1682206971262');
INSERT INTO Images VALUES ('1682629763985_0tYGhcn.gif','1682206971262');
INSERT INTO Images VALUES ('1682629763992_399d35f.jpg','1682206971262');
INSERT INTO Images VALUES ('1682641078630_0ab06ebb-4912-436d-a62c-e9eaf1cce822.png','1682206971262');
INSERT INTO Images VALUES ('1682641078634_285a96c.jpg','1682206971262');

#bob has these two albums containing the five images above
INSERT INTO Album VALUES ('1682818020944_1682206971262','Dank Meme Gallery','{"images":["1682629763984_3fbffc827732bba9d8822c9be8da0400.jpg","1682629763985_0tYGhcn.gif","1682629763992_399d35f.jpg"]}','1682206971262');
INSERT INTO Album VALUES ('1682818200068_1682206971262','A Silly Gallery','{"images":["1682641078630_0ab06ebb-4912-436d-a62c-e9eaf1cce822.png","1682641078634_285a96c.jpg"]}','1682206971262');

