DROP DATABASE IF EXISTS project_database;

CREATE DATABASE project_database;

USE project_database;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  username varchar(40) NOT NULL UNIQUE,
	fname varchar(40) NOT NULL DEFAULT "",
	lname varchar(40) NOT NULL DEFAULT "",
	password char(64) NOT NULL,
  signupdate date NOT NULL DEFAULT date(now()),
  PRIMARY KEY (username)
);

DROP TABLE IF EXISTS Images;

CREATE TABLE Images (
	imageid int NOT NULL UNIQUE,
	imagepath varchar(100) NOT NULL UNIQUE,
	creationdate date NOT NULL DEFAULT date(now()),
	imageowner varchar(40),
	PRIMARY KEY (imageid),
	FOREIGN KEY (imageowner) REFERENCES Users(username)
);

DROP TABLE IF EXISTS Gallery;

CREATE TABLE Gallery (
	galleryid int NOT NULL UNIQUE,
	galleryname varchar(100) NOT NULL DEFAULT "",
	creationdate date NOT NULL DEFAULT date(now())
);

DROP TABLE IF EXISTS GalleryContent;

CREATE TABLE GalleryContent (
	gallery int,
	image int,
	FOREIGN KEY (gallery) REFERENCES Gallery(galleryid),
	FOREIGN KEY (image) REFERENCES Images(imageid)
);

INSERT INTO Users VALUES ("drmohebbi","Mohammed","Mohebbi","password");
INSERT INTO Users VALUES ("john321","John","Stamos","password");
INSERT INTO Users VALUES ("cooldude","Mister","Cool","password");
INSERT INTO Users VALUES ("1337hacker","Iwana","Hackyurcompyuter","password");

