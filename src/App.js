import React, { useState, useEffect } from 'react';
import { 
  Container,
} from '@material-ui/core'

// components
import MenuBar from './components/navigations/MenuBar.components';
import ContactList from './components/views/ContactList.components';
import axios from 'axios';


const App = () => {
  const [contacts, setContacts] = useState([])
  
  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://phone-book-api.herokuapp.com/api/v1/contacts',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnJ5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiZWYyNGM3MjE2YjNmNDcyMjQzNDM3MjUxNjY4YmUyMmIiLCJpYXQiOjE2MjAxOTY2NTksImV4cCI6MTYyMDI4MzA1OX0.o5UZ-BdyrdHU-l5wplFWBlrJnoEFF2QmNdWuHm0l_cw',
      },
    };
    axios(config)
    .then(res => setContacts(res.data.data))
    .catch(err => console.log(err))
  },[])


  return (
    <Container maxWidth='sm'>
      <MenuBar />
      <ContactList list={contacts} />
    </Container>
  )
}

export default App

