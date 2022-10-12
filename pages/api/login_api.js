import csrf from '../../utils/cerf';
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
let CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');

export default async function login(req, res) {
    await csrf(req, res);

    if (req.method === 'POST') {

        async function compareUser() {
            return await prisma.user.findMany({
                where: {
                    password: CryptoJS.SHA256(password).toString(), email: dict['email']
                }, select: {
                    password: true, email: true, full_name: true, class_name: true, student: true, active: true
                }
            });
        }

        let dict = req.body;
        let password = dict['password'];

        let user = false;
        try {
            const queryset = await compareUser();
            if (queryset.length === 1) {
                if (queryset[0]['active'] === false) {
                    return res.status(200).json({success: false});
                }

                user = true;
                let tokenArgs = {
                    success: true,
                    name: queryset[0]['full_name'],
                    class_name: queryset[0]['class_name'],
                    email: queryset[0]['email'],
                    student: queryset[0]['student']

                }

                jwt.sign({tokenArgs}, '', function (err, token) {
                    return res.status(200).json({
                        message: "valid", server_permit: token, success: true, username: queryset[0]['full_name']
                    });
                }, {expiresIn: '1h'});
            } else {
                return res.status(200).json({success: false});
            }
        } catch (err) {
            user = false;
        }
        if (user === false) {
            return res.status(200).json({success: false});
        }
        // RDKO3l6qNA2Q4&index=4
    } else {
        return res.status(200).json({});
    }

}