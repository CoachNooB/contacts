import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { 
    Container,
} from '@material-ui/core'

// components
import MenuBar from '../navigations/MenuBar.components';
import ContactList from '../views/ContactList.components';
import axios from 'axios';


const Dashboard = () => {
    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('JWOT')
        const config = {
            method: 'get',
            url: 'https://phone-book-api.herokuapp.com/api/v1/contacts',
            headers: {
                'Authorization': `Bearer ${token}` ,
            },
        };
        
        axios(config)
        .then(res => setContacts(res.data.data))
        .catch(err => console.log(err))
    },[])
    
    const filtered = contacts.sort((a,b) => {
        if(a.name < b.name) {
            return -1
        }
        if(a.name > b.name) {
            return 1
        }
        return 0
    }).filter((data) => {
    return data.name.toLowerCase().includes(search.toLowerCase())
    })
    

    return (
        <Container maxWidth='sm'>
            <MenuBar setSearch={setSearch} />
            <ContactList list={filtered} />
        </Container>
    )
}

export default withRouter(Dashboard)
