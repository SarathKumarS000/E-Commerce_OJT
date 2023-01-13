import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, AppBar, CssBaseline, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react'
import image from '../assets/images/profile.jpg'
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import Link from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Box from '@mui/material/Box';
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'


const clientId = "851258272384-o3l3ohnhnobhs9321kjv36sidhuoqmqi.apps.googleusercontent.com"
const Navbar = () => {
    const [name, setName] = useState(null)
    const [img, setImg] = useState(image)
    const [loggin, setLoggin] = useState(false)
    const [loggout, setLoggout] = useState(false)
    const [token, setToken] = useState(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    });

    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '2rem',
        height: '2rem',
    };

    const onSuccess = (res: any) => {
        setAnchorEl(null)
        setToken(res.tokenId)
        axios.get('http://localhost:8080/users')
            .then(response => {
                const usersList = [...response.data._embedded.users]
                let count = 0;
                for (const key in usersList) {
                    if (usersList[key].email == res.profileObj.email) {
                        count = 1;
                        setName(usersList[key].username);
                        setImg(usersList[key].profileurl);
                    }
                }
                if (count === 0) {
                    axios.post('http://localhost:8080/tokenrequest', {
                        usertoken: token
                    })
                        .then(response => {
                            setName(response.data.name);
                            setImg(response.data.picture);
                        })
                }
            })
    }

    const onFailure = (res: any) => {
        console.log("Login Failed !", res);
    }

    const onLogout = () => {
        setAnchorEl(null)
        setName(null);
        setImg(image);
        setToken(null)
        console.log("Logout Successfully");
        sessionStorage.clear();
        localStorage.clear();
    }

    return (
        <Fragment>
            <CssBaseline />
            <AppBar position='relative'>
                <Toolbar>
                    <AddShoppingCartIcon />
                    <Typography variant='h6'>
                        Ecommerce
                    </Typography>
                    <Grid container justifyContent="flex-end">
                        <Typography variant='h6' marginTop='15px'>
                            Hi, {name}
                        </Typography>
                        <Button color='inherit' id='resource-menu' onClick={handleClick} aria-controls={open ? 'resource-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}>
                            <Box component="img" sx={{ ...commonStyles, borderRadius: '50%' }} src={img} />
                        </Button>
                    </Grid>
                    <Dialog
                        open={loggin}
                        onClose={() => setLoggin(false)}
                        aria-labelledby='dialog-title'
                        aria-describedby='dialog-description'
                    >
                        <DialogContent>
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="SignIn With Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true} />
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={loggout}
                        onClose={() => setLoggout(false)}
                        aria-labelledby='dialog-title'
                        aria-describedby='dialog-description'
                    >
                        <DialogContent>
                            <DialogContentText>
                                Are you Sure to Logout?
                            </DialogContentText>
                            <GoogleLogout
                                clientId={clientId}
                                buttonText={"Logout"}
                                onLogoutSuccess={onLogout}
                            ></GoogleLogout>
                        </DialogContent>
                    </Dialog>
                    <Menu id='resource-menu' anchorEl={anchorEl} open={open} MenuListProps={{ 'aria-labelledby': 'resource-button', }} onClose={handleClose} PaperProps={{ sx: { width: '150px' } }}>
                        <MenuItem onClick={handleClose}>My Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Wishlist</MenuItem>
                        <MenuItem onClick={handleClose}>Cart</MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        {token ? <MenuItem onClick={() => setLoggout(true)}>Logout</MenuItem> :
                            <MenuItem onClick={() => setLoggin(true)}>Login</MenuItem>}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Navbar;
