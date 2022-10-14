let jwt = require('jsonwebtoken');


export default function tokenRequired(req, res, next) {
    const header = req.cookies['token'];
    console.log(header, 'COOKIES');

    if (typeof header !== "undefined") {
        return jwt.verify(header, process.env.JWT_SECRET_KEY, function (err, decoded) {
            if (err) return false;
            return {user: decoded, status: true};
        });
    } else {
        return false;
    }
}