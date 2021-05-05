import React from 'react'
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
} from '@material-ui/core'
import {
    FaceRounded,
    PhoneRounded,
    WorkRounded,
    HomeWorkRounded,
    AlternateEmailRounded,
    PhotoCameraRounded, 
} from '@material-ui/icons'


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
    // eslint-disable-next-line
    const { id, name, number, job, company, email, avatar } = props
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ListItem button onClick={handleClickOpen}>
                <ListItemAvatar className={classes.avatar}>
                    <Avatar alt={name} src={avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={number}
                />
            </ListItem>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
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
                        <ListItemText primary={name} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneRounded />
                        </ListItemIcon>
                        <ListItemText primary={number} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <WorkRounded />
                        </ListItemIcon>
                        <ListItemText primary={job} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <HomeWorkRounded />
                        </ListItemIcon>
                        <ListItemText primary={company} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AlternateEmailRounded />
                        </ListItemIcon>
                        <ListItemText primary={email} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhotoCameraRounded />
                        </ListItemIcon>
                        <ListItemText primary={avatar} />
                    </ListItem>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Edit
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Contact
