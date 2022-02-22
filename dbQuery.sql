CREATE DATABASE coddy;

CREATE TABLE orders(id SERIAL PRIMARY KEY, name varchar(255), order_name varchar(255), price integer); //

CREATE TABLE users(id SERIAL PRIMARY KEY, login varchar(255), password varchar(255), name varchar(255), age integer, parent varchar(255), phone varchar(255), coin integer);

CREATE TABLE item(id SERIAL PRIMARY KEY, img varchar(255), name varchar(255), price integer, price_rub integer, cat_id integer); //

CREATE TABLE categories(id SERIAL PRIMARY KEY, name varchar(100)); //

CREATE TABLE posts(id SERIAL PRIMARY KEY, body text, name varchar(255), img text, imgPost text, imgPost2 text); //

CREATE TABLE likes(id SERIAL PRIMARY KEY, post_id int, user_id int); //

CREATE TABLE comments(id SERIAL PRIMARY KEY, post_id int, user_name varchar(255), body text); //

CREATE TABLE courses(id SERIAL PRIMARY KEY, title varchar(255), description text, img text, price integer); //

CREATE TABLE candidate_courses(id SERIAL PRIMARY KEY, parent varchar(255), child varchar(255), age integer, phone varchar(255), course_title varchar(255));

CREATE TABLE day(id SERIAL PRIMARY KEY, name varchar(255));   //

CREATE TABLE lessons(id SERIAL PRIMARY KEY, time varchar(255), name varchar(255), day_id int);    //