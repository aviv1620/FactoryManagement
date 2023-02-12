const jFile = require('jsonfile');

const path = "./DATA/log.json"

function getLogs(){
    return jFile.readFile(path)
}

function setLogs(obj){
    return jFile.writeFile(path,obj)
}

module.exports = {getLogs,setLogs}