const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const time = require('./../libs/timeLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const password = require('./../libs/generatePasswordLibs');
const token = require('./../libs/tokenLib');
const emailUs = require('./../libs/emailLib');
const email = require('./../libs/emailLib');

const userModel = mongoose.model('User');
const authModel = mongoose.model('Auth');
const appUrl = 'http://localhost:4200';

//Getting all users
let getAllUserFunction = (req, res) =>{
    userModel.find()
        .select('-__v -_id -password')
        .lean()
        .exec((err, result)=>{
            if(err){
                console.log(err)
                logger.error(err.message, 'UserController : getAllUser', 10);
                let apiResponse = response.generate(true, 'Failed to find User Details', 500, null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)) {
                logger.info('No blog found','UserController : getAllUser',10);
                let apiResponse = response.generate(false,'No User detail found',404,null )
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false,'User detail found',200,result);
                res.send(apiResponse);
                console.log('User detail found')
            }
        })

} // end get all user function

let getSingleUserFunction = (req,res) =>{
    userModel.findOne({userId: req.params.userId}).exec((err,userDetail)=>{
        if(err){
            console.log(err)
            logger.error(err.message, 'User Controller: getSingleUserFunction', 10)
            let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(userDetail)){
            logger.info('No User Found', 'User Controller:getSingleUser',5)
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User Details Found', 200, userDetail)
            res.send(apiResponse)

        }
    })
}

let signUpFunction = (req, res) => {
    
    let validateUserInput=()=>{
        return new Promise((resolve,reject)=>{
            console.log(req.body);
            if(req.body.email) {
                if(!validateInput.Email(req.body.email)){
                    let apiResponse = response.generate(true,'Email is not valid',400,null);
                    reject(apiResponse);
                } else if (check.isEmpty(req.body.password)){
                    let apiResponse = response.generate(true,'password is empty',400,null);
                    reject(apiResponse);
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Email missing','Usercontroller : User validation in signup',5);
                let apiResponse = response.generate(true,'Email missing',400,null);
            }
        })
    }

    let createUser=()=>{
        return new Promise((resolve,reject)=>{
            userModel.findOne({email: req.body.email}).exec((err, retreivedUserDetails)=>{
                if(err){
                    logger.error(err.message,'CreateUser',5);
                    let apiResponse = response.generate(true,'Error while creating user.',500,null);
                    reject(apiResponse);
                } else if (check.isEmpty(retreivedUserDetails)){
                    let userId = shortid.generate();
                    let newUser = new userModel({
                        userId : userId,
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        email : req.body.email,
                        userName : req.body.userName,
                        isAdmin : req.body.isAdmin,
                        countryCode : req.body.countryCode,
                        mobileNumber : req.body.mobileNumber,
                        password : password.hashpassword(req.body.password)
                    })

                    newUser.save((err,newUser)=>{
                        if(err){
                            logger.error(err.message,'CreateUser',5);
                            let apiResponse = response.generate(true,'Error while creating user.',500,null);
                            reject(apiResponse);
                        } else {
                            sendEmailNotificatin = {
                                name : req.body.firstName +' '+ req.body.lastName,
                                email : req.body.email,
                                subject : 'Welcome to Meetup!!',
                                html :`<h3>Hi ${req.body.firstName},</h3>
                                <p>
                                    Meetup team welcomes to our application.
                                    Now make your meeting scheduling easy in a finger tip.
                                </p>
                                <b>With Best regards</b>
                                <br><b>MeetUp Team</b>`
                            }
                            email.sendEmail(sendEmailNotificatin);
                            let newUserObj = newUser.toObject();
                            resolve(newUserObj);
                        }
                    })
                } else {
                    logger.error('Email id already in use ','CreateUser',5);
                    let apiResponse = response.generate(true,'Email id already in use',403,null);
                    reject(apiResponse);
                }
            })
        })
    }

    validateUserInput(req,res)
        .then(createUser)
        .then((resolve)=>{
            delete resolve.password;
            apiResponse = response.generate(false,'User created',200,resolve);
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })


  

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {
    let findUser = ()=>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                userModel.findOne({email:req.body.email}).exec((err,userDetail)=>{
                    if(err){
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(userDetail)){
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetail);
                    }
                })
            } else{
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let validatePassword=(retreivedUserDetails)=>{
        console.log('validating password')
        return new Promise((resolve,reject)=>{
            password.comparePassword(req.body.password,retreivedUserDetails.password,(err,isMatch)=>{
                if(err){
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if(isMatch){
                    let retreivedUserDetailsObj = retreivedUserDetails.toObject();
                    delete retreivedUserDetailsObj._id;
                    delete retreivedUserDetailsObj.__v;
                    delete retreivedUserDetailsObj.password;
                    resolve(retreivedUserDetailsObj);
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails)=>{
        console.log('Generating Token');
        return new Promise((resolve,reject)=>{
            token.generateToken(userDetails,(err,tokenDetails)=>{
                if(err){
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else{
                    tokenDetails.userId = userDetails.userId,
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken=(tokenDetails)=>{
        console.log('Saving token details')
        return new Promise((resolve,reject)=>{
            authModel.findOne({userId:tokenDetails.userId}).exec((err,retrivedTokenDetails)=>{
                if(err){
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(retrivedTokenDetails)){
                    let newAuthToken = authModel({
                        userId : tokenDetails.userId,
                        tokenSecret : tokenDetails.tokenSecret,
                        authToken : tokenDetails.token
                    });
                    newAuthToken.save((err,newTokenDetail)=>{
                        if(err){
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else{
                            let responseBody = {
                                authToken: newTokenDetail.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrivedTokenDetails.authToken = tokenDetails.token
                    retrivedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrivedTokenDetails.tokenGenerationTime = time.now();
                    retrivedTokenDetails.save((err,newTokenDetails)=>{
                        if(err){
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else{
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}

let forgotPasswordFunction = (req,res) =>{
    let findEmail = ()=>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                console.log(req.body.email)
                userModel.findOne({email:req.body.email}).exec((err,userDetail)=>{
                    if(err){
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findEmail err()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(userDetail)){
                        logger.error('No User Found', 'userController: findEmail empty()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findEmail()', 10)
                        resolve(userDetail);
                    }
                })
            } else{
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let generateToken = (userDetails)=>{
        console.log('Generating Token for password reset');
        return new Promise((resolve,reject)=>{
            token.generateToken(userDetails,(err,tokenDetails)=>{
                if(err){
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token to reset password', 500, null)
                    reject(apiResponse)
                } else{
                    tokenDetails.userId = userDetails.userId,
                    tokenDetails.userDetails = userDetails,
                    tokenDetails.expiry = time.now() + 3600000 //1 hour to reset.
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken=(tokenDetails)=>{
        console.log('Saving token details for reset password')
        return new Promise((resolve,reject)=>{

            let token = {
                passwordResetToken : null,
                passwordResetToken : tokenDetails.token
            }

            userModel.update({userId:tokenDetails.userId},token).exec((err,retrivedTokenDetails)=>{
               if(err){
                console.log(err.message, 'userController: saveToken to reset password', 10)
                let apiResponse = response.generate(true, 'Failed To Save Token to reset password', 500, null)
                reject(apiResponse)
               } else {
                   resolve(retrivedTokenDetails)
                   console.log('Showing retrivedTokenDetails');
                   console.log(tokenDetails)
                   
                   let sendEmailDetail = {
                       email : tokenDetails.userDetails.email,
                       name : tokenDetails.userDetails.firstName,
                       subject : 'MeetUp user password reset',
                       html : `<h3>Hi ${tokenDetails.userDetails.firstName} please click below link to reset your password.</h3>
                                <p>
                                    <a href="${appUrl}/resetpassword/${token.passwordResetToken}">Click here</a>
                                </p>
                                <br><b>MeetUp Team</b>
                              `
                   }
                   console.log('calling emailLibs');
                   emailUs.sendEmail(sendEmailDetail);
               }
            })
        })
    }

    findEmail(req,res)
        .then(generateToken)
        .then(saveToken)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'Password reset link sent Successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        }).catch((err)=>{
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })




}

let resetPasswordFunction = (req,res) =>{

    let findUser=()=>{
        return new Promise((resolve,reject)=>{
            if(req.body.validationToken){
                userModel.findOne({passwordResetToken:req.body.validationToken}).exec((err,userDetail)=>{
                    if(err){
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details to reset password', 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(userDetail)){
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetail);
                    }
                })
            } else{
                let apiResponse = response.generate(true, '"validationToken" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let updateUser=(userDetails)=>{
        return new Promise((resolve,reject)=>{

            pass = {
                password : password.hashpassword(req.body.password),
                passwordResetToken : null
            }
            userModel.update({userId:userDetails.userId},pass).exec((err,result)=>{
                if(err){
                    console.log(err.message, 'userController: upadateUser to reset password', 10)
                let apiResponse = response.generate(true, 'Failed To Save new password to reset password', 500, null)
                reject(apiResponse)
                } else{
                    resolve(result)
                    console.log('Password updated!!!!!!!!');
                    console.log(result);
                }
            })
        })
    }

    findUser(req,res)
        .then(updateUser)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'Password reset Successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}


let logoutFunction = (req, res) => {

    authModel.findOneAndRemove({userId:req.params.userId}).exec((err,result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)){
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
  
} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    getAllUserFunction: getAllUserFunction,
    getSingleUserFunction:getSingleUserFunction,
    forgotPasswordFunction : forgotPasswordFunction,
    resetPasswordFunction:resetPasswordFunction

}// end exports