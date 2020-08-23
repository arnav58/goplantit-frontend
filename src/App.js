import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/layout/Login'
import Signup from './components/layout/Signup'

function App() {
  return (
    <Router>

    <React.Fragment>

    <Navbar/>
    <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Login" component={Login} />	
            
     </Switch>
    </React.Fragment>
    </Router>

  );
}

export default App;
