# This page has:
This page has an option for creating new shifts, and change existing shifts, and
allocate employees to a given shift. Shifts Can NOT be deleted !!

# UI
- date - day picker
- starting hour - hour picker
- ending hour - hour picker
- create button
- table:
- - date 
- - starting hour(can be edited)
- - ending hour(can be edited)
- - edit shift button
- - allocate employee button
- employees dropdown

# queries
use **getAllShifts** to fill the table.
use **getAllEmployees** to fill the dropdown.
employeesFilter - it empty object to get all the employees.
when user click on create button use **createShift** to make new shift.
when user click on edit shift use **updateShift** to update the shift.
shiftID - from the row on the table.
shift - set the startingHour and endingHour from the row in the table.
when user click on allocate employee use **allocateEmployeeShift** to allocate the employee from the dropdown.
employeeID - from the dropdown.
shiftID - from the row in the table.

note: in every query you can get the token that you store from login page.