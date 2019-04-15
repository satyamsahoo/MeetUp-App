const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId : {
      type : String,
      default : '',
      unique : true
  } , 
  firstName :{
    type : String,
    default : ''
  },
  lastName :{
    type : String,
    default : ''
  },
  email : {
    type : String,
    default : ''
  },
  userName :{
    type : String,
    default : ''
  },
  isAdmin :{
    type : Boolean,
    default : false
  },
  countryCode : {
    type : Number,
    default : ''
  },
  mobileNumber :{
    type : Number,
    default : ''
  },
  password :{
    type : String,
    default : ''
  },
  passwordResetToken :{ // used while reseting password
    type: String,
    default :''
  }
});

mongoose.model('User',userSchema);