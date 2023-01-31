const inquirer = require('inquirer');
const connection = require('./config/connection.js');

function init() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            "View all Departments", 
            "View all Roles", 
            "View all Employees", 
            "Add a department", 
            "Add a role", 
            "Add an employee", 
            "Update an employee role"
        ]
    }]).then(function(response) {
        switch (response.choice) {
            case "View all Departments":
                viewAllDepartments();
                break;

            case "View all Roles":
                viewAllRoles();
                break;

            case "View all Employees":
                viewAllEmployees();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "Update an employee role":
                updateEmployee();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add a department":
                addDepartment();
                break;

        }
    })
}


init();