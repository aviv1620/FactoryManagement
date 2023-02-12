const {shift:shiftCol} = require("../models/factoryManagementModel")
const {errorName} = require('../errorsConstants')
const {PayAction} = require('../BLL/actionsBLL')

const jwt = require('jsonwebtoken');

async function GetAllShifts({token}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 
    
    return await shiftCol.find()
}

async function CreateShift({token,shift}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    const newShift = new shiftCol({
        date:new Date(shift.date),
        startingHour:shift.startingHour,
        endingHour:shift.endingHour,
    })

    await newShift.save()

    return "created"
}

async function UpdateShift({token,shiftID,shift}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

    await PayAction(mongoDbId) 

    const result = await shiftCol.findByIdAndUpdate(shiftID,shift)

    if(result)
        return "updated"  
    else
        throw new Error(errorName.FORBIDDEN_WRONG_ID) 
}

module.exports = {CreateShift,UpdateShift,GetAllShifts}