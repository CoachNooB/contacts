import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    makeStyles,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Slide,
    Dialog,
    DialogActions,
    Button,
    DialogTitle,
    DialogContent,
    ListItemIcon,
    DialogContentText,
} from '@material-ui/core'
import {
    FaceRounded,
    PhoneRounded,
    WorkRounded,
    HomeWorkRounded,
    AlternateEmailRounded,
    PhotoCameraRounded, 
} from '@material-ui/icons'
import axios from 'axios';
import EditModal from '../modals/EditModal.components';


const useStyles = makeStyles((theme) => ({
    avatar: {
        marginRight: 40,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

const Contact = (props) => {
    const classes = useStyles()
    const { id, name, phone, job, company, email, avatar } = props
    
    //eslint-disable-next-line
    const [contactId, setContactId] = React.useState(id)
    const [contactName, setContactName] = React.useState(name)
    const [contactPhone, setContactPhone] = React.useState(phone)
    const [contactJob, setContactJob] = React.useState(job)
    const [contactCompany, setContactCompany] = React.useState(company)
    const [contactEmail, setContactEmail] = React.useState(email)
    const [contactImage, setContactImage] = React.useState(avatar)
    
    const [open, setOpen] = React.useState(false)
    const [delDialog, setDelDialog] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const confirmDelete = () => {
        setDelDialog(true)
    }
    
    const handleClose = () => {
        setOpen(false);
    };

    const delDialogClose = () => {
        setDelDialog(false)
    }

    const handleDelete = () => {
        const token = localStorage.getItem('JWOT')
        const formData = new FormData();
        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('job', job)
        formData.append('company', company)
        formData.append('email', email)
        formData.append('image', avatar)

        const config = {
            method: 'delete',
            url: `https://phone-book-api.herokuapp.com/api/v1/contacts/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: formData
        }

        axios(config)
        .then((res) => {
            console.log(res)
            delDialogClose()
            handleClose()
            props.history.push('/')
        })
        .catch(err => console.log(err))

    }

    return (
        <>
            <ListItem button onClick={handleClickOpen}>
                <ListItemAvatar className={classes.avatar}>
                    <Avatar alt={name} src={avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={phone}
                />
            </ListItem>
            {/* Detail Contact Dialog */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='sm'
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Detail Contact"}</DialogTitle>
                <DialogContent className={classes.margin}>
                    <ListItem>
                        <ListItemIcon>
                            <FaceRounded />
                        </ListItemIcon>
                        <ListItemText primary={contactName} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneRounded />
                        </ListItemIcon>
                        <ListItemText primary={contactPhone} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <WorkRounded />
                        </ListItemIcon>
                        <ListItemText primary={contactJob} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <HomeWorkRounded />
                        </ListItemIcon>
                        <ListItemText primary={contactCompany} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AlternateEmailRounded />
                        </ListItemIcon>
                        <ListItemText primary={contactEmail} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhotoCameraRounded />
                        </ListItemIcon>
                        <ListItemText primary={contactImage} />
                    </ListItem>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmDelete} color='secondary'>
                        Delete
                    </Button>
                    <EditModal 
                        id={contactId}
                        name={contactName}
                        setName={setContactName}
                        phone={contactPhone}
                        setPhone={setContactPhone}
                        job={contactJob}
                        setJob={setContactJob}
                        company={contactCompany}
                        setCompany={setContactCompany} 
                        email={contactEmail}
                        setEmail={setContactEmail}
                        image={contactImage}
                        setImage={setContactImage}
                        />
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Confirm Delete Dialog */}
            <Dialog
                open={delDialog}
                disableBackdropClick
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>{'Delete Contact ?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure want to delete this contact? this action will permanently delete contact from your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color='secondary'>
                        Yes, Delete Contact !
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default withRouter(Contact)
