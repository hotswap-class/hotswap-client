import * as nodemailer from 'nodemailer';

class OTPHandler {
    private transport;
    private otp;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: "smtp.yandex.com",
            port: 465,
            auth: {
                user: "swethaphatke@yandex.com",
                pass: "helloswetha"
            }
        });
    }

    public generateOTP(email) {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            //generateOTP
            this.otp = Math.floor(Math.random() * 899999 + 100000);
            let mailOptions = {
                from: 'Swetha Phatke <swethaphatke@yandex.com>', // sender address
                to: email, // list of receivers
                subject: "OTP For Login", // Subject line
                html: 'Your OTP for login is ' + this.otp
            };

            this.transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    alert('OTP Sending Failed. Check your intenet connection');
                } else {
                    console.log('Message sent: ' + info.response);
                    alert('OTP sent to ' + email + '. Please login using OTP');
                }
            });
        } else {
            alert('Invalid E Mail');
            return;
        }
    }

    public validateOTP(otp) {
        if (otp == this.otp) {
            alert('OTP validated')
        } else {
            alert('Incorrect OTP entered. Please check');
        }
    }
}

let otph = new OTPHandler();