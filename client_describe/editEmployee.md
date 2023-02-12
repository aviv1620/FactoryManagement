# This page has:

A Form with the selected employee data to be edited.
- An “Update” button to save the update data in the server
- A “Delete” button to delete all employee’s data (and his related data, like shifts)from the server.
- A table with all his Shifts
- An option to register him to an EXISTING shift

# UI
- first name text box
- lastName text box
- shifts table
-  - date
-  - startingHour
-  - endingHour
-  - status - write allocate if the user in already registered. or not allocate if the user in not registered.
-  - register button - will appear only if the user not allocated to this shift
- update button
- delete button
# queries
use **getEmployee** to fill the text box and hold the shiftsIds.
use **getAllShifts** to fill the text table. combine with shiftsIds you hold from getEmployee to fill the status  and show the register button If necessary.
when user click on register button use **allocateEmployeeShift** to allocate the employee to shift.
shiftID - the row in the table.
when user click on update button use **updateEmployee** to update first name and last name.
employee - object that contains firstName and lastName.
when user click on delete button use **deleteEmployee** to delete employee and all related data.

note: in every query you can get the token that you store from login page and the employeeID you store from employees page or department page.