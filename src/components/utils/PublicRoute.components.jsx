import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PublicRoute = ({ component: Component, ...rest }) => {
    const isAuth = !!localStorage.getItem('JWOT')
    return <Route {...rest} render={(props) => isAuth ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} /> : <Component {...props} /> } />
}

export default PublicRoute
