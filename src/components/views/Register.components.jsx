import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Typography,
    TextField,
    DialogActions,
    Slide,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core';
import {
    ListAltRounded,
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
        margin: theme.spacing(3, 5, 2),
    },
    cancel: {
        textDecoration: 'none',
        color: 'white'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

const Register = (props) => {
    const classes = useStyles();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [error, setError] = useState('')
    const [snack, setSnack] = useState(false)

    const handleNameChange = (event) => {
        setNameField(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmailField(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordField(event.target.value);
    }

    const handleRegister = () => {
        const data = {
            'name': nameField,
            'email': emailField,
            'password': passwordField,
            'confirmPassword': passwordField,
        }

        const config = {
            method: 'post',
            url: 'https://phone-book-api.herokuapp.com/api/v1/signup',
            data: data,
        }

        axios(config)
        .then(async (res) => {
            await console.log(res.data.data.message)
            await props.history.push('/')
        })
        .catch(async (err) => {
            await setError(err.response.data.data)
            await setSnack(true)
        })

    }

    const closeSnack = () => {
        setSnack(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ListAltRounded />
                </Avatar>
                <Typography component="h1" variant="h5">
                Register
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    onChange={(event) => handleNameChange(event)}
                />
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
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        <Link to='/' className={classes.cancel}>Cancel</Link>
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </DialogActions>
            </div>
            <Snackbar
                open={snack}
                onClose={closeSnack}
                TransitionComponent={Transition}
                anchorOrigin={{vertical:'top', horizontal:'center'}}
                autoHideDuration={2000}
            >
                <SnackbarContent message={error} style={{ backgroundColor: '#d9534f' }} />
            </Snackbar>
        </Container>
    )
}

export default withRouter(Register)
