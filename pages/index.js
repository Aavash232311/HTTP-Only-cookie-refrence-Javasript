import Nav from './nav.js';
import csrf from "../utils/cerf";
import * as React from 'react';
import Button from "@mui/material/Button";
import {MdSchool} from 'react-icons/md';
import Router from "next/router";


export async function getServerSideProps(context) {
    // req.cookies is a server side cookie
    const {req, res} = context;
    await csrf(req, res);
    // let jwt = require('jsonwebtoken');
    //
    // jwt.verify(req.cookies['token'], process.env.JWT_SECRET_KEY, function (err, decoded) {
    //     if (err) return false;
    //
    // });

    return {
        props: {csrfToken: req.csrfToken()},
    }
}

let overflow = 0;

function Home({csrfToken}) {

    const userDetail = async () => {
        try {
            let token = localStorage.getItem("token");
            return await fetch('/api/nom_user_info_request_api/', {
                headers: {
                    'Content-Type': 'application/json', 'CSRF-Token': csrfToken
                }
            }).then(rsp => rsp.json()).then(function (rsp) {
                return rsp;
            });
        } catch (err) {

        }
    }

    const [user, setUser] = React.useState(false);

    if (overflow === 0) {
        userDetail().then(rsp => rsp).then(function (response) {
            if (response === undefined) {
                return;
            }
            const user = response.detail['student'];

            if (user) {
                setUser(false);
            } else {
                setUser(true);
            }
        });
    }
    overflow++;

    const subNav = {
        width: "100%",
        borderBottom: "1px solid gray",
        marginTop: "-15px"
    }

    const TeacherMenu = (params) => {
        if (params.bool === false) {
            return (
                <div>
                    <div style={subNav}>
                        <Button
                            id="basic-button"
                            onClick={() => {
                                Router.push('/create_session')
                            }}
                        >
                            Create classroom <MdSchool style={{marginLeft: "5px", fontSize: "20px"}}/>
                        </Button>
                    </div>
                    <br/>
                </div>
            )
        } else {
            return null;
        }
    }


    return (
        <div style={{color: "black"}}>
            <Nav/>
            <TeacherMenu bool={user}/>
        </div>
    );
}

export default Home;