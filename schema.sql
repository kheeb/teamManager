DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;

USE team_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    title VARCHAR(30) UNIQUE NOT NULL,

    salary DECIMAL(10,2),

    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    first_name VARCHAR(30) NOT NULL,

    last_name VARCHAR(30) NOT NULL,

    role_id INT NOT NULL,

    manager_id INT NULL
);

