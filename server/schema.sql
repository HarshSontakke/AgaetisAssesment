CREATE DATABASE employee_db;
USE employee_db;
Create Table employees (id INT AUTO_Increment Primary Key , 
name Varchar(255)Not Null,email Varchar
(255)Not Null Unique,role VARCHAR(255) NOT NULL, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

Insert Into employees(name,email,role)Values 
('Harsh Sontakke','harsh@gmail.com','Software Engineer'),
('Dheeraj Yadav','dheeraj@gmail.com','Qa Engineer'),
('Aditi Patil','aditi@gmail.com','Sap Engineer'),
('Krishna Singh','krsna@gmail.com','SaaS Engineer'),
('Rohit Tiwari','rohit@gmail.com','Ai Engineer')
ON Duplicate Key Update id=id;

