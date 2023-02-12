# This page has:
 - A Table with all Employees data. Each row presents : his FullName, Department, and a list of All his shifts (Date & Time) .
 - - Each Employee Full name is a link. A click on it will redirect to “Edit Employee” Page with all his personal data in a form to be edited.
 - - Each Department name is a link. A click on it will redirect to “Edit Department” Page with all the department data in a form to be edited.
- A button called “New Employee”. A click on it will Redirect to “Add Employee” Page
- A drop down with all “Departments”. Picking an item in that drop down will filter the employees table and presents only the employees in that chosen department.

# UI
 - employees table:
 -  - full name - link to "editEmployee" page
 -  - department - link to "editDepartment" page
 -  - list of All his shifts (Date & Time)
 - new employee button - link to "newEmployee" page
 - departments drop down - contain all departments

# queries

use **getAllEmployeesReferences** to fill the table.
token - you store in memory from login page
employeesFilter - send empty object to get all employees or object with the 'departmentId' that user pick from the departments drop down.

use **getAllDepartments** to fill drop down.

# link
when user link to "editEmployee" page store the employee ID in the memory.
when user link to "editDepartment" page store the department ID in the memory.
when user click on new employee button  go to "newEmployee" page.