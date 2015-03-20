/* Create a website reference*/
INSERT INTO `References` VALUES (id, 'Jens Stoltenberg', created_at);
INSERT INTO `Websites` (reference_id, url) VALUES (LAST_INSERT_ID(), 'http://wikipedia.org');

/**
 * Scenario: A user search
 */
/* User searches for 'Ingvar Ambjørnsen' */
INSERT INTO `Queries` (id, search, created_at) VALUES (id, 'Ingvar Amb', created_at);

/* Scraper finds the reference called 'Hvit nigger' */
INSERT INTO `References` VALUES (id, 'Hvit nigger', created_at);

/* That is a book, so we insert it into Books */
INSERT INTO `Books` (reference_id, publisher) VALUES (LAST_INSERT_ID(), 'Aschehoug');

/* This book has an an auhtor */
INSERT INTO `Authors` (reference_id, forename, surname) VALUES (LAST_INSERT_ID(), 'Ingvar', 'Ambjørnsen');

/* Finally we link the query to the Reference we just created */
INSERT INTO `Results` (query_id, reference_id) VALUES (1, 1);
