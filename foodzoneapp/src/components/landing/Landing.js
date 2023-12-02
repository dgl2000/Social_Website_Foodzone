import React from "react";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';

function Landing() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={2}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{ fontWeight: 600 }} noWrap>
                        FOOD ZONE &nbsp;
                        <FastfoodTwoToneIcon />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" display="flex" maxWidth="sm">
                <Login />
                <Registration />
            </Container>
        </ThemeProvider>
    );

}


export default Landing;