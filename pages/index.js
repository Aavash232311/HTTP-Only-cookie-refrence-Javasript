import Nav from './nav.js';
import SideNav from "../utils/side_nav";
import csrf from "../utils/cerf";
import * as React from 'react';


export async function getServerSideProps(context) {
    const {req, res} = context;
    await csrf(req, res);
    return {
        props: {csrfToken: req.csrfToken()},
    }
}

let overflow = 0;

function Home({csrfToken}) {

    const [wiggle, setWiggle] = React.useState({});
    let arr = [];


    React.useEffect(() => {
        if (overflow === 0) {
            let token = localStorage.getItem("token");
            fetch('/api/nom_user_info_request_api/', {
                headers: {
                    'Content-Type': 'application/json', 'params': token
                }
            }).then(rsp => rsp.json()).then(function (rsp) {
                if (rsp['success']) {
                    arr[0] = rsp['teacher'];
                    if (wiggle) {
                        setWiggle({bool: rsp['teacher'], array: arr});
                    } else {
                        setWiggle({bool: rsp['teacher'], array: arr});
                    }
                }
            });
        }
        overflow++;
    }, []);
    let navComponent = null;

    const dynamicCallback = (wig) => {
        if (wig['bool'] !== undefined) {
            navComponent = <SideNav type={wig['bool']}/>;
        } else {
            navComponent = null;
        }
    }

    if (wiggle['bool']) {
        dynamicCallback(wiggle);
    } else {
        dynamicCallback(wiggle);
    }


    return (
        <div style={{color: "black"}}>
            <Nav/>
            {navComponent}
        </div>
    );
}

export default Home;