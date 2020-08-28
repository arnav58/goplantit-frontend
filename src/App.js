import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './Components/layout/Navbar'
import Landing from './Components/pages/landing/Landing'
import Login from './Components/pages/login/Login'
import Effects from './Components/pages/effects/Effects'
import WeatherAlert from './Components/pages/weatherAlert/WeatherAlert';
import {FooterContainer} from './containers/footer'

function App() {
  return (
    <Router>

    <React.Fragment>

    <Navbar/>
    <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />	
            <Route exact path="/effects" component={Effects} />	
            <Route exact path="/alerts" component={WeatherAlert} />	
            
     </Switch>
     <FooterContainer />
    </React.Fragment>
    </Router>

  );
}

export default App;
