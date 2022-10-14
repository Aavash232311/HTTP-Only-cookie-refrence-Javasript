import csrf from '../../utils/cerf';
import cookie from 'cookie';

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
let CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');

export default async function login(req, res) {
    const csrfToken = await csrf(req, res);

    if (req.method === 'POST') {

        async function compareUser() {
            return await prisma.user.findMany({
                where: {
                    password: CryptoJS.SHA256(password).toString(), email: dict['email']
                }, select: {
                    password: true,
                    email: true,
                    full_name: true,
                    class_name: true,
                    student: true,
                    active: true,
                    id: true
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
                    student: queryset[0]['student'],
                    id: queryset[0]['id']

                }

                jwt.sign({tokenArgs}, process.env.JWT_SECRET_KEY, function (err, token) {
                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("token", token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== "development",
                            maxAge: 60 * 60,
                            sameSite: "strict",
                            path: "/",
                        })
                    );
                    return res.status(200).json({
                        message: "valid", success: true, username: queryset[0]['full_name']
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