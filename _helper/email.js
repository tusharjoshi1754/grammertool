const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    host: "mail.silverwebbuzz.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "chandrakant@silverwebbuzz.com", // generated ethereal user
      pass:  "silver@306"
    },
    tls: {
        rejectUnauthorized: false
    }
});


async function sendDynamicMail(to, subject, htmlSend){
    var mailOptions = {
        from: 'chandrakant@silverwebbuzz.com',
        to : to,
        subject : subject,
        html : htmlSend
    };

    smtpTransport.sendMail(mailOptions,function (error, response) {
        console.log('response',response);
        console.log('error',error);
        if(response){
            return true;
        }
        if (error) {
           return error;
            //callback(error);
        }
    });
}

module.exports = {
    sendDynamicMail
}