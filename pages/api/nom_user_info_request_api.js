const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
import csrf from '../../utils/cerf';
import tokenRequired from '../../eligible_client';

export default async function userCall(req, res) {
    if (req.method === 'GET') {
        await csrf(req, res);
        let user = tokenRequired(req, res, "");

        if (user['status']) {
            // session host API response
            const tokenAttributes = user['user']['tokenArgs'];
            const id = tokenAttributes['id'];


            async function getUser() {
                return await prisma.user.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        email: true, full_name: true, class_name: true, student: true, ClassRoom: true
                    }
                });
            }

            const requiredUserDetail = await getUser();


            if (user['user']['tokenArgs']['student'] === false) {
                return res.status(200).json({teacher: true, success: true, detail: requiredUserDetail});
            } else {
                return res.status(200).json({teacher: false, success: true, detail: requiredUserDetail});
            }
        } else {
            return res.status(200).json({error: "illegal request", success: false});
        }
    }
    return res.status(200).json({success: false});
}