const {user:userCol} = require("../models/factoryManagementModel")
const {errorName} = require('../errorsConstants')
const jsonLog = require('../DAL/logJson');

async function PayAction(mongoDbId){

    const user = await userCol.findById(mongoDbId)

    let UTCmidnight = new Date()
    UTCmidnight.setUTCHours(0,0,0,0)

    if(user.lestActionTime.getTime() < UTCmidnight.getTime()){        
        user.numOfActions = 0
    }

    user.numOfActions += 1

    user.lestActionTime = new Date()
    
    await userCol.findByIdAndUpdate(mongoDbId,user)    

    logAction({
        mongoDbId,
        countActions:user.numOfActions,
        time:user.lestActionTime
    })

    if (user.numOfActions > process.env.MAXIMUM_ACTIONS_PER_DAY)
        throw new Error(errorName.FORBIDDEN_ACTION_LIMIT)

    return user
}


async function logAction(action){   

    const data = await getLogOrEmpty()    
  
    let actions = data.actions

    if(!actions)
        actions = []
    
    actions.push(action)

    data.actions = actions
    
    await jsonLog.setLogs(data)
}

async function getLogOrEmpty(){
    try{

        return await jsonLog.getLogs()

    }catch(e){

        return {}

    }
}

module.exports = {PayAction}