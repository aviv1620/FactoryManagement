const {buildSchema} = require('graphql')
const {graphqlHTTP} = require('express-graphql')
const {errorType} = require('../errorsConstants')
const authenticationBLL = require('../BLL/authenticationBLL')
const employeeBLL = require('../BLL/employeeBLL')
const departmentBLL = require('../BLL/departmentBLL')
const shiftBLL = require('../BLL/shiftBLL')

const schema = buildSchema(`
scalar DateTime

type AccessToken{
    accessToken:String
}

type User{
    mongoDbId:String
    jsonplaceholderID:String
    numOfActions:Int
    lestActionTime:String
    name:String
    username:String
    email:String
    phone:String
    website:String
}

type Department{
    id:String
    name:String
    managerID:String
    manager:Employee
}

type Employee{
    id:String
    firstName:String
    lastName:String
    startWorkYear:Int
    departmentID:String
    department:Department
    shiftsIds:[String]
    shifts:[Shift]
}

type Shift{
    id:String
    date:DateTime
    startingHour:Int
    endingHour:Int
}

input DepartmentInput{
    name:String
    managerID:String
}

input EmployeeInput{
    firstName:String
    lastName :String    
    departmentID:String
}

input EmployeesFilterInput{
    departmentId:String
    departmentNotEqual:Boolean
}

input ShiftInput{
    date:DateTime
    startingHour:Int
    endingHour:Int
}

type Mutation{
    userLogin(username:String,email:String):AccessToken
    createEmployee(token:String,employee:EmployeeInput):String
    updateEmployee(token:String,employeeID:String,employee:EmployeeInput):String
    deleteEmployee(token:String,employeeID:String):String
    allocateEmployeeDepartment(token:String,employeeID:String,departmentID:String):String
    allocateEmployeeShift(token:String,employeeID:String,shiftID:String):String
    createDepartment(token:String,departmentName:String):String
    updateDepartment(token:String,departmentId:String,department:DepartmentInput):String
    deleteDepartment(token:String,departmentId:String):String
    createShift(token:String,shift:ShiftInput):String
    updateShift(token:String,shiftID:String,shift:ShiftInput):String
}

type Query{
    getUser(token:String):User
    getAllUsers(token:String):[User]
    getAllDepartments(token:String):[Department]
    getAllDepartmentsReferences(token:String):[Department]
    getDepartment(token:String,departmentId:String):Department
    getDepartmentReferences(token:String,departmentId:String):Department
    getEmployee(token:String,employeeID:String):Employee
    getAllEmployees(token:String,employeesFilter:EmployeesFilterInput):[Employee]
    getAllEmployeesReferences(token:String,employeesFilter:EmployeesFilterInput):[Employee]    
    getAllShifts(token:String):[Shift]
}
`)

const root = {   
    getUser:authenticationBLL.GetUser,
    getAllUsers:authenticationBLL.GetAllUsers,
    getAllEmployees:employeeBLL.GetAllEmployees,
    getEmployee:employeeBLL.GetEmployee,
    getAllEmployeesReferences:employeeBLL.GetAllEmployeesReferences,
    getAllDepartments:departmentBLL.GetAllDepartments,
    getAllDepartmentsReferences:departmentBLL.GetAllDepartmentsReferences,
    getDepartment:departmentBLL.GetDepartment,
    getDepartmentReferences:departmentBLL.GetDepartmentReferences,
    getAllShifts:shiftBLL.GetAllShifts,
    userLogin:authenticationBLL.UserLogin,
    createEmployee:employeeBLL.CreateEmployee,
    allocateEmployeeDepartment:employeeBLL.AllocateEmployeeDepartment,
    allocateEmployeeShift:employeeBLL.AllocateEmployeeShift,
    updateEmployee:employeeBLL.UpdateEmployee,
    deleteEmployee:employeeBLL.DeleteEmployee,
    createDepartment:departmentBLL.CreateDepartment,
    updateDepartment:departmentBLL.UpdateDepartment,   
    deleteDepartment:departmentBLL.DeleteDepartment,    
    createShift:shiftBLL.CreateShift,
    updateShift:shiftBLL.UpdateShift
}

const router = graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql: true, 
    customFormatErrorFn: (errGraphQl) => {
        const error = errorType[errGraphQl.message];

        if(!error){            
            return errGraphQl
        }
            
        return {message: error.message, statusCode: error.statusCode}
    }
})

module.exports = router