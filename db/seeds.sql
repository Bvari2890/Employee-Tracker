INSERT INTO department (id, name) 
VALUES (011,'Marketing'), (012, 'IT'), (013, 'Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Sales', '85,000', 'Sales'),('Manager', '75,000', 'Marketing');

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Roger', 'Le', 1, 10), ('Frank', 'Bartley', 2, 11);