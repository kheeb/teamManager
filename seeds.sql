USE team_db;

INSERT INTO department(name)
    VALUES('history'),('art'),('music');

INSERT INTO role(title, salary, department_id)
    VALUES  ('history teacher', 70000.00, 1),
            ('art teacher', 60000.00, 2),
            ('music teacher', 60000.00, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES  ('Peter','Parker', 2, 3),
            ('Tony','Stark', 3, 4),
            ('Natasha', 'Romanoff', 1, 4),
            ('Scott', 'Lang', 3, 3),
            ('Bruce', 'Banner', 2, 4),
            ('Steve', 'Rogers', 1, NULL);  