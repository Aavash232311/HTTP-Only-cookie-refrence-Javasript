import Nav from './nav.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@mui/material/Button";
import csrf from "../utils/cerf";
import * as React from 'react';
import Router from 'next/router';

export async function getServerSideProps(context) {
    const {req, res} = context;
    await csrf(req, res);
    return {
        props: {csrfToken: req.csrfToken()},
    }
}

export default function CreateSession({csrfToken}) {
    const formFrame = {
        width: "50%",
        height: "500px"
    }

    const rowFormTrim = {
        width: "100%",
        float: "left",
        marginTop: "20px"
    }

    const formTrim = {
        width: "80%",
        float: "left"
    }

    const hostFromSubmit = () => {
        let token = localStorage.getItem("token");
        const request = new Request('/api/session_register_api', {
            headers: {'Content-Type': 'application/json', 'CSRF-Token': csrfToken, 'params': token}
        });
        fetch(request, {
            mode: 'same-origin',
            method: "post",
            body: JSON.stringify({
                'class_name': className.current.value,
                'class_code': classCode.current.value,
                'subject_code': subjectCode.current.value,
            })
        }).then(rsp => rsp.json()).then(function (response) {
            if (response.success === true){
                Router.push('/');
            }else{
                if (response.message){
                    alert(response.message);
                }
            }
        })
    }

    const className = React.useRef(null);
    const classCode = React.useRef(null);
    const subjectCode = React.useRef(null);


    return (
        <div>
            <Nav/> <br/>
            <center>
                <div className="shadow p-3 mb-5 bg-white rounded" style={formFrame}>
                    <center>
                        <h5>CREATE CLASSROOM</h5>
                    </center>
                    <br/>
                    <div>
                        <div style={rowFormTrim}>
                            <input ref={className} style={formTrim} type="text" className="form-control"
                                   placeholder="Classroom Name"/>
                        </div>
                        <div style={rowFormTrim}>
                            <input ref={classCode} style={formTrim} type="text" className="form-control"
                                   placeholder="Classroom code or grade"/>
                        </div>

                        <div style={rowFormTrim}>
                            <input ref={subjectCode} style={formTrim} type="text" className="form-control"
                                   placeholder="Subject Name"/>
                        </div>
                        <Button onClick={(ev) => {
                            hostFromSubmit(ev);
                        }} variant="contained"
                                style={{width: "80%", marginTop: "50px", float: "left"}}>Host</Button>
                    </div>

                </div>
            </center>
        </div>
    )
}