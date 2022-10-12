import csrf from '../../utils/cerf';

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

export default async function (req, res) {
    await csrf(req, res);
    if (req.method === 'POST') {
        let body = req.body;

        async function getUserModel() {
            return await prisma.user.findUnique({
                where: {
                    email: body['email']
                },
                select: {
                    email: true,
                    one_time_password: true
                }
            });
        }

        let queryset = await getUserModel();

        if (parseInt(queryset['one_time_password']) === parseInt(body['code'])) {
            await prisma.user.update({
                where: {
                    email: body['email']
                },
                data: {
                    one_time_password: 0,
                     active: true
                }
            });


            return res.status(200).json({success: true})
        } else {
            return res.status(200).json({success: false})
        }
    }
    return res.status(200).json({})
}