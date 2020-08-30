import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/pages/landing/Landing'
import Login from './components/pages/login/Login'
import Effects from './components/pages/effects/Effects'
import WeatherAlert from './components/pages/weatherAlert/WeatherAlert';
import {FooterContainer} from './containers/footer'
import Aboutus from './components/pages/aboutus/aboutus';

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
            <Route exact path="/aboutus" component={Aboutus} />		
            
     </Switch>
     <FooterContainer />
    </React.Fragment>
    </Router>

  );
}

export default App;
