const userWS = require('../DAL/usersWS')
const {user:userCol} = require("../models/factoryManagementModel")
const {errorName} = require('../errorsConstants')
const {PayAction} = require('../BLL/actionsBLL')
const jwt = require('jsonwebtoken');

async function GetAllUsers({token}){
    const {mongoDbId} = jwt.verify(token,process.env.TOKEN_SECRET_KEY)  
    
    await PayAction(mongoDbId)   

    let usersSrcDB = await userCol.find().sort('jsonplaceholderID')

    usersSrcDB = usersSrcDB.map((u)=>u.toObject())

    let usersSrcWS = await userWS.getAllUsers()

    usersSrcWS = usersSrcWS.data

    usersSrcWS.sort((u1,u2)=>u1.id - u2.id)
    
    const zip = usersSrcDB.map((udb,i)=>combinedJsonplaceholderMongoDB(usersSrcWS[i],udb))    

    return zip
}

async function GetUser({token}){
    const {mongoDbId,jsonplaceholderID} = jwt.verify(token,process.env.TOKEN_SECRET_KEY)    

    let userSrcDB = await PayAction(mongoDbId) 

    userSrcDB = userSrcDB.toObject()

    let userSrcWS = await userWS.getAllUsers({id:jsonplaceholderID})

    userSrcWS = userSrcWS.data[0]

    return combinedJsonplaceholderMongoDB(userSrcWS,userSrcDB)
}   

async function UserLogin(args){   
    const {data} = await userWS.getAllUsers(args)

    if(data.length === 0)
        throw new Error(errorName.UNAUTHORIZED_USER_EMAIL_NOT_EXIST)    

    if(data.length !== 1){
        console.error("There is more than one user with the same email and username")
        throw new Error(errorName.INTERNAL_SERVER_ERROR)    
    }

    const {name:fullName,id:jsonplaceholderID} = data[0]

    const mongoDbId = await GetMongoDbId(jsonplaceholderID)

    const accessToken = jwt.sign(
        {jsonplaceholderID,mongoDbId,fullName},
        process.env.TOKEN_SECRET_KEY
    )

    return {accessToken}
}

async function GetMongoDbId(jsonplaceholderID) {
   
    let user = await userCol.findOne({ jsonplaceholderID })

    if(!user){//if user not exist in mongoDB database. make new one. 

        user = new userCol({
            jsonplaceholderID,
            numOfActions: 0,
            lestActionTime: new Date(),
        })

        user = await user.save()
    }

    return user.id

}

function combinedJsonplaceholderMongoDB(userSrcWS,userSrcDB){
    delete userSrcWS.id

    userSrcDB.mongoDbId = userSrcDB._id

    userSrcDB.lestActionTime = userSrcDB.lestActionTime.toISOString()

    return {...userSrcWS,...userSrcDB}    
}

module.exports = {UserLogin,GetUser,GetAllUsers}