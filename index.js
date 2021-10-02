const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
const dotenv = require('dotenv');
const consoleTable = require('console.table');

require('console.table');

const promptMessages = {
    viewAllEmployees: "View All Employees",
    viewByDepartment: "View All Employees By Department",
    viewByManager: "View All Employees By Manager",
    addEmployee: "Add An Employee",
    removeEmployee: "Remove An Employee",
    updateRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee's Manager",
    viewAllRoles: "View All Roles",
    exit: "Exit"
};

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

connection.connect(err => {
    if (err) throw err;
    prompt();
});


function prompt() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            promptMessages.viewAllEmployees,
            promptMessages.viewByDepartment,
            promptMessages.viewByManager,
            promptMessages.viewAllRoles,
            promptMessages.addEmployee,
            promptMessages.removeEmployee,
            promptMessages.updateRole,
            promptMessages.exit
        ]

    })
    .then(answer => {
        console.log('answer', answer);
        switch (answer.action) {
            case promptMessages.viewAllEmployees:
                viewAllEmployees();
                break;

            case promptMessages.viewByDepartment:
                viewByDepartment();
                break;  
                
            case promptMessages.viewByManager:
                viewByManager();
                break;
                    
            case promptMessages.addEmployee:
                addEmployee();
                break;
                        
            case promptMessages.removeEmployee:
                remove('delete');
                break;

            case promptMessages.updateRole:
                remove('role');
                break;
                
            case promptMessages.viewAllRoles:
                viewAllRoles();
                
            case promptMessages.exit:
                connection.end();
                break;    


        }
    });
}

// adding roles, etc
const addRole = () => {
    inquirer.prompt(prompts.addRoleP).then((answers) => {
        addQuery = `INSERT INTO role (title, salary, department_id) VALUES ( "${answers.title}", ${answers.salary}, "${answers.deptId}")`;
        // console.log(addQuery);
        connection.query(addQuery, (err) => {
            if (err) throw err;
            startManaging();
        });

    });
}

const addEmployee = () => {
    inquirer.prompt(prompts.addEmpP).then((answers) => {
        let manager = null;
        if (answers.haveManager) {
            manager = `${answers.manId}`;
        }
        addQuery = `INSERT INTO employee ( first_name, last_name, manager_id, role_id) VALUES ("${answers.first}", "${answers.last}", ${manager}, ${answers.roleId})`;
        // console.log(addQuery);
        connection.query(addQuery, (err) => {
            if (err) throw err;
            startManaging();
        });

    });
}

const addDept = () => {
    inquirer.prompt(prompts.addDeptP).then((answers) => {
        addQuery = `INSERT INTO department (id, name) VALUES (${answers.id}, "${answers.name}")`;
        // console.log(addQuery);
        connection.query(addQuery, (err) => {
            if (err) throw err;
            startManaging();
        });

    })
}

// viewing roles, etc
const createConsTable = () => {
    connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.name",
    (err,res) => {
        console.table(res);
    })
    startManaging();
}

const viewDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        console.table( res);
    })
    startManaging();
}

const viewEmployee = () => {
    connection.query('SELECT * FROM employee', (err, res)=> {
        console.table(res);
    })
    startManaging();
}

const viewRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        console.table(res);
    })
    startManaging();
}

// update roles, etc
const updateEmp = () => {
    inquirer.prompt([{
        name: 'update',
        type: 'list',
        message: 'Which would you like to update?',
        choices: ['Role', 'Manager']
    },
    {
        name: 'empId',
        type: 'input',
        message: 'Enter Employee Id:'
    }]).then((answer) => {
            switch (answer.update) {
            case ('Role'):
                updateEmpRole(answer.empId);
                break;
            case ('Manager'):
                updateEmpMan(answer.empId);
                break;
        } 
    })
    
}
const updateEmpRole = (empId) => {
   inquirer.prompt({
       name: 'newRole',
       type: 'input',
       message: 'Enter the new Role Id:'
   }).then((value) => {
       connection.query(`UPDATE employee SET role_id = ${value.newRole} WHERE id = ${empId}`)
   })
   startManaging();
}

const updateEmpMan = (empId) => {
    inquirer.prompt({
        name: 'newMan',
        type: 'input',
        message: 'Enter the new Manager Id:'
    }).then((value) => {
        connection.query(`UPDATE employee SET manager_id = ${value.newMan} WHERE employee_id = ${empId}`)
    })
    startManaging();
 }
 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = connection;
