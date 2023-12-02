import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Follow from "./follow/Follow";
import User from "./user/User";
import Box from '@material-ui/core/Box';
import Posts from "./posts/Posts";

function Main() {
    const theme = createTheme();

    const [followList, setFollowList] = useState({
        follow: "",
        followStatus: "",
        followAvatar: "",
    });

    const [mobileOpen, setMobileOpen] = useState(false);
    const drawerWidth = 300;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getDB = function () {
        let resList = {
            follow: [],
            followStatus: [],
            followAvatar: []
        }
        fetch('https://foodzone-gd25.herokuapp.com/following', {
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
                    resList.follow = data.following;
                }
                fetch('https://foodzone-gd25.herokuapp.com/followerHeadline', {
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
                            resList.followStatus = data.headline;

                            fetch('https://foodzone-gd25.herokuapp.com/followerAvatar', {
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
                                        resList.followAvatar = data.avatar;
                                        setFollowList(resList);
                                    }
                                })
                        }
                    })
            })
    }

    useEffect(() => {
        getDB();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    elevation={2}
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}

                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{ fontWeight: 600 }} noWrap component="div">
                            FOOD ZONE &nbsp;
                            <FastfoodTwoToneIcon />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={document.body}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <User />
                            <Follow />
                        </Box>
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                        open
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <User />
                            <Follow
                                followList={followList}
                                setFollowList={fl => { setFollowList(fl) }} />
                        </Box>
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <Posts
                            followList={followList}
                            setFollowList={fl => { setFollowList(fl) }}
                        />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}


export default Main;