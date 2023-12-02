import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';

import {
    CardHeader,
} from "@material-ui/core";

function User() {
    const [userName, setUserName] = useState("");
    const [status, setStatus] = useState("");
    const [inputStatus, setInputStatus] = useState("");
    const [avatar, setAvatar] = useState("");

    // Get localstorage for refeshing the page
    const getDB = function () {

        fetch('https://foodzone-gd25.herokuapp.com/headline', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
            .then(res => {
                if (res.status === 401) {
                    return null
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    setUserName(data.username);
                    setStatus(data.headline);
                }

                fetch('https://foodzone-gd25.herokuapp.com/avatar', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
                    .then(res => {
                        if (res.status === 401) {
                            return null
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        if (data) {
                            setAvatar(data.avatar);
                        }
                    })

            })
    }

    const navigate = useNavigate();

    // Clear the localStorage while clicking logout
    const handleLogOut = () => {
        fetch('https://foodzone-gd25.herokuapp.com/logout', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    navigate('/');
                }
            })
    }

    const handleProfile = () => {
        navigate('/profile');
    }
    useEffect(() => {
        getDB();
    }, []);

    const handleStatus = (event) => {
        setInputStatus(event.target.value);
    }

    const handleSubmit = () => {
        if (inputStatus !== "") {
            let bodyContent = { headline: inputStatus };
            fetch('https://foodzone-gd25.herokuapp.com/headline', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(bodyContent)
            })
                .then(res => {
                    if (res.status !== 401) {
                        setStatus(inputStatus);
                        setInputStatus('');
                    }
                })
        }
    }

    return (
        <Card>
            <CardHeader
                data-testid="userCard"
                avatar={<Avatar sx={{ bgcolor: purple[500] }} src={avatar}></Avatar>}
                title={/^\d+$/.test(userName[0]) ? userName.substring(21) : userName}
                subheader={status}
            />
            <Stack direction="row" spacing={2} justifyContent="center"
                alignItems="center">
                <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    onClick={handleProfile}
                >
                    <PersonOutlineTwoToneIcon fontSize="small" />
                    Profile
                </Button>
                <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    onClick={handleLogOut}
                    data-testid="logout-btn"
                >
                    <ExitToAppTwoToneIcon fontSize="small" />
                    Log out
                </Button>
            </Stack>
            <CardContent align="center">
                <TextField
                    size="small"
                    variant="outlined"
                    name="status"
                    label="New Status"
                    type="text"
                    id="status"
                    onChange={handleStatus}
                    value={inputStatus}
                    autoComplete="status"
                    inputProps={{ "data-testid": "headline" }}
                />
                <br />
                <CardActions>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="primary"
                        onClick={handleSubmit}
                        data-testid="update-btn"
                    >
                        Update
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default User;