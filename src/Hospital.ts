var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: "vinaybedre@outlook.com",
        pass: "I|_oveyousooMUCH"
    }
});

var OTP = Math.floor(Math.random() * 899999 + 100000)
var mailOptions = {
    from: 'Vinay Bedre <vinaybedre@outlook.com>', // sender address
    to: 'vinaybedre@outlook.com', // list of receivers
    subject: "OTP For Login", // Subject line
    html: 'Your OTP for login is ' + OTP
};


transport.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: ' + info.response);
    }
});