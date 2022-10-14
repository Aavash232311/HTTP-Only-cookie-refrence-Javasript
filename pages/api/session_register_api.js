import csrf from '../../utils/cerf';

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
import tokenRequired from '../../eligible_client';

export default async function SessionRegister(req, res) {
    await csrf(req, res);
    if (req.method === "POST") {
        let user = tokenRequired(req, res, "");
        const className = req.body['class_name'];
        const classCode = req.body['class_code'];
        const subject_code = req.body['subject_code'];

        if ((className === '' || className.length > 25) || (classCode === '' || classCode.length > 25) ||
            (subject_code.length > 25 || subject_code === '')) {
            return res.status(403).json({success: false, message: "empty or length limit exceeded"});
        }
        const userId = user['user']['tokenArgs']['id'];

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ClassRoom: {
                    create: [
                        {name: className, Grade: classCode, SubjectName: subject_code},
                    ],
                }
            }
        });
        return res.status(200).json({success: true});
    }
    return res.status(403).json({success: false});
}