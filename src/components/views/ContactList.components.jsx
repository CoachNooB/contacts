import React from 'react';
import {
    List,
    makeStyles,
} from '@material-ui/core'




//contact component
import Contact from './Contact.components'
import AddModal from '../modals/AddModal.components'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const ContactList = (props) => {
    const classes = useStyles()
    const { list } = props
    console.log(list)

    return (
        <List className={classes.root}>
            {list.map((item) => {
                return <Contact key={item.id} id={item.id} name={item.name} number={item.phone} job={item.job} company={item.company} email={item.email} avatar={item.image} />
            })}
            <AddModal />
        </List>
    )
}

export default ContactList
