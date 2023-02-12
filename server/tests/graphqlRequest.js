const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs/promises');

dotenv.config()

async function request(queryName,variables){
    const query = await fs.readFile(`./DATA/graphqlQueries/${queryName}.txt`, { encoding: 'utf8' });

    const res = await axios.post(`http://localhost:${process.env.port}/graphql`,
    {
        query:query,
        variables:variables
    })
    
    return res.data
}

module.exports = {request}