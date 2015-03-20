SET FOREIGN_KEY_CHECKS=0; 
DROP TABLE IF EXISTS `References`;
DROP TABLE IF EXISTS `Authors`;
DROP TABLE IF EXISTS `Books`; 
DROP TABLE IF EXISTS `Websites`; 
DROP TABLE IF EXISTS `Queries`;
DROP TABLE IF EXISTS `Results`;
SET FOREIGN_KEY_CHECKS=1; 
 
CREATE TABLE `References` (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(255),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE `Authors` (
    reference_id int NOT NULL REFERENCES `References` (id),
    name varchar(255)
);

CREATE TABLE `Books` (
    reference_id int UNIQUE NOT NULL PRIMARY KEY REFERENCES `References` (id),
    publisher varchar(255),
    publication_year int,
    publication_place varchar(255),
    isbn varchar(20),
    edition varchar(255)
);

CREATE TABLE `Websites` (
    reference_id int UNIQUE NOT NULL PRIMARY KEY REFERENCES `References` (id),
    url varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `Queries` (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    search varchar(255) UNIQUE NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE `Results` (
    query_id int NOT NULL,
    reference_id int NOT NULL, 
    FOREIGN KEY (query_id) REFERENCES `Queries` (id),
    FOREIGN KEY (reference_id) REFERENCES `References` (id)
);

