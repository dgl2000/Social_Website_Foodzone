import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@mui/material/Paper';

function Registration() {

    const firstRender = useRef(true);

    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(true);

    const [registerVal, setRegisterVal] = useState({
        account_name: "",
        display_name: "",
        email_address: "",
        phone_number: "",
        zipcode: "",
        date_of_birth: "",
        password: "",
        password_confirmation: ""
    });

    const [registerError, setRegisterError] = useState({
        account_name: "",
        display_name: "",
        email_address: "",
        phone_number: "",
        zipcode: "",
        date_of_birth: "",
        password: "",
        password_confirmation: ""
    })

    useEffect(() => {

        if (firstRender.current) {
            firstRender.current = false
            return
        }

        const formValidation = () => {
            let isValid = true;
            if (registerVal['account_name'] !== "") {
                const loginURL = 'https://foodzone-gd25.herokuapp.com/username/' + registerVal['account_name'];
                fetch(loginURL, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        let re = new RegExp("^[a-zA-Z]{1}[a-zA-Z0-9]*$");
                        if (!re.test(registerVal['account_name'])) {
                            setRegisterError(registerError => ({ ...registerError, 'account_name': "Username contains only letters and may not start with digit." }));
                            isValid = false;
                        } else if (data.isExist) {
                            setRegisterError(registerError => ({ ...registerError, 'account_name': "Username already exist. Try agin!" }));
                            isValid = false;
                        }
                        else {
                            setRegisterError(registerError => ({ ...registerError, 'account_name': null }));
                        }
                    })
            }
            else {
                setRegisterError(registerError => ({ ...registerError, 'account_name': null }));
            }

            if (registerVal['email_address'] !== "") {
                let re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
                if (!re.test(registerVal['email_address'])) {
                    setRegisterError(registerError => ({ ...registerError, 'email_address': "Invalid email address (Contains '@' and the suffix)!" }));
                    isValid = false;
                } else {
                    // Show the error prompt
                    setRegisterError(registerError => ({ ...registerError, 'email_address': null }));
                }
            } else {
                setRegisterError(registerError => ({ ...registerError, 'email_address': null }));
            }

            if (registerVal['phone_number'] !== "") {
                let re = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
                if (!re.test(registerVal['phone_number'])) {
                    setRegisterError(registerError => ({ ...registerError, 'phone_number': "Invalid phone number (format xxx-xxx-xxxx)!" }));
                    isValid = false;
                } else {
                    // Show the error prompt
                    setRegisterError(registerError => ({ ...registerError, 'phone_number': null }));
                }
            } else {
                setRegisterError(registerError => ({ ...registerError, 'phone_number': null }));
            }

            if (registerVal['zipcode'] !== "") {
                let re = new RegExp("^[0-9]{5}$");
                if (!re.test(registerVal['zipcode'])) {
                    setRegisterError(registerError => ({ ...registerError, 'zipcode': "Invalid zipcode (5 digits only)!" }));
                    isValid = false;
                } else {
                    // Show the error prompt
                    setRegisterError(registerError => ({ ...registerError, 'zipcode': null }));
                }
            } else {
                setRegisterError(registerError => ({ ...registerError, 'zipcode': null }));
            }

            if (registerVal['date_of_birth'] !== "") {
                if (!validateAge(registerVal['date_of_birth'])) {
                    setRegisterError(registerError => ({ ...registerError, 'date_of_birth': "Only individuals older than 18 are allowed to register!" }));
                    isValid = false;
                } else {
                    // Show the error prompt
                    setRegisterError(registerError => ({ ...registerError, 'date_of_birth': null }));
                }
            } else {
                setRegisterError(registerError => ({ ...registerError, 'date_of_birth': null }));
            }

            if (registerVal['password'] !== "" && registerVal['password_confirmation'] !== "") {
                if (registerVal['password'] !== registerVal['password_confirmation']) {
                    // Show the error prompt
                    setRegisterError(registerError => ({ ...registerError, 'password': "Password Not Match!" }));
                    isValid = false;
                } else {
                    setRegisterError(registerError => ({ ...registerError, 'password': null }));
                }
            } else {
                setRegisterError(registerError => ({ ...registerError, 'password': null }));
            }

            if (isValid) {
                return true;
            } else {
                return false;
            }
        }

        const validateAge = (birth) => {
            var birthDay = new Date(birth);
            var currentDate = new Date();
            var isValidAge = true;

            if (currentDate.getFullYear() - birthDay.getFullYear() < 18) {
                isValidAge = false;
            }

            if (currentDate.getFullYear() - birthDay.getFullYear() === 18) {

                if (currentDate.getMonth() < birthDay.getMonth()) {
                    isValidAge = false;
                }

                if (currentDate.getMonth() === birthDay.getMonth()) {
                    if (currentDate.getDate() < birthDay.getDate()) {
                        isValidAge = false;
                    }
                }
            }

            if (isValidAge) {
                return true;
            } else {
                return false;
            }
        }
        setDisabled(!formValidation());

    }, [registerVal]);

    const handleChange = (event) => {
        setRegisterVal({ ...registerVal, [event.target.name]: event.target.value });
    };

    const insertDB = () => {

        let bodyContent = {
            username: registerVal['account_name'],
            password: registerVal['password'],
            email: registerVal['email_address'],
            dob: registerVal['date_of_birth'],
            zipcode: registerVal['zipcode'],
        }
        const loginURL = 'https://foodzone-gd25.herokuapp.com/register';
        fetch(loginURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bodyContent)
        }).then(res => {
            if (res.status !== 401) {
                let bodyContent = {
                    username: registerVal['account_name'],
                    password: registerVal['password']
                }
                const loginURL = 'https://foodzone-gd25.herokuapp.com/login';
                fetch(loginURL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bodyContent),

                    credentials: 'include'
                }).then(res => {
                    if (res.status !== 401) {
                        navigate('/main');
                    }
                })
            }
        })
    }

    const handleSubmit = (event) => {
        // Apply prevetnDefault to prevent the auto page refresh
        event.preventDefault();

        insertDB();
    }

    return (
        <Box component="main" maxWidth="sm">
            <Paper variant="elevation" elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h5" align="center">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="account_name"
                                name="account_name"
                                required
                                fullWidth
                                id="account_name"
                                label="Username"
                                onChange={handleChange}
                                helperText={registerError['account_name']}
                                error={!!registerError['account_name']}
                                inputProps={{ "data-testid": "registerUsername" }}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="display_name"
                                label="Display Name"
                                name="display_name"
                                onChange={handleChange}
                                helperText={registerError['display_name']}
                                error={!!registerError['display_name']}
                                inputProps={{ "data-testid": "displayName" }}
                                autoComplete="display_name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email_address"
                                label="Email Address"
                                name="email_address"
                                type="email"
                                onChange={handleChange}
                                helperText={registerError['email_address']}
                                error={!!registerError['email_address']}
                                inputProps={{ "data-testid": "emailAddress" }}
                                autoComplete="email_address"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="phone_number"
                                label="Phone Number"
                                type="tel"
                                id="phone_number"
                                onChange={handleChange}
                                helperText={registerError['phone_number']}
                                error={!!registerError['phone_number']}
                                inputProps={{ "data-testid": "phoneNumber" }}
                                autoComplete="phone_number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="zipcode"
                                label="Zipcode"
                                type="zipcode"
                                id="zipcode"
                                onChange={handleChange}
                                helperText={registerError['zipcode']}
                                error={!!registerError['zipcode']}
                                inputProps={{ "data-testid": "zipcode" }}
                                autoComplete="zipcode"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="date_of_birth"
                                label="Date of Birth"
                                type="date"
                                id="date_of_birth"
                                onChange={handleChange}
                                helperText={registerError['date_of_birth']}
                                error={!!registerError['date_of_birth']}
                                inputProps={{ "data-testid": "birthDate" }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                helperText={registerError['password']}
                                error={!!registerError['password']}
                                inputProps={{ "data-testid": "registerPassword" }}
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                name="password_confirmation"
                                label="Password Confirmation"
                                id="password_confirmation"
                                onChange={handleChange}
                                helperText={registerError['password_confirmation']}
                                error={!!registerError['password_confirmation']}
                                inputProps={{ "data-testid": "registerConfirmedPassword" }}
                                autoComplete="password_confirmation"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={disabled}
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                data-testid="signup-btn"
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="reset"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                data-testid="rest-btn"
                            >
                                Reset
                            </Button>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item>
                                Already have an account? Sign in
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default Registration;