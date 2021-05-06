import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'


import PrivateRoute from './components/utils/PrivateRoute.components';
import PublicRoute from './components/utils/PublicRoute.components';


//Components
import Dashboard from './components/views/Dashboard.components';
import Login from './components/views/Login.components';


const App = () => {

  return (
    <Router>
      <Switch>
        <PublicRoute exact path={['/', '/login']}  component={Login} />
        <PrivateRoute path='/dashboard'  component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App