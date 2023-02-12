const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const graphqlRouter = require('./routers/authenticationRouter')
const connectDB = require('./configs/db');

const app = express()

async function main() {
    dotenv.config()

    await connectDB();

    app.use(cors())

    app.use('/graphql',graphqlRouter)

    const port = process.env.PORT;
    
    app.listen(port,()=>{
        console.log(`runnin a GraphQL API server at: http://localhost:${process.env.port}/graphql`)
    })
    
}

main().catch(err => console.log(err));