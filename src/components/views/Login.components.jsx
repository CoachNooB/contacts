import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Typography,
    TextField,
} from '@material-ui/core';
import {
    AccountBox,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
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
    signUp: {
        textDecoration: 'none',
        color: theme.palette.secondary.dark,
    }
}));

const Login = (props) => {
    const classes = useStyles();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleEmailChange = (event) => {
        setEmailField(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordField(event.target.value);
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
            localStorage.setItem('JWOT', res.data.data.token)
            setLoading(true)
            setTimeout(() => {
                props.history.push('/')
            },2000)
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
                    disabled={loading?true:false}
                    type='submit'
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <Typography>
                    Do not have account? <Link to='/register' className={classes.signUp}>Sign up</Link>
                </Typography>
            </div>
        </Container>
    )
}

export default withRouter(Login)
