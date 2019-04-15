const express = require('express');
const router = express.Router();
const meetingController = require('./../controllers/meetingController');
const userController = require('./../controllers/userController');
const appConfig = require('./../../config/appConfig');
const auth = require('./../middlewares/isAuthorized');

module.exports.setRouter = (app) =>{
    
    let baseUrl = `${appConfig.version}/meetings`;
    console.log('Inside MeetingRoutes.js');

    app.get(`${baseUrl}/all/meetings/:userId`, meetingController.getAllMeetingByUserId);

    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/:userId api for Getting all Meetings of User.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Getting all meetings of given user",
            "status": 200,
            "data": [
                {
                    "__v": 0,
                    "_id": "zzzzzzzzzzzzzzzzzzzzzzzz",
                    "createdOn": "Apr 7, 2019 12:56 AM",
                    "meetingPlace": "Canteen",
                    "meetingDescription": "Birthday celebration",
                    "meetingEndTime": "Apr 7, 2019 12:56 AM",
                    "meetingStartTime": "Apr 7, 2019 12:56 AM",
                    "memberEmail": "satyam@gmail.com",
                    "memberName": "Satyam sahoo",
                    "memberId": "xyz",
                    "meetingOrganiserName": "Naruto",
                    "meetingOrganiserId": "xyzz",
                    "meetingName": "Birthday",
                    "meetingId": "xxx"
                }
            ]
        }
    */

    
    app.post(`${baseUrl}/create`,meetingController.addNewMeeting);

        /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meetings/create api to Add Meeting.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} meetingName Topic of the Meeting. (body params) (required)
     * @apiParam {string} meetingOrganiserId User Id of the user hosting Meeting. (body params) (required)
     * @apiParam {string} meetingOrganiserName User Name of the user hosting Meeting. (body params) (required)
     * @apiParam {string} memberId User Id of the participant. (body params) (required)
     * @apiParam {string} memberName User Name of the participant. (body params) (required)
     * @apiParam {string} memberEmail Email of the participant. (body params) (required)
     * @apiParam {string} meetingStartTime Start date/time of Meeting. (body params) (required)
     * @apiParam {string} meetingEndTime end date/time of Meeting. (body params) (required)
     * @apiParam {string} meetingDescription Description of Meeting. (body params) (required)
     * @apiParam {string} meetingPlace Place of Meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Meeting created successfully",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "zzzzzzzzzzzzzzzzzzzzzzzz",
                "createdOn": "Apr 7, 2019 12:56 AM",
                "meetingPlace": "Canteen",
                "meetingDescription": "Birthday celebration",
                "meetingEndTime": "Apr 7, 2019 12:56 AM",
                "meetingStartTime": "Apr 7, 2019 12:56 AM",
                "memberEmail": "satyam@gmail.com",
                "memberName": "Satyam sahoo",
                "memberId": "xyz",
                "meetingOrganiserName": "Naruto",
                "meetingOrganiserId": "xyzz",
                "meetingName": "Birthday",
                "meetingId": "xxx"
            }
        }
    */

    app.get(`${baseUrl}/all-users`,userController.getAllUserFunction);

    
    app.get(`${baseUrl}/:meetingId/view`,meetingController.getMeetingDetail);

    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/:meetingId/view api for getting meeting details.
     *
     * @apiParam {string} meetingId meetingId of the Meeting. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "Meeting details",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "zzzzzzzzzzzzzzzzzzzzzzzz",
                "createdOn": "Apr 7, 2019 12:56 AM",
                "meetingPlace": "Canteen",
                "meetingDescription": "Birthday celebration",
                "meetingEndTime": "Apr 7, 2019 12:56 AM",
                "meetingStartTime": "Apr 7, 2019 12:56 AM",
                "memberEmail": "satyam@gmail.com",
                "memberName": "Satyam sahoo",
                "memberId": "xyz",
                "meetingOrganiserName": "Naruto",
                "meetingOrganiserId": "xyzz",
                "meetingName": "Birthday",
                "meetingId": "xxx"
            }
        }
    */
    app.put(`${baseUrl}/:meetingId/update`, meetingController.updateMeeting);

        /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {put} /api/v1/meetings/:meetingId/update api to Update Meeting Details.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} meetingId Id of the Meeting. (query params) (required)
     * @apiParam {string} meetingName Topic of the Meeting. (body params) (required)
     * @apiParam {string} meetingStartTime Start date/time of Meeting. (body params) (required)
     * @apiParam {string} meetingEndTime end date/time of Meeting. (body params) (required)
     * @apiParam {string} meetingDescription Description of Meeting. (body params) (required)
     * @apiParam {string} meetingPlace Place of Meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Meeting Updated",
            "status": 200,
            "data": {
                "error": false,
                "message": "Meeting Updated",
                "status": 200,
                "data": "None"
            }
        }
    */

    app.get(`${baseUrl}/:meetingId/delete`, meetingController.deleteMeeting);


    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/:meetingId/delete api to Delete Meeting.
     *
     * @apiParam {string} meetingId meetingId of the Meeting to be deleted. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Meeting Deleted",
            "status": 200,
            "data": {
                "error": false,
                "message": "Meeting deleted successfully",
                "status": 200,
                "data": {
                    "__v": 0,
                    "_id": "zzzzzzzzzzzzzzzzzzzzzzzz",
                    "createdOn": "Apr 7, 2019 12:56 AM",
                    "meetingPlace": "Canteen",
                    "meetingDescription": "Birthday celebration",
                    "meetingEndTime": "Apr 7, 2019 12:56 AM",
                    "meetingStartTime": "Apr 7, 2019 12:56 AM",
                    "memberEmail": "satyam@gmail.com",
                    "memberName": "Satyam sahoo",
                    "memberId": "xyz",
                    "meetingOrganiserName": "Naruto",
                    "meetingOrganiserId": "xyzz",
                    "meetingName": "Birthday",
                    "meetingId": "xxx"
                }
            }
        }
    */
}