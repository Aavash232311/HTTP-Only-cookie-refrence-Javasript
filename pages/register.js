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
import csrf from '../utils/cerf';
import {Switch} from "@mui/material";
import Router from 'next/router'

const theme = createTheme();

export default function Register({csrfToken}) {

    const full_name = React.useRef(null);
    const class_name = React.useRef(null);
    const email = React.useRef(null);
    const password1 = React.useRef(null);
    const password2 = React.useRef(null);

    const submitForm = (ev) => {
        ev.preventDefault();
        const request = new Request('/api/user_creation', {
            headers: {'Content-Type': 'application/json', 'CSRF-Token': csrfToken}
        });
        let std;
        if (student) {
            std = false;
        } else {
            std = true;
        }
        fetch(request, {
            method: 'POST', mode: 'same-origin', body: JSON.stringify(JSON.stringify({
                full_name: full_name.current.value,
                class_name: class_name.current.value,
                email: email.current.value,
                password1: password1.current.value,
                password2: password2.current.value,
                student: std
            }))
        }).then(rsp => rsp.json()).then(function (resp) {
            if (resp.message === 'VALID') {
                Router.push('/email_code/' + email.current.value);
            }
        })

    }

    const [student, setStudent] = React.useState(true);

    const setStd = () => {
        if (student === true) {
            setStudent(false);
        } else {
            setStudent(true);
        }
    }


    return (
        <div>
            <Nav/>
            <div>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography style={{color: "black"}} component="h1" variant="h5">
                                Register
                            </Typography>
                            <Box component="form" onSubmit={(ev) => {
                                submitForm(ev);
                            }} noValidate sx={{mt: 1}}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="full name"
                                    label="full name"
                                    name="full_name"
                                    autoFocus
                                    inputProps={{ref: full_name}}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="class"
                                    label="class"
                                    name="class"
                                    autoFocus
                                    inputProps={{ref: class_name}}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoFocus
                                    inputProps={{ref: email}}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password1"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    inputProps={{ref: password1}}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="conform password"
                                    type="password"
                                    id="password2"
                                    inputProps={{ref: password2}}
                                />
                                <FormControlLabel style={{color: "black"}}
                                                  control={<Switch onInput={setStd} color="warning"/>}
                                                  label="Student"
                                                  labelPlacement="end"

                                /> <br/>
                                <FormControlLabel style={{color: "black"}}
                                                  control={<Checkbox value="remember"/>}
                                                  label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
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
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {req, res} = context
    await csrf(req, res)
    return {
        props: {csrfToken: req.csrfToken()},
    }
}