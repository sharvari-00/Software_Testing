DROP DATABASE IF EXISTS coursesdb;
CREATE DATABASE IF NOT EXISTS coursesdb;
USE coursesdb;

DROP TABLE IF EXISTS course, course_prerequisite, employees, departments;

create table course(
	course_id int,
	capacity int,
	course_code varchar(255),
	credits int,
	description varchar(255),
	name varchar(255),
	term varchar(255),
	year int,
	employee_id int,
	constraint course_id PRIMARY KEY (course_id)
);

create table course_prerequisite(
	course_id int,
	prerequisite_course_id int
);

create table employees(
	employee_id int,
	email varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	photograph_path varchar(255),
	title varchar(255),
	department_id int,
	constraint employee_id PRIMARY KEY (employee_id)
);

create table departments(
	department_id int,
	capacity int,
	name varchar(255),
	constraint department_id PRIMARY KEY (department_id)
);
