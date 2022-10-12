let jwt = require('jsonwebtoken');


export default function tokenRequired(req, res, next) {
    const header = req.headers['params'];
    if (typeof header !== "undefined") {
        return jwt.verify(header, '', function (err, decoded) {
            if (err) return false;
            return {user: decoded, status: true};
        });
    } else {
        return false;
    }
}