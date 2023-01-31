USE employee_db;

INSERT INTO department
    (department_name)
VALUES
    ('Dev'),
    ('QA'),
    ('Support'),
    ('Marketing');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('SW Engineer', 120000, 1),
    ('Sr SW Engineer', 180000, 1),
    ('QA Engineer', 110000, 2),
    ('Sr QA Engineer', 170000, 2),
    ('Tech support I', 90000, 3),
    ('Tech support II', 105000, 3),
    ('PM', 120000, 4),
    ('PM Lead', 160000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Ashley', 'Jack', 3, NULL),
    ('Kevin', 'Ko', 4, 3),
    ('Raja', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Chen', 7, NULL),
    ('Tom', 'Beck', 8, 7);