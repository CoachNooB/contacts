import React from 'react'
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

const useStyles = makeStyles((theme) => ({
    fabButton: {
        position: 'absolute',
        zIndex: 100,
        bottom: 15,
        right: 20,
        margin: 'auto auto',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    })

const AddModal = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Fab color='secondary' aria-label="add" className={classes.fabButton} onClick={handleClickOpen}>
                <Add />
            </Fab>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
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
                            <TextField id="name" label="Name" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <PhoneRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="phone" label="Phone Number" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <WorkRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="job" label="Job" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <HomeWorkRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="company" label="Company" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <AlternateEmailRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="email" label="Email" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={2}>
                            <PhotoCameraRounded />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type='file' id="image" label="Image" fullWidth/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddModal
