# This page has:
An empty Form for creating a new Employee ( without shifts) including his
department
- A “Save” button for saving the data in the server
- A “Cancel” button for redirecting back to the “Employees” page.

# UI
- first name text box
- lest name text box
- department drop down
- save button
- cancel button

# queries
use **getAllDepartments** to fill the drop down and hold the id.
when user click the save button use the **createEmployee** to create new employee.
employee firstName - from text box.
employee  lastName - from text box.
employee departmentID - from drop down.
when user click the cancel button redirect to employees page.

note: in every query you can get the token that you store from login page and the employeeID you store from employees page.