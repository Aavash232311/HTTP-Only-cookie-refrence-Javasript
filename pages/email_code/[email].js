import Nav from "../nav";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.css";
import {useRouter} from 'next/router';
import React from 'react';
import csrf from "../../utils/cerf";
import Router from "next/router";

let jwt = require('jsonwebtoken');


export async function getServerSideProps(context) {
    const {req, res} = context
    await csrf(req, res)
    return {
        props: {csrfToken: req.csrfToken()},
    }
}

export default function Verify({csrfToken}) {
    const router = useRouter();
    const pid = router.query.email;
    const cod = React.useRef(null);

    React.useEffect(() => {
        window.addEventListener('keydown', window.send = function (ev) {
            if (ev.keyCode === 13) {
                const request = new Request('/api/otp_code', {
                    headers: {'Content-Type': 'application/json', 'CSRF-Token': csrfToken}
                });
                fetch(request, {
                    method: "post",
                    mode: 'same-origin',
                    body: JSON.stringify({
                        code: cod.current.value,
                        email: pid
                    })
                }).then(rsp => rsp.json()).then(function (response) {
                    if (response.success === true) {
                        Router.push('/');
                    }
                })
            }
        });

        return () => {
            window.removeEventListener('keydown', window.send);
        }
    }, []);

    return (
        <div>
            <Nav/>
            <br/> <br/>
            <center>
                <h5>Enter code that is sent to your email {pid}</h5> <br/>
                <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    inputProps={{ref: cod}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </center>
        </div>
    )
}