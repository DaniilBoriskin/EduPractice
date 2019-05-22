DROP DATABASE IF EXISTS photoportal;
CREATE DATABASE IF NOT EXISTS photoportal;

USE photoportal;

SET NAMES utf8;

CREATE TABLE IF NOT EXISTS Users (
	USER_ID int NOT NULL AUTO_INCREMENT,
	USER_NAME varchar(50) NOT NULL,
	PRIMARY KEY (USER_ID)
);

CREATE TABLE IF NOT EXISTS Posts(
	POST_ID INT NOT NULL AUTO_INCREMENT,
    DESCRIPTION varchar(100) NOT NULL  ,
    CREATION_DATE datetime NOT NULL,
    PHOTO_LINK varchar(100) NOT NULL,
    USER_ID int  NOT NULL,
    PRIMARY KEY (POST_ID),
    FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID) on delete cascade
);
INSERT Users(USER_NAME) VALUES ('Q'),('W'),('E'),('R'),('T'),('Y'),('U'),('I'),('O'),('P'),('I'),('O'),('P');
INSERT Posts(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES
('qwerty','2019-02-03 15:00:00','/qwerty',1),
('Hello','2019-05-01','/hello',2),
('qwerty','2019-05-01','/320972',1),
('4el','2019-05-22','http/',2),
('5qw','2019-05-22','/qwe/we',5),
('6hello','2019-05-22','//qw',5),
('7descrpit','2019-05-01','https://',7),
('des8','2019-05-09','https://qwp',5),
('9des','2019-05-09','https://ava',9),
('10deshello','2019-05-23','https://ssw',10),
('11des','2013-11-19','http',1),
('12des','2019-02-03 16:00:00','ht',1),
('13deshello','2017-05-09','https://www',2),
('14des','2019-04-08','//',4),
('15des','2019-05-22','//Q',2),
('16qw','2019-05-22','/qwe/we',5),
('17ello','2019-05-22','//qw',5),
('18hllo','2019-05-22','//qw',5);