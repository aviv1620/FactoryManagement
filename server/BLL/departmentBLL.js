const {department:departmentCol,employee:employeeCol} = require("../models/factoryManagementModel")
const {errorName} = require('../errorsConstants')
const {PayAction} = require('../BLL/actionsBLL')

const jwt = require('jsonwebtoken');

async function GetAllDepartments({token}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId)

    return await departmentCol.find()
}

async function GetAllDepartmentsReferences({token}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId)

    return await departmentCol.find().populate('managerID')
}

async function GetDepartment({token,departmentId}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId)

    return await departmentCol.findById(departmentId)
}

async function GetDepartmentReferences({token,departmentId}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId)

    return await departmentCol.findById(departmentId).populate('managerID')
}

async function CreateDepartment({token,departmentName}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 
  
    const newDepartment = new departmentCol({
        name:departmentName,
    })

    await newDepartment.save()       

    return "created"            
}

async function UpdateDepartment({token,departmentId,department}){
    const {mongoDbId:userID} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(userID) 
    
    if(department.managerID)
    {
        const manager = await employeeCol.findById(department.managerID)    
    
        if(!manager)
            throw new Error(errorName.FORBIDDEN_WRONG_MANAGER_ID) 

        await employeeCol.findByIdAndUpdate(manager.id,{departmentID:departmentId})
    }
  
    const result = await departmentCol.findByIdAndUpdate(departmentId,department)      
    
    if(result)
        return "updated"  
    else
        throw new Error(errorName.FORBIDDEN_WRONG_ID) 

    
}

async function DeleteDepartment({token,departmentId}){
    const {mongoDbId:userID} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(userID)     

    const result = await departmentCol.findByIdAndRemove(departmentId)

    if(!result)
        throw new Error(errorName.FORBIDDEN_WRONG_ID) 
        
    await employeeCol.updateMany({"departmentID":departmentId}  ,{ $unset: { departmentID: 1 } } )

    return "deleted"  
}

module.exports = {CreateDepartment,GetAllDepartments,GetAllDepartmentsReferences,UpdateDepartment,DeleteDepartment,GetDepartment,GetDepartmentReferences}