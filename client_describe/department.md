# This page has:
A Table with all Departments data. Each row presents : Department name,
Department manager name, and a list of Employees names work in that
department.
- Each Employee Full name is a link. A click on it will redirect to “Edit
Employee” Page with all his personal data in a form to be edited.
- Each Department name is a link. A click on it will redirect to “Edit
Department” Page with all the department data in a form to be edited.

A button called “New Department”. A click on it will Redirect to “Add Department”
Page

# UI
- departments table:
-  - name - link to "editDepartment" page
-  - manager name 
-  - list of Employees names - link to "editEmployee" page
- new department button - link to "addDepartment" page

# queries
use **getAllDepartmentsReferences** to fill the table with  manager name.
for each row use the **getAllemployees** to fill the employees names list.
employeesFilter - set the departmentId to specific department ID in the row.

note: in every query you can get the token that you store from login page

# link
when user link to “editDepartment” page, store the departmentID in the memory.
when user link to “editEmployee” page, store the employeeID in the memory.