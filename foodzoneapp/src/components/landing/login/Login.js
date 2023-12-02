import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Alert from '@mui/material/Alert';
import GoogleButton from 'react-google-button';

function Login() {
    const [inputInfo, setInputInfo] = useState({
        username: "",
        password: "",
    });

    const [errorState, setErrorState] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // Apply prevetnDefault to prevent the auto page refresh
        event.preventDefault();

        let bodyContent = {
            username: inputInfo['username'],
            password: inputInfo['password']
        }
        const loginURL = 'https://foodzone-gd25.herokuapp.com/login';
        fetch(loginURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyContent),
            credentials: 'include'
        }).then(res => {
            if (res.status !== 401) {
                navigate("/main");
            } else {
                setErrorState(true);
            }
        })
    }

    const handleChange = (event) => {
        setInputInfo({ ...inputInfo, [event.target.name]: event.target.value });
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://foodzone-gd25.herokuapp.com/auth/google';
    }


    return (
        <Box component="main" maxWidth="sm">
            <Paper variant="elevation" elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
                <Typography component="h1" variant="h5" align="center" fontFamily="Raleway, Arial, sans-serif">
                    Sign in
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid item>
                                {errorState && <Alert data-testid="alert" severity="error">Incorrect username or password. Try again!</Alert>}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                onChange={handleChange}
                                autoFocus
                                inputProps={{ "data-testid": "username" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="Password"
                                inputProps={{ "data-testid": "password" }}
                                label="Password"
                                name="password"
                                onChange={handleChange}
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                data-testid="signin-btn"
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12}>
                                <GoogleButton
                                    type="light"
                                    onClick={handleGoogleLogin}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                Don't have an account? Sign up
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;