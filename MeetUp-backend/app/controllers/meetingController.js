const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const time = require('./../libs/timeLib');
const check = require('../libs/checkLib');
const token = require('./../libs/tokenLib');
const email = require('./../libs/emailLib');

const userModel = mongoose.model('User');
const meetingModel = mongoose.model('Meeting');


//create new meeting in db
let addNewMeeting=(req,res)=>{
    //verify the inputs given by admin.
    let verifyUserInput=()=>{
        return new Promise((resolve,reject)=>{
            if(check.isEmpty(req.body.meetingName) || check.isEmpty(req.body.meetingDescription) || check.isEmpty(req.body.meetingPlace)
                || check.isEmpty(req.body.meetingStartTime) || check.isEmpty(req.body.meetingEndTime) || check.isEmpty(req.body.meetingOrganiserName)
                || check.isEmpty(req.body.meetingOrganiserId) || check.isEmpty(req.body.memberName) || check.isEmpty(req.body.memberId) 
                || check.isEmpty(req.body.memberEmail)){
                    logger.error('Some parameters are empty','addNewMeeting',10);
                    let apiResponse = response.generate(true,'Parameters are empty',400,null);
                    reject(apiResponse);
            }  else{
                resolve(req)
            } 
        })
    }
    //saving meeting details in db.
    let createMeeting=()=>{
        return new Promise((resolve,reject)=>{
            let meetingId = shortid.generate();
            let newMeeting = new meetingModel({
                meetingId : meetingId,
                meetingName : req.body.meetingName,
                meetingDescription :req.body.meetingDescription,
                meetingPlace : req.body.meetingPlace,
                meetingStartTime : time.convertToLocalTime(req.body.meetingStartTime),
                meetingEndTime : time.convertToLocalTime(req.body.meetingEndTime),
                meetingOrganiserName : req.body.meetingOrganiserName,
                meetingOrganiserId: req.body.meetingOrganiserId,
                memberName : req.body.memberName,
                memberId : req.body.memberId,
                memberEmail : req.body.memberEmail,
                createdOn : time.now()
            })

            newMeeting.save((err,newMeeting)=>{
                if(err){
                    let apiResponse = response.generate(true,'Error while saving meeting',400,null);
                    reject(apiResponse);
                    logger('Error while saving meeting details in db','create meeting',10);
                } else {
                    let newMeetingObj = newMeeting.toObject();
                    sendEmailNotificatin = {
                        name : req.body.memberName,
                        email : req.body.memberEmail,
                        subject : 'A new meeting is scheduled.',
                        descriptioin : req.body.meetingDescription,
                        html :`<h3>Hi ${req.body.memberName},</h3>
                        <p>
                            A new meeting is scheduled by ${req.body.meetingOrganiserName}<br>
                            Title : ${req.body.meetingName}<br>
                            Description : ${req.body.meetingDescription}<br>
                            From : ${req.body.meetingStartTime}<br> To : ${req.body.meetingEndTime}<br>
                            At : ${req.body.meetingPlace}<br>
                            <br>Kindly look the calender for more info.
                        </p>
                        <b>With Best regards</b>
                        <br><b>MeetUp Team</b>`
                    }
                    email.sendEmail(sendEmailNotificatin);
                    resolve(newMeetingObj);
                }
            })
        })
    }

    verifyUserInput(req,res)
        .then(createMeeting)
        .then((resolve)=>{
            let apiResponse = response.generate(false,'Meeting created successfully',200,resolve);
            res.send(apiResponse);
            console.log(apiResponse);
        })
        .catch((err)=>{
            res.status(400)
            res.send(err);
            console.log(err);
        })
}
//update meeting details by admin.
let updateMeeting=(req,res)=>{
    let options = req.body; 
    meetingModel.update({meetingId:req.params.meetingId},options,{multi: true}).exec((err,result)=>{
        if(err){
            logger('Error while updating meeting','update meeting',10);
            let apiResponse = response.generate(true,'Error while updating meeting',400,null);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger('No meeting found to update','update meeting',10);
            let apiResponse = response.generate(true,'No meeting found to update in db',404,null);
            res.send(apiResponse);
        }else{
            sendEmailNotificatin = {
                name : result.memberName,
                email : result.memberEmail,
                subject : 'A meeting is updated',
                html :`<h3>Hi ${result.memberName}</h3><br>
                <p>
                    A meeting is updated by ${result.meetingOrganiserName}<br>
                    Title : ${result.meetingName}<br>
                    From : ${result.meetingStartTime} To : ${result.meetingEndTime}<br>
                    At : ${result.meetingPlace}<br>
                </p>
                <b>With Best regards</b>
                <br><b>MeetUp Team</b>`
            }
            email.sendEmail(sendEmailNotificatin);

        }
            let apiResponse = response.generate(false,'Meeting Updated',200,result);
            res.send(apiResponse);
            console.log(apiResponse);
        
    })
}
//get all users from the db.
let getAllUsers=(req,res)=>{
    //verify auth token.
    let verifyUser=()=>{
        return new Promise((resolve , reject)=>{
            if(check.isEmpty(req.query.authToken) ){
                logger('No authToken present','verify-users',10);
                let apiResponse = response.generate(true,'No authTokenPresent',400,null);
                reject(apiResponse);
            } else {
                token.verifyClaimWithoutSecret(req.query.authToken,(err,decoded)=>{
                    if(err){
                        logger.error(true,'Error occured while validating auth token','verify user in getAllUsers',5)
                        let apiResponse = response.generate(true,'Error occured while validating authToken',400,null);
                        reject(apiResponse)
                    } else if(check.isEmpty(decoded)){
                        logger.error(true,'No user have this authToken','verify user in getAllUsers',5)
                        let apiResponse = response.generate(false,'No user have this authToken',403,null)
                        reject(apiResponse)
                    } else {
                        resolve(req)
                    }
                })
            }
        })
    }
    //getting users from db.
    let getUsers=()=>{
            userModel.find().select('-__v -_id -password').exec((err,result)=>{
                if(err){
                    logger.error(true,'Error occured while getting users from db','verify user in getAllUsers',5)    
                    let apiResponse = response.generate(true,'Error occured while getting all users',400,null);
                    reject(apiResponse)  
                } else if(check.isEmpty(result)){
                    let apiResponse = response.generate(true,'There are no users present in db',404,null);
                    reject(apiResponse)
                } else{
                    let apiResponse = response.generate(false,'All user detail',200, result);
                    resolve(result)
                }
            })
    }
    

    verifyUser(req,res)
        .then(getUsers)
        .then((resolve)=>{
            let apiResponse = response.generate(false,'All user detail',200, resolve);
            res.send(apiResponse)
            console.log(apiResponse);
        })
        .catch((err)=>{
            res.status(400)
            res.send(err)
            console.log(err);
        })
}

//getting all meetings of a given userid.
let getAllMeetingByUserId=(req,res)=>{
    meetingModel.find({memberId: req.params.userId}).select('-__v -_id').exec((err,result)=>{
        if(err){
            let apiResponse = response.generate(true,'Error occured while getting all meeting details of users',400,null);
            res.send(apiResponse);
            console.log(apiResponse)
        } else if(check.isEmpty(result)){
            let apiResponse = response.generate(true,'No meeting is scheduled for the user',404,null);
            res.send(apiResponse)
            console.log(apiResponse)
        } else{
            let apiResponse = response.generate(false,'Getting all meetings of given user',200,result);
            res.send(apiResponse)
            console.log(apiResponse)
        }
    })
}

//getting meeting details of given meeting id.
let getMeetingDetail=(req,res)=>{
    meetingModel.findOne({meetingId:req.params.meetingId}).exec((err,result)=>{
        if(err){
            let apiResponse = response.generate(true,'Error occured while getting details of meeting',400,null);
            res.send(apiResponse);
            console.log(apiResponse)
        } else if(check.isEmpty(result)){
            let apiResponse = response.generate(true,'No meeting is present of given meetingid',404,null);
            res.send(apiResponse);
            console.log(apiResponse);
        } else{
            console.log(result)
            let apiResponse = response.generate(false,'Meeting detail',200,result);
            res.send(apiResponse);
            console.log(apiResponse);
        }
    })
}

//delete metting details of given meeting id.
let deleteMeeting=(req,res)=>{
    meetingModel.findOneAndRemove({meetingId:req.params.meetingId}).exec((err,result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, 'meeting Controller: deletemeeting', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 400, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)){
            logger.error('No meeting id found', 'meeting Controller: deletemeeting', 10)
            let apiResponse = response.generate(true, 'Invalid MeetingId', 404, null)
            res.send(apiResponse)
        } else {
            sendEmailNotificatin = {
                name : result.memberName,
                email : result.memberEmail,
                subject : 'Meeting is cancelled',
                html :`<h3>Hi ${result.memberName}</h3><br>
                <p>
                    A meeting is cancelled by ${result.meetingOrganiserName}<br>
                    Title : ${result.meetingName}<br>
                </p>
                <b>With Best regards</b>
                <br><b>MeetUp Team</b>`
            }
            email.sendEmail(sendEmailNotificatin);
            let apiResponse = response.generate(false, 'Meeting deleted Successfully', 200, null)
            res.send(apiResponse)
            console.log(apiResponse);
        }
    })
}

module.exports ={
    addNewMeeting : addNewMeeting,
    getAllUsers : getAllUsers,
    getAllMeetingByUserId:getAllMeetingByUserId,
    getMeetingDetail : getMeetingDetail ,
    deleteMeeting : deleteMeeting,
    updateMeeting : updateMeeting
}

