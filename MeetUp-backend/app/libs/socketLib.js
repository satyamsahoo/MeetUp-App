const socket = require('socket.io');
const token = require('../libs/tokenLib');
const meetingController = require('./../controllers/meetingController')

let setServer = (server) =>{
    let allMeeting = [];
    let io = socket.listen(server);
    let myIo = io.of('');


    myIo.on('connection',(socket)=>{
        console.log('Emiting verify-user');
        socket.emit('verify-user',"");

        socket.on('set-user',(authToken)=>{
            console.log('setting set-user')
            token.verifyClaimWithoutSecret(authToken,(err,decoded)=>{
                if(err){
                    console.log('Invalid authToken.');
                    socket.emit('auth-error',{status:400,message:'Auth token not correct'})
                } else {
                   
                    userDetail = {
                        message :  'You are online'
                    }
                    socket.emit('get-all-user-meeting',userDetail.message);
                }
            })
        })

        socket.on('notify-update',(data)=>{
            console.log('Notifing user of update from admin.');
            socket.broadcast.emit(data.userId,data);
        })

        socket.on('disconnect',()=>{
            console.log('User is disconnected')
        })
    })
}

module.exports = {
    setServer:setServer
}