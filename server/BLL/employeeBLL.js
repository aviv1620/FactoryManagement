const {employee:employeeCol,department:departmentCol} = require("../models/factoryManagementModel")
const {errorName} = require('../errorsConstants')
const {PayAction} = require('../BLL/actionsBLL')

const jwt = require('jsonwebtoken');

async function GetAllEmployees({token,employeesFilter}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    const filter = buildFilter(employeesFilter)    
    
    return await employeeCol.find(filter)             
}

async function GetAllEmployeesReferences({token,employeesFilter}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    const filter = buildFilter(employeesFilter)    

    let employees = await employeeCol.find(filter).populate("shiftsIds").populate({
        path: 'departmentID',
        populate: { path: 'managerID' }
    })      

    return employees
}

async function GetEmployee({token,employeeID}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    return await employeeCol.findById(employeeID)
}

async function CreateEmployee({token,employee}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    const department = await departmentCol.findById(employee.departmentID)    

    if(!department)
        throw new Error(errorName.FORBIDDEN_WRONG_DEPARTMENT_ID)    
    
    const startWorkYear = new Date().getUTCFullYear()

    const newEmployee = new employeeCol({
        firstName:employee.firstName,
        lastName:employee.lastName,
        departmentID:employee.departmentID,
        startWorkYear:startWorkYear
    })

    await newEmployee.save()   

    return "created"
}

async function UpdateEmployee({token,employeeID,employee}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY)

    await PayAction(mongoDbId) 

    if(employee.departmentID)            
        AllocateEmployeeDepartmentNoPay(employeeID,employee.departmentID)    

    const result = await employeeCol.findByIdAndUpdate(employeeID,{
        firstName:employee.firstName,
        lastName:employee.lastName,
    })

    if(result)
        return "updated"  
    else
        throw new Error(errorName.FORBIDDEN_WRONG_ID) 
}

async function DeleteEmployee({token,employeeID}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    //If the employee was a manager, Him will no longer manage the previous department.
    await departmentCol.findOneAndUpdate({managerID:employeeID},{"$unset":{managerID:1}})

    const result = await employeeCol.findByIdAndDelete(employeeID)

    if(result)
        return "deleted"  
    else
        throw new Error(errorName.FORBIDDEN_WRONG_ID)    
}

async function AllocateEmployeeDepartment({token,employeeID,departmentID}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    return await AllocateEmployeeDepartmentNoPay(employeeID,departmentID)
}

async function AllocateEmployeeDepartmentNoPay(employeeID,departmentID){
    const result = await employeeCol.findByIdAndUpdate(employeeID,{departmentID}) 

    if(!result)
        throw new Error(errorName.FORBIDDEN_WRONG_ID) 

    //If the employee was a manager, Him will no longer manage the previous department.
    await departmentCol.findOneAndUpdate({managerID:employeeID},{"$unset":{managerID:1}})

    return "allocated"
}

async function AllocateEmployeeShift({token,employeeID,shiftID}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 
    
    const employee = await employeeCol.findById(employeeID)

    if(!employee)
        throw new Error(errorName.FORBIDDEN_WRONG_ID) 

    //test employee not already allocated
    if(employee.shiftsIds &&  employee.shiftsIds.findIndex((sid)=>sid.toString()===shiftID) != -1)
        throw new Error(errorName.FORBIDDEN_EMPLOYEE_ALREADY_ALLOCATED) 
       
    await employeeCol.findByIdAndUpdate(employeeID,{$push:{shiftsIds:shiftID}})
        
    return "allocated"
}

function buildFilter(employeesFilter){
    const {departmentId,departmentNotEqual} = employeesFilter

    if(departmentId){

        const Comparison = departmentNotEqual ? {'$ne':departmentId} :{'$eq':departmentId}

        return {departmentID:Comparison}

    }else{

        return {}

    }
}

module.exports = {CreateEmployee,UpdateEmployee,GetAllEmployees,GetAllEmployeesReferences,AllocateEmployeeDepartment,AllocateEmployeeShift,GetEmployee,DeleteEmployee}