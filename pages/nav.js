import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Router from "next/router";
import csrf from "../utils/cerf";


export async function getServerSideProps(context) {
    const {req, res} = context
    await csrf(req, res)
    return {
        props: {csrfToken: req.csrfToken()},
    }
}


export default function Nav({csrfToken}) {
    const [log, setLog] = React.useState(false);
    const [user, setUser] = React.useState("");
    // temp validation just for display
    React.useEffect(() => {
        let tk = localStorage.getItem("username");
        if (tk !== null) {
            setUser(tk);
            setLog(true);
        } else {
            setLog(false);
        }
    }, []);


    const UserGreetings = (params) => {
        if (params.bool === true) {
            return (
                <div>
                    <Button color="inherit">Sir. {user}</Button>
                </div>
            )
        } else {
            return null;
        }
    }

    const logout = () => {
        const request = new Request('/api/logout', {
            headers: {'Content-Type': 'application/json', 'CSRF-Token': csrfToken}
        });
        fetch(request, {
            method: 'post',
            mode: "same-origin",
            body: JSON.stringify({})
        }).then();
    }

    const NavMainLogic = (params) => {
        if (params.bool) {
            return (
                <div>
                    <Button onClick={() => {
                        logout();
                        setLog(false);
                    }} color="inherit">Logout</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button onClick={() => {
                        Router.push('/login')
                    }} color="inherit">Login</Button>
                    <Button onClick={() => {
                        Router.push('/register');
                    }} color="inherit">Register</Button>
                </div>
            );
        }
    }

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography onClick={() => {
                            Router.push('/')
                        }} variant="h6" component="div" sx={{flexGrow: 1}}>
                            Notes App
                        </Typography>
                        <UserGreetings bool={log}/>
                        <NavMainLogic bool={log}/>
                    </Toolbar>
                </AppBar>
            </Box>
            <br/>
        </div>
    )
}