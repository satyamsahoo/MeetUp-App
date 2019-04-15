const nodemailer = require("nodemailer");
const smtptransport = require('nodemailer-smtp-transport');

let sendPasswordResetEmail=(emailDetails)=>{

    account = {
        email : 'narutocool67@gmail.com',
        password: 'naruto@007'
    }

    let transporter = nodemailer.createTransport(smtptransport({
        host: 'smtp.gmail.com',
        sevice : 'gmail',
        port: 465, // true for 465, false for other ports
        auth: {
          user: account.email, // generated ethereal user
          pass: account.password // generated ethereal password
        }
    }));

    let mailOption = {
        to : emailDetails.email,
        from : account.email,
        subject :emailDetails.subject,
        text : `Hello ${emailDetails.name}
                Welcome to our MeetUp application.`,
        html : emailDetails.html        
    }

    transporter.sendMail(mailOption,(error,info)=>{
        if (error) {
            console.log('error on send email from emailLib');
            return console.log(error);
        }
        else{
            console.log('Mail successfully sent.', info);
        }
    })
}

module.exports = {
    sendEmail:sendPasswordResetEmail
}
