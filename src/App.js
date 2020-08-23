import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'

function App() {
  return (
    <Router>

    <React.Fragment>

    <Navbar/>
    <Switch>
						<Route exact path="/" component={Landing} />
     </Switch>
    </React.Fragment>
    </Router>

  );
}

export default App;
