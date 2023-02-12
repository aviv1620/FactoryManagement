# authentication
### userLogin
```
mutation($username: String,$email:String){
  userLogin(username:$username,email:$email){
    accessToken
  }
}
```
### getUser
```
query($token: String){
  getUser(token:$token){
    mongoDbId
    jsonplaceholderID
    numOfActions
    lestActionTime
    name
    username
    email
    phone
    website
  }
}
```
### getAllUsers
```
query($token: String){
  getAllUsers(token:$token){
    mongoDbId
    jsonplaceholderID
    numOfActions
    lestActionTime
    name
    username
    email
    phone
    website
  }
}
```
# departments
### createDepartment
```
mutation($token:String,$departmentName:String){
  createDepartment(token:$token,departmentName:$departmentName)
}
```
### getAllDepartments
```
query($token:String){
  getAllDepartments(token:$token){
    id,
    name,
    managerID
  }
}
```
### getAllDepartmentsReferences
```
query($token:String){
  getAllDepartmentsReferences(token:$token){
    id,
    name,
    manager{
        id
        firstName
        lastName
    }
  }
}
```
### updateDepartment
```
mutation($token:String,$departmentID:String,$department:DepartmentInput){
  updateDepartment(token:$token,departmentId:$departmentID,department:$department)
}
```
### deleteDepartment
```
mutation($token:String,$departmentID:String){
 deleteDepartment(token:$token,departmentId:$departmentID)
}
```
# shifts
### getAllShifts
```
query($token:String){
  getAllShifts(token:$token){
    id,
    date,
    startingHour,
    endingHour
  }
}
```
### createShift
```
mutation($token:String,$shift:ShiftInput){
  createShift(token:$token,shift:$shift)
}
```
### updateShift
```
 mutation($token:String,$shiftID:String,$shift:ShiftInput){
  updateShift(token:$token,shiftID:$shiftID,shift:$shift)
}
```
# employees
### getAllEmployees
```
query($token:String,$employeesFilter:EmployeesFilterInput){
  getAllEmployees(token:$token,employeesFilter:$employeesFilter){
    id
    firstName
    lastName
    startWorkYear
    departmentID
    shiftsIds
  }
}
```
### createEmployee
```
mutation($token:String,$employee:EmployeeInput){
  createEmployee(token:$token,employee:$employee)
}
```
### getAllEmployeesReferences
```
query($token:String,$employeesFilter:EmployeesFilterInput){
  getAllEmployeesReferences(token:$token,employeesFilter:$employeesFilter){
    id
    firstName
    lastName
    startWorkYear    
    department{
      id
      name
      manager{
        id
        firstName
        lastName
      }
    }
    shifts{
      id
      date
      startingHour
      endingHour
    }
  }
}
```
### getEmployee
```
query($token:String,$employeeID:String){
  getEmployee(token:$token,employeeID:$employeeID){
    id
    firstName
    lastName
    startWorkYear
    departmentID
    shiftsIds
  }
}
```
### updateEmployee
```
mutation($token:String,$employeeID:String,$employee:EmployeeInput){
 updateEmployee(token:$token,employeeID:$employeeID,employee:$employee)
}
```
### deleteEmployee
```
mutation($token:String,$employeeID:String){
	deleteEmployee(token:$token,employeeID:$employeeID)
}
```
### allocateEmployeeDepartment
```
mutation($token:String,$employeeID:String,$departmentID:String){
  allocateEmployeeDepartment(token:$token,employeeID:$employeeID,departmentID:$departmentID)
}
```
### allocateEmployeeShift
```
mutation($token:String,$employeeID:String,$shiftID:String){
 allocateEmployeeShift(token:$token,employeeID:$employeeID,shiftID:$shiftID)
}
```

