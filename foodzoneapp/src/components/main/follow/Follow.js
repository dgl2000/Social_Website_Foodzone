/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { blueGrey } from '@mui/material/colors';
import { CardMedia } from "@material-ui/core";

function Follow(props) {

    const [followList, setFollowList] = useState([]);
    const [followStatusList, setFollowStatusList] = useState([]);
    const [followRenderList, setFollowRenderList] = useState([]);
    const [newFollow, setNewFollow] = useState("");
    const [newFollowerError, setNewFollowerError] = useState("");
    const [followAvatarList, setFollowAvatarList] = useState([]);

    const getLocalStorage = function () {
        if (props.followList) {
            setFollowList(props.followList['follow']);
            setFollowStatusList(props.followList['followStatus']);
            setFollowAvatarList(props.followList['followAvatar']);
        }
    }

    useEffect(() => {
        getLocalStorage();
    }, [props.followList]);

    useEffect(() => {
        renderFollow();
    }, [followList]);

    const handleNewFollow = (event) => {
        setNewFollow(event.target.value);
        if (event.target.value !== "") {
            setNewFollowerError(null);
        }
    }

    const handleAddSubmit = () => {
        if (newFollow !== "" && !followList.includes(newFollow)) {
            fetch('https://foodzone-gd25.herokuapp.com/username/' + newFollow, {
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
                        if (data.isExist) {
                            fetch('https://foodzone-gd25.herokuapp.com/username', {
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
                                        if (data.username !== newFollow) {
                                            followList.push(newFollow);
                                            fetch('https://foodzone-gd25.herokuapp.com/headline/' + newFollow, {
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
                                                        followStatusList.push(data.headline);
                                                        fetch('https://foodzone-gd25.herokuapp.com/avatar/' + newFollow, {
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
                                                                    followAvatarList.push(data.avatar);
                                                                    fetch('https://foodzone-gd25.herokuapp.com/following/' + newFollow, {
                                                                        method: 'PUT',
                                                                        headers: {
                                                                            "Content-Type": "application/json"
                                                                        },

                                                                        credentials: 'include'
                                                                    }).then(res => {
                                                                        if (res.status === 401) {
                                                                            return null
                                                                        } else {
                                                                            return res.json();
                                                                        }
                                                                    }).then((data) => {
                                                                        renderFollow();
                                                                        setNewFollow('');
                                                                        props.setFollowList({
                                                                            follow: followList,
                                                                            followStatus: followStatusList,
                                                                            followAvatar: followAvatarList
                                                                        });
                                                                        setNewFollowerError("");
                                                                    })

                                                                }

                                                            })

                                                    }

                                                })
                                        } else {
                                            setNewFollowerError("Invalid Follower!");
                                        }
                                    }
                                })
                        } else {
                            setNewFollowerError("Invalid Follower!");
                        }
                    }
                })
        } else {
            setNewFollowerError("Invalid Follower!");
        }
        setNewFollow("");
    }


    // Delete the specific following user while clicking the unfollow button, reset the localstorage for the update
    const handleUnfollow = (event) => {
        let idx = event.currentTarget.id;
        const url = 'https://foodzone-gd25.herokuapp.com/following/' + followList[idx];
        fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }).then(res => {
            if (res.status === 401) {
                return null
            } else {
                return res.json();
            }
        }).then((data) => {
            followList.splice(idx, 1);
            followStatusList.splice(idx, 1);
            followAvatarList.splice(idx, 1);
            props.setFollowList({
                follow: followList,
                followStatus: followStatusList,
                followAvatar: followAvatarList
            });
            renderFollow();
        })

    }
    const renderFollow = () => {
        var renderArr = [];
        for (let i = 0; i < followList.length; i++) {
            renderArr.push(
                <Card key={i}>
                    <CardMedia align="center">
                        <Avatar sx={{ bgcolor: blueGrey[500] }} src={followAvatarList[i]}
                            alt="Profile"
                        />
                    </CardMedia>
                    <CardContent align="center">
                        <Typography
                            color="textSecondary"
                            variant="h6"
                            align="center"
                        >
                            {followList[i]}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="subtitle1"
                            align="center"
                        >
                            <LocationOnIcon fontSize="small" />
                        </Typography>{followStatusList[i]}

                        <CardActions>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                id={i}
                                onClick={handleUnfollow}
                                data-testid={"unfollow-btn-" + i}
                            >
                                Unfollow
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            );
        }
        setFollowRenderList(renderArr);

    }

    return (
        <>
            {followRenderList.map((value, idx) => { return value })}
            <Card>
                <CardContent align="center">
                    <TextField
                        size="small"
                        variant="outlined"
                        name="newFollow"
                        label="New Follower"
                        type="text"
                        id="newFollow"
                        value={newFollow}
                        onChange={handleNewFollow}
                        autoComplete="status"
                        inputProps={{ "data-testid": "newFollow" }}
                        helperText={newFollowerError}
                        error={!!newFollowerError}
                    />
                    <br />
                    <CardActions>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onClick={handleAddSubmit}
                            data-testid="addFollow-btn"
                        >
                            Add
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </>

    );
}

export default Follow;