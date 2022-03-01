// require dotenv file
require('dotenv').config();
// import inquirer and mysql2
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// connect to database
const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASS,
      database: 'team_db'
    },
    console.log(`Connected to the team_db database.`)
  );

// main menu for all inquirer prompts
function mainMenu() {
  inquirer
  .prompt([
    {
      name: 'mainMenu',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'view all departments', 
        'view all roles', 
        'view all employees', 
        'add a department', 
        'add a role', 
        'add an employee', 
        'update an employee role',
        'exit'
      ],
    },
  ])
  .then(function (val) {
    switch (val.mainMenu) {
      case 'view all departments':
      viewAllDepartments();
      break;

      case 'view all roles':
      viewAllRoles();
      break;

      case 'view all employees':
      viewAllEmployees();
      break;

      case 'add a department':
      addDeparment();
      break;

      case 'add a role':
      addRole();
      break;

      case 'add an employee':
      addEmployee();
      break;

      case 'update an employee role':
      updateEmployeeRole();
      break;

      case 'exit':
      db.end();
      }
    });
  }


// view all deparments function
function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results){
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

// view all roles function
function viewAllRoles() {
  db.query('SELECT * FROM role', function (err, results){
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

// view all employees function
function viewAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results){
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};


// add new department function
function addDeparment() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Department name?',
      name: 'name',
    },
  ])
  .then( function (results) {
    db.query(
      "INSERT INTO department SET ?",
      { name: results.name },
      function(err) {
        if (err) throw err;
        console.table(results);
        mainMenu();
      }
    );
  });
};
// add new role
function addRole() {
  db.query("SELECT role.title AS `title`, role.salary AS salary FROM `role`, department.name AS `department`;",
  function (err, results) {
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the role title?',
        name: 'roleTitle',
      },
      {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'roleSalary',
      },
      {
        type: 'input',
        message: 'Which department is this role located in?',
        name: 'roleDepartment',
      },
    ])
    .then(function (results) {
      db.query('INSERT INTO department SET ?', {
        title: results.roleTitle,
        salary: results.roleSalary,
        
      }),
      function (err) {
        if (err) throw err;
        console.table(results);
        mainMenu();
      };
    });
  },
  );
};

const updateEmployeeRole = () => {db.query('SELECT employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id;',
    function (err, results) {
      if (err) throw err;
      console.log(results);
      inquirer.prompt([
        {
          type: 'list',
          choices: function() {
            let firstName = [];
            for (let i = 0; i < results.length; i++) {
              firstName.push(results[i].first_name);
            }
            return firstName;
          },
          message: 'Enter employee first name',
          name: 'firstName',
        },
        {
          type: 'list',
          message: 'Enter employee role',
          choices: selectRole(),
          name: 'role',
        },
      ])
      .then(console.table(results));
      mainMenu();
    }
  );
};



// add new employee function
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter first name of employee',
      name: 'firstName',
    },
    {
      type: 'input',
      message: 'Enter last name of employee',
      name: 'lastName',
    },
    {
      type: 'list',
      message: 'Enter employee role',
      choices: selectRole(),
      name: 'role',
    },
    {
      type: 'choice',
      message: 'select their manager',
      choices: selectManager(),
      name: 'manager',
    }
  ])
  .then(results => {
    let idRole = selectRole().indexOf(results.role) + 1;
    let idManager = selectManager()
  })
};

// create selectRole function for addEmployee
let allRoles = [];
const selectRole = () => {db.query('SELECT * FROM role;', 
function (err, results) {
  if (err) throw err;
  for (let i = 0; i < results.length; i++) {
    allRoles.push(results[i].title);
  }
  });
return allRoles;
};

// create selectManager function for addEmployee
let allManagers = [];
const selectManager = () => {db.query('SELECT * FROM first_name, last_name FROM employee WHERE manager_id is NULL;',
 function (err, results) {
  if (err) throw err;
  for (let i = 0; i < results.length; i++) {
    allManagers.push(results[i].first_name);
  }
  });
return allManagers;
};







mainMenu();