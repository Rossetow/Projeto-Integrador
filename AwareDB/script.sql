-- Create database

CREATE DATABASE AwareDB;

-- Use DB

USE AwareDB

-- Create User table

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(50),
    dateOfBirth VARCHAR(10),
    state VARCHAR(20),
    city VARCHAR(50),
    avatar VARCHAR(150)
)

-- Create table for posts

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(50)
    title VARCHAR(100),
    avatar VARCHAR(255),
    image VARCHAR(255)
    likes INT,
    retweet INT,
    comments INT
)

-- Create table for integrating user with posts

CREATE TABLE IntegrationUserPost (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUser INT NOT NULL,
    idPost INT NOT NULL
)