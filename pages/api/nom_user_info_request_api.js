const {PrismaClient} = require('@prisma/client');
import csrf from '../../utils/cerf';
import tokenRequired from '../../eligible_client';

export default async function userCall(req, res) {
    await csrf(req, res);
    if (req.method === 'GET') {
        let user = tokenRequired(req, res, "");

        if (user['status']) {
            // session host API response
            if (user['user']['tokenArgs']['student'] === false) {
                return res.status(200).json({teacher: true, success: true});
            } else {
                return res.status(200).json({teacher: false, success: true});
            }
        }else{
            return res.status(200).json({error: "illegal request", success: false});
        }
    }
    return res.status(200).json({success: false});
}