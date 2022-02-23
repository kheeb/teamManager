const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'blueberries',
      database: 'team_db'
    },
    console.log(`Connected to the team_db database.`)
  );

  // db.query('SELECT * FROM role', function (err, results) {
  //       console.table(results);
  //    }
  // );

function mainMenu() {
  inquirer.prompt(
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
        'update an employee role'
      ],
    }
  )
  .then((answers) => {
    if (answers.mainMenu === 'view all departments') {
      viewAllDepartments();
    }
  })
}

function init() {
  inquirer.prompt(mainMenu).then((data) => {
    console.log(data.options);
    if (data.options === 'view all departments') {
      viewAllDepartments();
    }
  });
};

function viewAllDepartments() {
  db.query('SELECT * FROM departments', function (err, results){
    console.log(results);
  });
};





mainMenu();
init();