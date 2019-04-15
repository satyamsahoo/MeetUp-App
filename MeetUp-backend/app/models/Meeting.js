const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('./../libs/timeLib');

let meetingSchema = new Schema({
    meetingId : {
        type: String,
        unique :true
    },
    meetingName : {
        type : String,
        default :''
    },
    meetingDescription :{
        type : String,
        default : ''
    },
    meetingPlace :{
        type :String,
        default :''
    },
    meetingStartTime :{
        type : Date,
        default:''
    },
    meetingEndTime :{
        type:Date,
        default :''
    },
    meetingOrganiserName :{
        type:String,
        default :''
    },
    meetingOrganiserId :{
        type : String,
        default:''
    },
    memberName :{
        type : String,
        default :''
    },
    memberId :{
        type : String,
        default:''
    },
    memberEmail :{
        type : String,
        default:''
    },
    createdOn :{
        type : Date,
        default : time.now()
    }

});

mongoose.model('Meeting',meetingSchema);