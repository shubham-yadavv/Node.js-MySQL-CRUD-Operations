const express = require('express');
const app = express();
const  mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'shubh',
    password: '*********',
    database: 'employeeDB',
    multipleStatements: true
});


mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.get('/employee', (req,res)=>{
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

app.get('/employee/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/employee/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});


app.post('/employee', (req, res) => {
    let emp = req.body;
    var sql = "SET @EMPID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; CALL emp_add_or_edit(@EMPID,@Name,@EmpCode,@salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});


app.put('/employee', (req, res) => {
    let emp = req.body;
    var sql = "SET @EMPID = ?;SET @Name = ?;SET @EmpCode = ?;SET @salary = ?; CALL emp_add_or_edit((@EMPID,@Name,@EmpCode,@salary);";
    mysqlConnection.query(sql, [emp.EMPID, emp.Name, emp.EmpCode, emp.salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});



app.listen(3000 ,()=>{
    console.log('server is runnnig on port 3000');
});




