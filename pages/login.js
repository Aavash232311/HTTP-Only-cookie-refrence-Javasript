import Nav from './nav';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import csrf from "../utils/cerf";
import {Alert} from "@mui/material";
import Router from "next/router";

export async function getServerSideProps(context) {
    const {req, res} = context;
    await csrf(req, res);
    return {
        props: {csrfToken: req.csrfToken()},
    }
}

function Copyright(props) {
    return (<Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
            Notes App
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>);
}

const theme = createTheme();

export default function Login({csrfToken}) {

    const email = React.useRef(null);
    const password = React.useRef(null);

    const loginFormSubmit = (ev) => {
        ev.preventDefault();
        const request = new Request('/api/login_api', {
            headers: {'Content-Type': 'application/json', 'CSRF-Token': csrfToken}
        });
        fetch(request, {
            method: 'post', mode: 'same-origin', body: JSON.stringify({
                email: email.current.value, password: password.current.value
            }),
        }).then((rsp => rsp.json())).then(function (response) {
            if (response.success === true) {
                localStorage.setItem('username', response.username);
                Router.push('/');

            } else {
                setErr(true);
            }
        })
    }

    const [err, setErr] = React.useState(false);

    const Incorrect = (params) => {
        if (params.bool === true) {
            return (<div><Alert severity="error">Incorrect username or password, or account may no be verified</Alert>
            </div>)
        } else {
            return null;
        }
    }


    return (<div>
        <Nav/>
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}
                    >
                        <Typography style={{color: "black"}} component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={(ev) => {

                        }} noValidate sx={{mt: 1}}>
                            <TextField
                                inputProps={{ref: email}}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                            />
                            <TextField
                                inputProps={{ref: password}}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            <FormControlLabel style={{color: "black"}}
                                              control={<Checkbox value="remember"/>}
                                              label="Remember me"
                            />
                            <Button
                                onClick={(ev) => {
                                    loginFormSubmit(ev);
                                }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box> <br/> <br/>
                    <Incorrect bool={err}/>
                    <Copyright sx={{mt: 8, mb: 4}}/>
                </Container>
            </ThemeProvider>
        </div>
    </div>)
}

