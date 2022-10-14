const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
import csrf from '../../utils/cerf';

let passwordValidator = require('password-validator');
let schema = new passwordValidator();
schema
    .is().min(8)                                     // Minimum length 8
    .is().max(100)                                   // Maximum length 100
    .has().uppercase()                                   // Must have uppercase letters
    .has().lowercase()                                // Must have lowercase letters
    .has().digits(2)                            // Must have at least 2 digits
    .has().not().spaces()                            // Should not have spaces
let CryptoJS = require("crypto-js");
const nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aavash3150@gmail.com',
        pass: ""
    }
});
export const senderGmail = 'aavash3150@gmail.com'
export const mailOptions = (from, to, subject, text) => {
    return {
        from: from,
        to: to,
        subject: subject,
        text: text
    }
}

export const mailSubject = "Hi there this is message from FoodPortal here is your verification code ";


export default async function handler(req, res) {
    // csrf middleware intersection
    await csrf(req, res);
    if (req.method === 'POST') {
        let attr = JSON.parse(req.body);

        async function getUser() {
            return await prisma.user.findUnique({
                where: {
                    email: attr['email']
                },
                select: {
                    email: true
                }
            });
        }

        let user = false;
        try {
            const usr = await getUser();
            if (usr.length > 0) {
                user = true;
            }
        } catch (err) {

        }
        if (user) {
            res.status(200).json({message: 'user exists', verification: false, test: getUser()});
        } else {
            if (schema.validate(attr['password1'])) {

                if (attr['password1'] !== attr['password2']) {
                    res.status(200).json({message: "two password field didn't matched", verification: false});
                } else {

                    await prisma.user.create({
                        data: {
                            full_name: attr['full_name'],
                            email: attr['email'],
                            password: CryptoJS.SHA256(attr['password1']).toString(),
                            class_name: attr['class_name'],
                            attempt: 0,
                            one_time_password: 0,
                            student: attr['student']
                        },
                    });


                    function generateRandomIntegerInRange(min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    let otpCode = generateRandomIntegerInRange(1000, 9999);

                    // email verification
                    // validation code valid for 30min
                    // false value tolerance count is 5
                    // resend verification api

                    await transporter.sendMail(mailOptions(
                        senderGmail,
                        attr['email'],
                        "verification code",
                        mailSubject + otpCode,
                    ), function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            const db_otb = async () => {
                                await prisma.user.update({
                                    where: {
                                        email: attr['email']
                                    },
                                    data: {
                                        one_time_password: otpCode
                                    }
                                });
                            }
                            db_otb();
                        }
                    });
                    res.status(200).json({message: 'VALID', verification: true, email: attr['email']});
                }
            } else {
                let err = schema.validate('joke', {details: true});
                res.status(200).json({message: err, verification: false});
            }
            // error
        }
    }
}