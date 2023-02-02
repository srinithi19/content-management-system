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
            "Update an employee role",
            "Quit"
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
            
            case "Quit":
            console.log("Exiting now");
            process. exit()                 
            
        }
    })
}

function viewAllDepartments() {
    connection.query("SELECT id as Department_ID, department_name as Department_Name from department",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewAllRoles() {
    connection.query("SELECT roles.id as Role_ID, roles.title as Job_title, department.department_name as Department_name, roles.salary as Salary from roles JOIN department on roles.department_id = department.id",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewAllEmployees() {
    connection.query("SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, roles.title as Job_title, department_name as Department,roles.salary as Salary,CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN roles on roles.id = employee.role_id INNER JOIN department on department.id = roles.department_id LEFT JOIN employee e on employee.manager_id = e.id",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function addDepartment() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Please enter the name of the Department?"
    }]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ", {
                department_name: res.name
            },
            function(err,res) {
                if (err) throw err;
                console.log("Department has been added");
                init();
            }
            )
        })
}
    
var roleArr = [];
function selectRole() {
        connection.query("SELECT * FROM roles",
        function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].title);
            }  
        })
        return roleArr;
}

var empArr = [];
function selectEmployee() {
        connection.query("SELECT last_name FROM employee",
        function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                empArr.push(res[i].last_name);
            }  
        })
        return empArr;
}
    
var deptArr = [];
function selectDept() {
        connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                deptArr.push(res[i].department_name);
            }
            
        })
        return deptArr;
}
    
var managersArr = [];
function selectManager() {
        connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                managersArr.push(res[i].first_name);
            }        
        })
        return managersArr;
}
    
function addRole() {
        connection.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles", function(err, res) {
            inquirer.prompt([{
                name: "title",
                type: "input",
                message: "What is the role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the Salary?"
            },
            {
                name: "dept",
                type: "list",
                message: "What is the Department?",
                choices: selectDept()
            },
            
        ]).then(function(res) {
            var deptId = selectDept().indexOf(res.dept) + 1
            connection.query(
                "INSERT INTO roles SET ?", {
                    title: res.title,
                    salary: res.salary,
                    department_id : deptId
                },
                function(err) {
                    if (err) throw err;
                    console.table(res);
                    init();
                })
            })
        })
}
    
function addEmployee() {
        inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "list",
            message: "Whats their Manager's name?",
            choices: selectManager()
        }
    ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.manager) + 1
        connection.query("INSERT INTO employee SET ?", {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, function(err) {
            if (err) throw err;
            console.table(val);
            init();
        })
        
    })
    
}

function updateEmployee() {
    inquirer.prompt([
        {
            name: "nameh",
            type: "list",
            message: "update employee role? ",
            choices :['Y']
        },
        {
            name: "name",
            type: "list",
            message: "What is the Employee's last name? ",
            choices: selectEmployee()
        },
        {
            name: "roles",
            type: "list",
            message: "What is the Employees new title? ",
            choices: selectRole()
        }
    ]).then(function(val) {
        var roleId = selectRole().indexOf(val.roles) + 1
        connection.query("UPDATE employee SET role_id=? WHERE last_name=?", [roleId,val.name]
        , function(err,res) {
            if (err) throw err
            console.log("Employee role updated successsfully")
            init()
        })
    })
}

init();