import cookie from 'cookie';

export default function logout(req, res) {
    const header = req.cookies['token'];
    if (header !== null) {
        console.log("FCUK REQUEST ")
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", null, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 0,
                sameSite: "strict",
                path: "/",
            })
        );
        console.log(res);
        res.status(200).json({})
    }

    return res.status(200);

}