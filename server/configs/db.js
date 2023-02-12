const mongoose = require('mongoose');

async function connectDB(){
  const address = process.env.MONGODB_DATABASE_ADDRESS;
  await mongoose.connect(address)
  console.log(`Connected to mongoDB at: ${address}`)    
};

module.exports = connectDB;
