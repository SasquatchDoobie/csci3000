DROP DATABASE IF EXISTS project_database;

CREATE DATABASE project_database;

USE project_database;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	id int NOT NULL UNIQUE,
    username varchar(40) NOT NULL UNIQUE,
	fname varchar(40) NOT NULL,
	lname varchar(40) NOT NULL,
	password char(128) NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Images;

CREATE TABLE Images (
	imageid int NOT NULL UNIQUE,
	imagepath varchar(100) NOT NULL UNIQUE,
	creationdate date NOT NULL,
	imageowner varchar(40) NOT NULL,
	PRIMARY KEY (imageid),
	FOREIGN KEY (imageowner) REFERENCES Users(username)
);

DROP TABLE IF EXISTS Gallery;

CREATE TABLE Gallery (
	galleryid int NOT NULL UNIQUE,
	galleryname varchar(100) NOT NULL DEFAULT "",
	creationdate date
);

DROP TABLE IF EXISTS GalleryContent;

CREATE TABLE GalleryContent (
	gallery int NOT NULL,
	image int NOT NULL,
	FOREIGN KEY (gallery) REFERENCES Gallery(galleryid),
	FOREIGN KEY (image) REFERENCES Images(imageid)
);

INSERT INTO Users();

