const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const appConfig = require('./../../config/appConfig');


module.exports.setRouter = (app) =>{
    
    let baseUrl = `${appConfig.version}/users`;
    console.log('Inside userRoutes.js');

    app.get(`${baseUrl}/all`,userController.getAllUserFunction);

        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/all api for Getting all users.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Details Found",
            "status": 200,
            "data": [
                {
                    "createdOn": "2018-09-12T13:42:58.000Z",
                    "validationToken": "",
                    "email": "satyam@gmail.com",
                    "password": "xxxxxxxxxxxxxxxxxxx",
                    "isAdmin": "true",
                    "mobileNumber": "11111111111",
                    "countryCode": "91",
                    "userName": "naruto-admin",
                    "lastName": "Cool",
                    "firstName": "Naruto",
                    "userId": "qwerty"
                }
            ]
        }
    */

    app.get(`${baseUrl}/:userId`,userController.getSingleUserFunction);

        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:userId api for getting user details.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Details Found",
            "status": 200,
            "data": {
                    "createdOn": "2018-09-12T13:42:58.000Z",
                    "validationToken": "",
                    "email": "satyam@gmail.com",
                    "password": "xxxxxxxxxxxxxxxxxxx",
                    "isAdmin": "true",
                    "mobileNumber": "11111111111",
                    "countryCode": "91",
                    "userName": "naruto-admin",
                    "lastName": "Cool",
                    "firstName": "Naruto",
                    "userId": "qwerty"
            }
        }
    */

    app.post(`${baseUrl}/signup`,userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for Registering User.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastname Last Name of the user. (body params) (required)
     * @apiParam {string} userName userName of the user. (body params) (required)
     * @apiParam {string} countryCode country Name of the user. (body params) (required)
     * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
     * @apiParam {string} isAdmin String(true/false) true-if user is admin and false-if user is not admin. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "User Created",
        "status": 200,
        "data": [
            {
                "createdOn": "2018-09-12T13:42:58.000Z",
                    "validationToken": "",
                    "email": "satyam@gmail.com",
                    "password": "xxxxxxxxxxxxxxxxxxx",
                    "isAdmin": "true",
                    "mobileNumber": "11111111111",
                    "countryCode": "91",
                    "userName": "naruto-admin",
                    "lastName": "Cool",
                    "firstName": "Naruto",
                    "userId": "qwerty"
            }
        }
    */


    app.post(`${baseUrl}/login`,userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for Login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InJrVW51b2pPbSIsImlhdCI6MTUzNzA5MTc1NzU1NywiZXhwIjoxNTM3MTc4MTU3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJsZXRzTWVldEFwcCIsImRhdGEiOnsiZW1haWxWZXJpZmllZCI6IlllcyIsInZhbGlkYXRpb25Ub2tlbiI6Ik51bGwiLCJlbWFpbCI6InNheXllZHNvZnR0ZWNoMzEzQGdtYWlsLmNvbSIsImlzQWRtaW4iOiJ0cnVlIiwibW9iaWxlTnVtYmVyIjoiOTEgNzg0MDk2Mjg4NyIsImNvdW50cnlOYW1lIjoiSW5kaWEiLCJ1c2VyTmFtZSI6IlNoYWgtYWRtaW4iLCJsYXN0TmFtZSI6IlNheXllZCIsImZpcnN0TmFtZSI6IlNoYWhydWtoIiwidXNlcklkIjoiQjFjeXVjOE9YIn19.fcCu0TZQ-WnAs8bOmZa9YhF1YVv2JscTwOPT--rTwbc",
                "userDetails": {
                    "validationToken": "",
                    "email": "satyam@gmail.com",
                    "password": "xxxxxxxxxxxxxxxxxxx",
                    "isAdmin": "true",
                    "mobileNumber": "11111111111",
                    "countryCode": "91",
                    "userName": "naruto-admin",
                    "lastName": "Cool",
                    "firstName": "Naruto",
                    "userId": "qwerty"
                }
            }
        }    
    */


    app.get(`${baseUrl}/:userId/logout`,userController.logoutFunction);

        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/:userId/logout api to logout from application.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    */

    app.post(`${baseUrl}/forgot`,userController.forgotPasswordFunction);

        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgot api for Password Reset.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Password reset link sent Successfully",
            "status": 200,
            "data": None
        }    
    */


    app.post(`${baseUrl}/reset`,userController.resetPasswordFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/reset api for Changing Password.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} oldPassword old Password of the user. (body params) (required)
     * @apiParam {string} newPassword new Password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Password Update Successfully",
            "status": 200,
            "data": "None"
        }
    */

}