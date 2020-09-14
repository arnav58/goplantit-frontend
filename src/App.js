import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/pages/landing/Landing'
import Login from './components/pages/login/Login'
import Signup from './components/pages/signup/Signup'
import Effects from './components/pages/effects/Effects'
import AboutUs from './components/pages/about-us/AboutUs'
import WeatherAlert from './components/pages/weatherAlert/WeatherAlert';
import {FooterContainer} from './containers/footer'
import Dashboard from './components/pages/dashboard/Dashboard';

function App() {
  return (
    <Router>

    <React.Fragment>

    <Navbar/>
    <Switch>
            <Route exact path="/signup" component={Signup} />	
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />	
            <Route exact path="/effects" component={Effects} />	
            <Route exact path="/alerts" component={WeatherAlert} />	
            <Route exact path="/about-us" component={AboutUs} />	
            <Route exact path="/dashboard" component={Dashboard} />	
            
     </Switch>
     <FooterContainer />
    </React.Fragment>
    </Router>

  );
}

export default App;
