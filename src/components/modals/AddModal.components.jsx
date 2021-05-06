import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Fab,
    Grid,
    makeStyles,
    Slide,
    TextField,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core'
import { 
    Add, 
    FaceRounded,
    PhoneRounded,
    WorkRounded,
    HomeWorkRounded,
    AlternateEmailRounded,
    PhotoCameraRounded, 
} from '@material-ui/icons'
import FileUpload from '../utils/FileUpload.components';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    fabButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        margin: 'auto auto',
    },
    margin: {
        margin: theme.spacing(1),
    },
    fileInput: {
        marginTop: theme.spacing(2),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    })

const token = localStorage.getItem('JWOT')

const AddModal = (props) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [snack, setSnack] = React.useState(false)


    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [job, setJob] = React.useState('')
    const [company, setCompany] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [image, setImage] = React.useState(null)
    const [error, setError] = React.useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const handleJobChange = (e) => {
        setJob(e.target.value)
    }
    const handleCompanyChange = (e) => {
        setCompany(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const openSnack = () => {
        setSnack(true)
    }

    const closeSnack = () => {
        setSnack(false)
    }
    
    const handleClose = () => {
        setName('')
        setPhone('')
        setJob('')
        setCompany('')
        setEmail('')
        setImage(null)
        setError('')
        document.getElementById('name').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('job').value = ''
        document.getElementById('company').value = ''
        document.getElementById('email').value = ''
        document.getElementById('image').value = ''
        setOpen(false);
    };

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('job', job)
        formData.append('company', company)
        formData.append('email', email)
        formData.append('image', image)

        const config = {
            method: 'post',
            url: 'https://phone-book-api.herokuapp.com/api/v1/contacts',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: formData
        }

        axios(config)
        .then(async(res) => {
            console.log(res.data.message);
            await handleClose()
            await openSnack()
            props.history.push('/')
        })
        .catch(err => {
            setError(err.response.data)
            console.log(error)
        })

    }

    return (
        <>
            <Fab color='secondary' aria-label="add" className={classes.fabButton} onClick={handleClickOpen}>
                <Add />
            </Fab>
            <Dialog
                open={open}
                disableBackdropClick
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='sm'
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add New Contact"}</DialogTitle>
                <DialogContent className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <FaceRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField error={!name?true:false} required id="name" label="Name" onChange={(e) => handleNameChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <PhoneRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField error={!phone?true:false} required id="phone" label="Phone Number" onChange={(e) => handlePhoneChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <WorkRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="job" label="Job" onChange={(e) => handleJobChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <HomeWorkRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="company" label="Company" onChange={(e) => handleCompanyChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <AlternateEmailRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="email" label="Email" onChange={(e) => handleEmailChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.fileInput}>
                        <Grid item xs={2}>
                            <PhotoCameraRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <FileUpload id='image' onFileSelectSuccess={image => setImage(image)} onFileSelectError={({error}) => setError(error)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snack}
                onClose={closeSnack}
                TransitionComponent={Transition}
                anchorOrigin={{vertical:'top', horizontal:'center'}}
                autoHideDuration={2000}
            >
                <SnackbarContent message='New Contact Added Succesfully !' style={{ backgroundColor: 'green' }} />
            </Snackbar>
        </>
    )
}

export default withRouter(AddModal)
