const errorName = {
    UNAUTHORIZED_NO_TOKEN: 'UNAUTHORIZED_NO_TOKEN',
    UNAUTHORIZED_USER_EMAIL_NOT_EXIST:'UNAUTHORIZED_USER_EMAIL_NOT_EXIST',
    INTERNAL_SERVER_ERROR:'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED_FAILL_AUTHENTICATE:'UNAUTHORIZED_FAILL_AUTHENTICATE',
    FORBIDDEN_ACTION_LIMIT:'FORBIDDEN_ACTION_LIMIT',
    FORBIDDEN_WRONG_DEPARTMENT_ID:'FORBIDDEN_WRONG_DEPARTMENT_ID',
    FORBIDDEN_WRONG_MANAGER_ID:'FORBIDDEN_WRONG_MANAGER_ID',
    FORBIDDEN_WRONG_ID:'FORBIDDEN_WRONG_ID',
    FORBIDDEN_EMPLOYEE_ALREADY_ALLOCATED:'FORBIDDEN_EMPLOYEE_ALREADY_ALLOCATED'
}

const errorType = {
    UNAUTHORIZED_FAILL_AUTHENTICATE:{
      message: 'Faill to authenticate token',
      statusCode: 401    
    },
    UNAUTHORIZED_NO_TOKEN: {
      message: 'No Token Provide',
      statusCode: 401
    },
    UNAUTHORIZED_USER_EMAIL_NOT_EXIST:{
        message: 'user and email not exist',
        statusCode: 401
    },
    INTERNAL_SERVER_ERROR:{
      message:"Something went wrong. Please try again later.",
      statusCode:500
    },
    FORBIDDEN_ACTION_LIMIT:{
      message:"exceeded the action limit.",
      statusCode:403 
    },
    FORBIDDEN_WRONG_DEPARTMENT_ID:{
      message:"wrong department id",
      statusCode:403 
    },
    FORBIDDEN_WRONG_MANAGER_ID:{
      message:"wrong manager id",
      statusCode:403 
    },
    FORBIDDEN_WRONG_ID:{
      message:"wrong id",
      statusCode:403 
    },
    FORBIDDEN_EMPLOYEE_ALREADY_ALLOCATED:{
      message:"employee already allocated",
      statusCode:403 
    },
  }

  module.exports = {errorName,errorType}