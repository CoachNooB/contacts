import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Grid,
    makeStyles,
    Slide,
    TextField,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core'
import { 
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

const EditModal = (props) => {
    const { id, name, setName, phone, setPhone, job, setJob, company, setCompany, email, setEmail, image, setImage} = props
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [snack, setSnack] = React.useState(false)


    const [newName, setNewName] = React.useState(name)
    const [newPhone, setNewPhone] = React.useState(phone)
    const [newJob, setNewJob] = React.useState(job)
    const [newCompany, setNewCompany] = React.useState(company)
    const [newEmail, setNewEmail] = React.useState(email)
    const [newImage, setNewImage] = React.useState(image)
    const [error, setError] = React.useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setNewPhone(e.target.value)
    }
    const handleJobChange = (e) => {
        setNewJob(e.target.value)
    }
    const handleCompanyChange = (e) => {
        setNewCompany(e.target.value)
    }
    const handleEmailChange = (e) => {
        setNewEmail(e.target.value)
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
        setOpen(false);
    };

    const renewDetail = () => {
        setName(newName)
        setPhone(newPhone)
        setJob(newJob)
        setCompany(newCompany)
        setEmail(newEmail)
        setImage(newImage)
    }

    const handleSubmit = () => {
        const token = localStorage.getItem('JWOT')
        const formData = new FormData()
        formData.append('name', newName)
        formData.append('phone', newPhone)
        formData.append('job', newJob)
        formData.append('company', newCompany)
        formData.append('email', newEmail)
        formData.append('image', newImage)

        const config = {
            method: 'put',
            url: `https://phone-book-api.herokuapp.com/api/v1/contacts/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: formData
        }

        axios(config)
        .then(async (res) => {
            await renewDetail()
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
            <Button onClick={handleClickOpen} color="primary">
                Edit
            </Button>
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
                <DialogTitle id="alert-dialog-slide-title">{"Edit Contact"}</DialogTitle>
                <DialogContent className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <FaceRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField error={!name?true:false} required name="name" label="Name" value={newName} onChange={(e) => handleNameChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <PhoneRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField error={!phone?true:false} required name="phone" label="Phone Number" value={newPhone} onChange={(e) => handlePhoneChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <WorkRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField name="job" label="Job" value={newJob} onChange={(e) => handleJobChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <HomeWorkRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField name="company" label="Company" value={newCompany} onChange={(e) => handleCompanyChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <AlternateEmailRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField name="email" label="Email" value={newEmail} onChange={(e) => handleEmailChange(e)} fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.fileInput}>
                        <Grid item xs={2}>
                            <PhotoCameraRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <FileUpload name='image' onFileSelectSuccess={image => setNewImage(image)} onFileSelectError={({error}) => setError(error)} />
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
                autoHideDuration={4000}
            >
                <SnackbarContent message='Contact Edited Succesfully !' style={{ backgroundColor: 'green' }} />
            </Snackbar>
        </>
    )
}

export default withRouter(EditModal)
