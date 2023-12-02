/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import Typography from '@material-ui/core/Typography';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@mui/material/Paper';
import { blueGrey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone';
import GroupRemoveTwoToneIcon from '@mui/icons-material/GroupRemoveTwoTone';

function Profile() {
    const theme = createTheme();
    const firstRender = useRef(true);
    const [disabled, setDisabled] = useState(true);
    const [newAvatarImage, setNewAvatarImage] = useState("");

    // State to store the current profile
    const [curProfile, setCurProfile] = useState({
        userName: "",
        email: "goodScore@pls.com",
        zipcode: "77005",
        phone: "346-542-2386",
        avatar: "",
        password: "*******"
    })

    // State to store the current user input update value
    const [updateVal, setUpdateVal] = useState({
        email_address: "",
        phone_number: "",
        zipcode: "",
        avatar: "",
        password: "",
    });


    // State to store the profile form error
    const [profileUpdateError, setProfileUpdateError] = useState({
        email_address: "",
        phone_number: "",
        zipcode: "",
        password: "",
    })

    // Function to handle the form submission, set the current profile state
    const handleSubmit = (event) => {
        // Apply prevetnDefault to prevent the auto page refresh
        event.preventDefault();

        if (updateVal['email_address'] !== "") {
            let bodyContent = { email: updateVal['email_address'] }
            fetch('https://foodzone-gd25.herokuapp.com/email', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyContent),
                credentials: 'include'
            })
                .then(res => {
                    if (res.status === 401) {
                        return null;
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data) {
                        setCurProfile(curProfile => ({ ...curProfile, 'email': data.email }));
                    }
                })
        }
        if (updateVal['zipcode'] !== "") {
            let bodyContent = { zipcode: updateVal['zipcode'] }
            fetch('https://foodzone-gd25.herokuapp.com/zipcode', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyContent),
                credentials: 'include'
            })
                .then(res => {
                    if (res.status === 401) {
                        return null;
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data) {
                        setCurProfile(curProfile => ({ ...curProfile, 'zipcode': data.zipcode }));
                    }
                })
        }
        if (updateVal['phone_number'] !== "") {
            setCurProfile(curProfile => ({ ...curProfile, 'phone': updateVal['phone_number'] }));
        }

        if (updateVal['password'] !== "") {
            let bodyContent = { password: updateVal['password'] }
            fetch('https://foodzone-gd25.herokuapp.com/password', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyContent),
                credentials: 'include'
            })
                .then(res => {
                    if (res.status === 401) {
                        return null;
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data) {
                        // Generate random number of stars for the password update
                        let randomNum = Math.floor(Math.random() * (10 - 5) + 5);
                        let passwordRes = Array(randomNum).fill('*');
                        var passwordStar = passwordRes.toString().replaceAll(',', '');
                        setCurProfile(curProfile => ({ ...curProfile, 'password': passwordStar }));
                    }
                })
        }
    }

    const handleChange = (event) => {
        setUpdateVal({ ...updateVal, [event.target.name]: event.target.value });
    };

    const handleUploadImage = (event) => {
        setNewAvatarImage(event.target.files[0]);
        if (event.target.files[0]) {
            const fd = new FormData();
            fd.append('image', event.target.files[0]);
            fetch('https://foodzone-gd25.herokuapp.com/avatar', {
                method: 'PUT',
                credentials: 'include',
                body: fd
            })
                .then((res) => res.json())
                .then(
                    (data) => {
                        setCurProfile(curProfile => ({ ...curProfile, 'avatar': data.avatar }));
                    }
                )
        }

    }

    useEffect(() => {

        if (firstRender.current) {
            firstRender.current = false
            return
        }

        const formValidation = () => {
            let isValid = true;
            if (updateVal['account_name'] !== "") {
                let re = new RegExp("^[a-zA-Z]{1}[a-zA-Z0-9]*$");
                if (!re.test(updateVal['account_name'])) {
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'account_name': "Username contains only letters and may not start with digit." }));
                    isValid = false;
                } else {
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'account_name': null }));
                }
            } else {
                setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'account_name': null }));
            }

            if (updateVal['email_address'] !== "") {
                let re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
                if (!re.test(updateVal['email_address'])) {
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'email_address': "Invalid email address (Contains '@' and the suffix)!" }));
                    isValid = false;
                } else {
                    // Show the error prompt
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'email_address': null }));
                }
            } else {
                setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'email_address': null }));
            }

            if (updateVal['phone_number'] !== "") {
                let re = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
                if (!re.test(updateVal['phone_number'])) {
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'phone_number': "Invalid phone number (format xxx-xxx-xxxx)!" }));
                    isValid = false;
                } else {
                    // Show the error prompt
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'phone_number': null }));
                }
            } else {
                setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'phone_number': null }));
            }

            if (updateVal['zipcode'] !== "") {
                let re = new RegExp("^[0-9]{5}$");
                if (!re.test(updateVal['zipcode'])) {
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'zipcode': "Invalid zipcode (5 digits only)!" }));
                    isValid = false;
                } else {
                    // Show the error prompt
                    setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'zipcode': null }));
                }
            } else {
                setProfileUpdateError(profileUpdateError => ({ ...profileUpdateError, 'zipcode': null }));
            }

            if (isValid) {
                return true;
            } else {
                return false;
            }
        }
        setDisabled(!formValidation());

    }, [updateVal]);

    const navigate = useNavigate();


    const handleMain = () => {
        navigate('/main');
    }

    useEffect(() => {
        fetch('https://foodzone-gd25.herokuapp.com/email', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
            .then(res => {
                if (res.status === 401) {
                    return null;
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    setCurProfile(curProfile => ({ ...curProfile, 'email': data.email }));
                    setCurProfile(curProfile => ({ ...curProfile, 'userName': data.username }));
                    fetch('https://foodzone-gd25.herokuapp.com/zipcode', {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: 'include'
                    })
                        .then(res => {
                            if (res.status === 401) {
                                return null;
                            } else {
                                return res.json();
                            }
                        })
                        .then(data => {
                            if (data) {
                                setCurProfile(curProfile => ({ ...curProfile, 'zipcode': data.zipcode }));
                                fetch('https://foodzone-gd25.herokuapp.com/avatar', {
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    credentials: 'include'
                                })
                                    .then(res => {
                                        if (res.status === 401) {
                                            return null;
                                        } else {
                                            return res.json();
                                        }
                                    })
                                    .then(data => {
                                        if (data) {
                                            setCurProfile(curProfile => ({ ...curProfile, 'avatar': data.avatar }));
                                        }
                                    })
                            }
                        })
                }
            })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid component="main" sx={{ display: 'flex' }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{ fontWeight: 600 }} noWrap component="div">
                        FOOD ZONE &nbsp;
                        <FastfoodTwoToneIcon />
                    </Typography>
                </Toolbar>
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item xs={4}>
                        <Paper variant="elevation" elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} align="center">
                            <Typography component="h1" variant="h5">
                                Current Profile
                            </Typography>
                            <br />
                            <Grid container direction={'column'} spacing={2}>
                                <Grid item xs={12}>
                                    <Avatar sx={{ bgcolor: blueGrey[500], width: 80, height: 80 }} src={curProfile['avatar']}
                                        alt="Profile"
                                    />
                                    <br />
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        component="label"
                                    // onClick={updateAvatar}
                                    >
                                        <input
                                            accept="image/*"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleUploadImage}
                                        />
                                        <AddPhotoAlternateIcon fontSize="small" />
                                        Change Avatar
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        component="label"
                                    >
                                        <SupervisorAccountTwoToneIcon fontSize="small" />
                                        Link Account
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        component="label"
                                    >
                                        <GroupRemoveTwoToneIcon fontSize="small" />
                                        Unlink Account
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" style={{ fontStyle: 'italic', fontFamily: 'Monospace' }} data-testid="profileUsername">
                                        {/^\d+$/.test(curProfile['userName']) ? curProfile['userName'].substring(21) : curProfile['userName']}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" style={{ fontStyle: 'italic', fontFamily: 'Monospace' }} data-testid="profileEmail">
                                        {curProfile['email']}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" style={{ fontStyle: 'italic', fontFamily: 'Monospace' }} data-testid="profileZipcode">
                                        {curProfile['zipcode']}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" style={{ fontStyle: 'italic', fontFamily: 'Monospace' }} data-testid="profilePhone">
                                        {curProfile['phone']}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" style={{ fontStyle: 'italic', fontFamily: 'Monospace' }} data-testid="profilePassword">
                                        {curProfile['password']}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        size="medium"
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2 }}
                                        color="primary"
                                        onClick={handleMain}
                                        data-testid="tomain-btn"
                                    >
                                        <DashboardCustomizeTwoToneIcon fontSize="small" />
                                        Main
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                    <Grid item xs={4}>
                        <Paper variant="elevation" elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} align="center">
                            <Typography component="h1" variant="h5">
                                Update Profile
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} >
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <TextField
                                            disabled
                                            name="account_name"
                                            fullWidth
                                            id="filled-disabled"
                                            label="Username"
                                            value={curProfile['userName']}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="email_address"
                                            label="Email Address"
                                            name="email_address"
                                            type="email"
                                            onChange={handleChange}
                                            helperText={profileUpdateError['email_address']}
                                            error={!!profileUpdateError['email_address']}
                                            inputProps={{ "data-testid": "inputProfileEmailAddress" }}
                                            autoComplete="email_address"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="phone_number"
                                            label="Phone Number"
                                            type="tel"
                                            id="phone_number"
                                            onChange={handleChange}
                                            helperText={profileUpdateError['phone_number']}
                                            error={!!profileUpdateError['phone_number']}
                                            inputProps={{ "data-testid": "inputProfilePhoneNumber" }}
                                            autoComplete="phone_number"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="zipcode"
                                            label="Zipcode"
                                            type="zipcode"
                                            id="zipcode"
                                            onChange={handleChange}
                                            helperText={profileUpdateError['zipcode']}
                                            error={!!profileUpdateError['zipcode']}
                                            inputProps={{ "data-testid": "inputProfileZipcode" }}
                                            autoComplete="zipcode"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            onChange={handleChange}
                                            helperText={profileUpdateError['password']}
                                            error={!!profileUpdateError['password']}
                                            inputProps={{ "data-testid": "inputProfilePassword" }}
                                            autoComplete="password"
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
                                            data-testid="update-btn"
                                        >
                                            Update
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}


export default Profile;