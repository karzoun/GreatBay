DROP DATABASE IF EXISTS greatbay_db;

CREATE DATABASE greatbay_db;

USE greatbay_db;

CREATE TABLE auctions (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(120) NOT NULL,
category VARCHAR(100),
startind_bid INTEGER NOT NULL,
current_bid INTEGER NOT NULL,
PRIMARY KEY (id)
  
);
INSERT INTO auctions(product_name,category,startind_bid,current_bid) VALUES ('macbook pro',"electronecs",1500,1500);
INSERT INTO auctions(product_name,category,startind_bid,current_bid) VALUES ('PS5',"electronecs",2000,2000);
INSERT INTO auctions(product_name,category,startind_bid,current_bid) VALUES ('orange','food', 1,1);
INSERT INTO auctions(product_name,category,startind_bid,current_bid) VALUES ('la croix','ahmad stuff',4,4);
