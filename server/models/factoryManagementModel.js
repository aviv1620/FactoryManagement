const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema(
  {
    jsonplaceholderID: Number,
    numOfActions: Number,
    lestActionTime:Date,   
  },
  { versionKey: false }
);

const user = mongoose.model('users', userSchema);

const employeeSchema = new mongoose.Schema(
  {
    firstName:String,
    lastName :String,
    startWorkYear:Number,
    departmentID:{type: ObjectId, ref: 'departments'},
    shiftsIds:[{type: ObjectId, ref: 'shifts'}],
  },
  { versionKey: false }
);

employeeSchema.virtual('department').get(function() {return this.departmentID})

employeeSchema.virtual('shifts').get(function() {return this.shiftsIds})

const employee = mongoose.model('employees', employeeSchema);

const shiftSchema = new mongoose.Schema(
  {
    date:Date,
    startingHour:Number,
    endingHour:Number,
  },
  { versionKey: false }
);

const shift = mongoose.model('shifts', shiftSchema);

const departmentSchema = new mongoose.Schema(
  {
    name:String,
    managerID:{type: ObjectId, ref: 'employees'},
  },
  { versionKey: false }
);

departmentSchema.virtual('manager').get(function() {return this.managerID})

const department = mongoose.model('departments', departmentSchema);


module.exports = {user,employee,shift,department};
