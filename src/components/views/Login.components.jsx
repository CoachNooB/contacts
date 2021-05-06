import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Backdrop,
    CircularProgress,
    Container,
    CssBaseline,
    Typography,
    TextField,
} from '@material-ui/core';
import {
    AccountBox,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    }));

const Login = (props) => {
    const classes = useStyles();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleEmailChange = (event) => {
        setEmailField(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordField(event.target.value);
    }

    const handleClose = () => {
        setLoading(false)
    }

    const handleLogin = () => {
        const data = {
            'email': emailField,
            'password': passwordField,
        }

        const config = {
            method: 'post',
            url: 'https://phone-book-api.herokuapp.com/api/v1/signin',
            data: data,
        }

        axios(config)
        .then(async (res) => {
            setLoading(true)
            await localStorage.setItem('JWOT', res.data.data.token)
            props.history.push('/dashboard')
        })
        .catch((err) => {
            setError(err)
            console.log(error)
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <AccountBox />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    onChange={(event) => handleEmailChange(event)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => handlePasswordChange(event)}
                />
                <Button
                    fullWidth
                    type='submit'
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
            </div>
            <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default withRouter(Login)
