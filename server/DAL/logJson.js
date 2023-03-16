const jFile = require('jsonfile');

function getLogs(){
    return jFile.readFile(process.env.LOG_FILE_PATH)
}

function setLogs(obj){
    return jFile.writeFile(process.env.LOG_FILE_PATH,obj)
}

module.exports = {getLogs,setLogs}