# This page has:
A Form with The selected department data to be edited.
- An “Update” button to save the update data in the server
- A “Delete” button to delete all departments data from the server (including all
department’s employees data)
- A Dropdown with all employees that NOT belong to that department, and a “Add”
button. A click on “Add” button will allocate the selected employee to that
department (instead of his previous one)

# UI
- name text box
- manager name label
- dropdown:
-  - employee name
-  - add button
- update button 
- delete button 

# queries
use **getDepartmentRefrence** to fill the name and manager name.
use **getAllemployees** to fill the dropdown.
employeesFilter - set the departmentId and departmentNotEqual to false.
when user click the add button use the **allocateEmployeeDepartment** to allocate employee to the department.
employeeID - from the row on the dropdown.
when user click the use **updateDepartment** to update the department details.
department - set the name to the name in the text box.
when user click on delete button use **deleteDepartment** to delete the department. the server deletes also the department’s employees data.

note: in every query you can get the token that you store from login page and the departmentID from the departments page.
