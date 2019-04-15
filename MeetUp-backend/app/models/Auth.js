const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Auth = new Schema({
    userId:{
        type:String
    },
    authToken:{
        type:String
    },
    authSecret:{
        type:String
    }
})

mongoose.model('Auth',Auth);