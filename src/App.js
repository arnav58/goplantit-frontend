import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './Components/layout/Navbar'
import Landing from './Components/pages/Landing'
import Login from './Components/pages/Login'
import Signup from './Components/pages/Signup'

function App() {
  return (
    <Router>

    <React.Fragment>

    <Navbar/>
    <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />	
            
     </Switch>
    </React.Fragment>
    </Router>

  );
}

export default App;
