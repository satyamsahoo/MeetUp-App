const mongoose = require('mongoose');
const authModel = mongoose.model('Auth');
const check = require('./../libs/checkLib');
const token = require('./../libs/tokenLib');

let isAuthorized = (req, res, next) =>{
    if(req.header('authToken') || req.body.authToken || req.params.authToken || req.query.authToken){
        authModel.findOne({authToken: req.header('authToken') || req.body.authToken || req.params.authToken || req.query.authToken},(err,result)=>{
            if(err){
                console.log('some error occured while authorizing.')
            } else if (check.isEmpty(result)){
                console.log('Invalid or expired authToken')
            } else {
                token.verifyToken(result.authToken,result.authSecret,(err,decoded)=>{
                    if(err){

                    }else{
                        console.log(decoded.data);
                        next();
                    }
                })
            }
        })
    } else {
        console.log('Auth token missing')
    }
}

module.exports={
    isAuthorized: isAuthorized
}