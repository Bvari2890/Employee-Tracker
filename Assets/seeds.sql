USE employee_db;

INSERT INTO department(name)
VALUES ("Leadership"), ("Sales"), ("Intern"), ("IT");

SELECT * FROM department;

INSERT INTO role(title, salary, department_id)
VALUES 
("Intern", 15000.00, 1),
("Social Media Intern", 15000.00, 1),
("Sales Associate", 45000.00, 2),
("Sales Manager", 65000.00, 2),
("Sales Director", 90000.00, 2),
("Helpdesk Represenative", 48000.00, 3),
("Software Engineer", 88000.00, 3),
("Senior Engineer", 115000.00, 3),
("CEO", 450000.00, 4),
("CFO", 250000.00, 4),
("VP", 300000.00, 4),

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Michael", "Turtle", 3, 1), 
("Donny", "Shell", 2, 1), 
("Leo", "Green", 1, 1);

SELECT * FROM employee;

SELECT
department.id,
department.name,
role.id,
role.title,
role.salary

