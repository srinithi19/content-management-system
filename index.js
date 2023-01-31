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

function viewAllDepartments() {
    connection.query("SELECT id as Department_ID, department_name as Department_Name from department",
        function(err, res) {
            if (err) throw err
            console.table(res)
            init()
        })
}

function viewAllRoles() {
    connection.query("SELECT roles.id as Role_ID, roles.title as Job_title, department.department_name as Department_name, roles.salary as Salary from roles JOIN department on roles.department_id = department.id",
        function(err, res) {
            if (err) throw err
            console.table(res)
            init()
        })
}

init();