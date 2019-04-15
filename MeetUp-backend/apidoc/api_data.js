define({ "api": [
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:meetingId/delete",
    "title": "api to Delete Meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meetingId of the Meeting to be deleted. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting Deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"error\": false,\n        \"message\": \"Meeting deleted successfully\",\n        \"status\": 200,\n        \"data\": {\n            \"__v\": 0,\n            \"_id\": \"zzzzzzzzzzzzzzzzzzzzzzzz\",\n            \"createdOn\": \"Apr 7, 2019 12:56 AM\",\n            \"meetingPlace\": \"Canteen\",\n            \"meetingDescription\": \"Birthday celebration\",\n            \"meetingEndTime\": \"Apr 7, 2019 12:56 AM\",\n            \"meetingStartTime\": \"Apr 7, 2019 12:56 AM\",\n            \"memberEmail\": \"satyam@gmail.com\",\n            \"memberName\": \"Satyam sahoo\",\n            \"memberId\": \"xyz\",\n            \"meetingOrganiserName\": \"Naruto\",\n            \"meetingOrganiserId\": \"xyzz\",\n            \"meetingName\": \"Birthday\",\n            \"meetingId\": \"xxx\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetingRoutes.js",
    "groupTitle": "Meetings",
    "name": "GetApiV1MeetingsMeetingidDelete"
  },
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:meetingId/view",
    "title": "api for getting meeting details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meetingId of the Meeting. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n    \"error\": false,\n    \"message\": \"Meeting details\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"zzzzzzzzzzzzzzzzzzzzzzzz\",\n        \"createdOn\": \"Apr 7, 2019 12:56 AM\",\n        \"meetingPlace\": \"Canteen\",\n        \"meetingDescription\": \"Birthday celebration\",\n        \"meetingEndTime\": \"Apr 7, 2019 12:56 AM\",\n        \"meetingStartTime\": \"Apr 7, 2019 12:56 AM\",\n        \"memberEmail\": \"satyam@gmail.com\",\n        \"memberName\": \"Satyam sahoo\",\n        \"memberId\": \"xyz\",\n        \"meetingOrganiserName\": \"Naruto\",\n        \"meetingOrganiserId\": \"xyzz\",\n        \"meetingName\": \"Birthday\",\n        \"meetingId\": \"xxx\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetingRoutes.js",
    "groupTitle": "Meetings",
    "name": "GetApiV1MeetingsMeetingidView"
  },
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:userId",
    "title": "api for Getting all Meetings of User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Getting all meetings of given user\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"__v\": 0,\n            \"_id\": \"zzzzzzzzzzzzzzzzzzzzzzzz\",\n            \"createdOn\": \"Apr 7, 2019 12:56 AM\",\n            \"meetingPlace\": \"Canteen\",\n            \"meetingDescription\": \"Birthday celebration\",\n            \"meetingEndTime\": \"Apr 7, 2019 12:56 AM\",\n            \"meetingStartTime\": \"Apr 7, 2019 12:56 AM\",\n            \"memberEmail\": \"satyam@gmail.com\",\n            \"memberName\": \"Satyam sahoo\",\n            \"memberId\": \"xyz\",\n            \"meetingOrganiserName\": \"Naruto\",\n            \"meetingOrganiserId\": \"xyzz\",\n            \"meetingName\": \"Birthday\",\n            \"meetingId\": \"xxx\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetingRoutes.js",
    "groupTitle": "Meetings",
    "name": "GetApiV1MeetingsUserid"
  },
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/create",
    "title": "api to Add Meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingName",
            "description": "<p>Topic of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingOrganiserId",
            "description": "<p>User Id of the user hosting Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingOrganiserName",
            "description": "<p>User Name of the user hosting Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "memberId",
            "description": "<p>User Id of the participant. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "memberName",
            "description": "<p>User Name of the participant. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "memberEmail",
            "description": "<p>Email of the participant. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingStartTime",
            "description": "<p>Start date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingEndTime",
            "description": "<p>end date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingDescription",
            "description": "<p>Description of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingPlace",
            "description": "<p>Place of Meeting. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting created successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"zzzzzzzzzzzzzzzzzzzzzzzz\",\n        \"createdOn\": \"Apr 7, 2019 12:56 AM\",\n        \"meetingPlace\": \"Canteen\",\n        \"meetingDescription\": \"Birthday celebration\",\n        \"meetingEndTime\": \"Apr 7, 2019 12:56 AM\",\n        \"meetingStartTime\": \"Apr 7, 2019 12:56 AM\",\n        \"memberEmail\": \"satyam@gmail.com\",\n        \"memberName\": \"Satyam sahoo\",\n        \"memberId\": \"xyz\",\n        \"meetingOrganiserName\": \"Naruto\",\n        \"meetingOrganiserId\": \"xyzz\",\n        \"meetingName\": \"Birthday\",\n        \"meetingId\": \"xxx\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetingRoutes.js",
    "groupTitle": "Meetings",
    "name": "PostApiV1MeetingsCreate"
  },
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/meetings/:meetingId/update",
    "title": "api to Update Meeting Details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Id of the Meeting. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingName",
            "description": "<p>Topic of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingStartTime",
            "description": "<p>Start date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingEndTime",
            "description": "<p>end date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingDescription",
            "description": "<p>Description of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingPlace",
            "description": "<p>Place of Meeting. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting Updated\",\n    \"status\": 200,\n    \"data\": {\n        \"error\": false,\n        \"message\": \"Meeting Updated\",\n        \"status\": 200,\n        \"data\": \"None\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetingRoutes.js",
    "groupTitle": "Meetings",
    "name": "PutApiV1MeetingsMeetingidUpdate"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/all",
    "title": "api for Getting all users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2018-09-12T13:42:58.000Z\",\n            \"validationToken\": \"\",\n            \"email\": \"satyam@gmail.com\",\n            \"password\": \"xxxxxxxxxxxxxxxxxxx\",\n            \"isAdmin\": \"true\",\n            \"mobileNumber\": \"11111111111\",\n            \"countryCode\": \"91\",\n            \"userName\": \"naruto-admin\",\n            \"lastName\": \"Cool\",\n            \"firstName\": \"Naruto\",\n            \"userId\": \"qwerty\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId",
    "title": "api for getting user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n            \"createdOn\": \"2018-09-12T13:42:58.000Z\",\n            \"validationToken\": \"\",\n            \"email\": \"satyam@gmail.com\",\n            \"password\": \"xxxxxxxxxxxxxxxxxxx\",\n            \"isAdmin\": \"true\",\n            \"mobileNumber\": \"11111111111\",\n            \"countryCode\": \"91\",\n            \"userName\": \"naruto-admin\",\n            \"lastName\": \"Cool\",\n            \"firstName\": \"Naruto\",\n            \"userId\": \"qwerty\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgot",
    "title": "api for Password Reset.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password reset link sent Successfully\",\n    \"status\": 200,\n    \"data\": None\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgot"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for Login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InJrVW51b2pPbSIsImlhdCI6MTUzNzA5MTc1NzU1NywiZXhwIjoxNTM3MTc4MTU3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJsZXRzTWVldEFwcCIsImRhdGEiOnsiZW1haWxWZXJpZmllZCI6IlllcyIsInZhbGlkYXRpb25Ub2tlbiI6Ik51bGwiLCJlbWFpbCI6InNheXllZHNvZnR0ZWNoMzEzQGdtYWlsLmNvbSIsImlzQWRtaW4iOiJ0cnVlIiwibW9iaWxlTnVtYmVyIjoiOTEgNzg0MDk2Mjg4NyIsImNvdW50cnlOYW1lIjoiSW5kaWEiLCJ1c2VyTmFtZSI6IlNoYWgtYWRtaW4iLCJsYXN0TmFtZSI6IlNheXllZCIsImZpcnN0TmFtZSI6IlNoYWhydWtoIiwidXNlcklkIjoiQjFjeXVjOE9YIn19.fcCu0TZQ-WnAs8bOmZa9YhF1YVv2JscTwOPT--rTwbc\",\n        \"userDetails\": {\n            \"validationToken\": \"\",\n            \"email\": \"satyam@gmail.com\",\n            \"password\": \"xxxxxxxxxxxxxxxxxxx\",\n            \"isAdmin\": \"true\",\n            \"mobileNumber\": \"11111111111\",\n            \"countryCode\": \"91\",\n            \"userName\": \"naruto-admin\",\n            \"lastName\": \"Cool\",\n            \"firstName\": \"Naruto\",\n            \"userId\": \"qwerty\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/reset",
    "title": "api for Changing Password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>old Password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>new Password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password Update Successfully\",\n    \"status\": 200,\n    \"data\": \"None\"\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersReset"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for Registering User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>country Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>String(true/false) true-if user is admin and false-if user is not admin. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Created\",\n\"status\": 200,\n\"data\": [\n    {\n        \"createdOn\": \"2018-09-12T13:42:58.000Z\",\n            \"validationToken\": \"\",\n            \"email\": \"satyam@gmail.com\",\n            \"password\": \"xxxxxxxxxxxxxxxxxxx\",\n            \"isAdmin\": \"true\",\n            \"mobileNumber\": \"11111111111\",\n            \"countryCode\": \"91\",\n            \"userName\": \"naruto-admin\",\n            \"lastName\": \"Cool\",\n            \"firstName\": \"Naruto\",\n            \"userId\": \"qwerty\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/logout",
    "title": "api to logout from application.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridLogout"
  }
] });
