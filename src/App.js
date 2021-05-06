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
  const [search, setSearch] = useState('')

  let filtered = contacts.sort((a,b) => {
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
  
  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://phone-book-api.herokuapp.com/api/v1/contacts',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnJ5QGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiMjQ0NTE3MmIwZWYzZmFlOTdiYTM3OGE4ODBjMWQ5YWQiLCJpYXQiOjE2MjAyODM4MTksImV4cCI6MTYyMDM3MDIxOX0.rNBtLizm14DUHZffsO1iyCWyY9rXa1qRuUoO_B9g5Ng',
      },
    };
    axios(config)
    .then(res => setContacts(res.data.data))
    .catch(err => console.log(err))
  })


  return (
    <Container maxWidth='sm'>
      <MenuBar setSearch={setSearch} />
      <ContactList list={filtered} />
    </Container>
  )
}

export default App

