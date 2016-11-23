CREATE DATABASE  `cleanups`;
USE `cleanups`;

CREATE TABLE `cleanupSites` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`routeName` VARCHAR( 255) NOT NULL,
	`userName` VARCHAR( 255 ) NOT NULL,
	`siteLat` FLOAT(20, 18),
	`siteLong` FLOAT( 20, 18),
	`date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,

	
	PRIMARY KEY ( `id` ) ); /* Set ID as primary key */



CREATE TABLE `cleanupsOrganised` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`routeName` VARCHAR( 255) NOT NULL,
	`userName` VARCHAR( 255 ) NOT NULL,
	`cleanupSiteLat` FLOAT(20, 18),
	`cleanupSiteLong` FLOAT( 20, 18),
	`cleanupDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	PRIMARY KEY ( `id` ) ); /* Set ID as primary key */




id
userName
siteLat
siteLong
image url
