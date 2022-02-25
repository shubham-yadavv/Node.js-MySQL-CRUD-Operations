1. clone the repo
2. ```npm install```
3. configure your databse


create a database employeeDB
```
create database employeeDB;
```

create a table employee
```
CREATE TABLE employee (EMPID int NOT NULL AUTO_INCREMENT, Name varchar(45) DEFAULT NULL, EmpCode varchar(45) DEFAULT NULL, salary int(11) DEFAULT NULL, PRIMARY KEY (EMPID));
```

for post method add stored procedure in mysql 
```
create procedure `emp_add_or_edit`(
IN _EMPID INT,
IN _NAME varchar(45),
IN _EmpCode varchar(45),
IN _salary int
)
begin
	if _EMPID = 0 then
		insert into employee(NAME,EmpCode,salary)
        values (_NAME, _EmpCode,_salary);
        
        SET _EMPID = last_insert_id();
        
	else
		update employee
        set 
        Name = _Name,
        EmpCode = _EmpCode,
        salary = _salary
        where EMPID = _EMPID;
	end if;
    
    select _EMPID as 'EMPID';
end
```


