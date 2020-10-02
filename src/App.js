import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/pages/landing/Landing";
import Login from "./components/pages/login/Login";
import Signup from "./components/pages/signup/Signup";
import Effects from "./components/pages/effects/Effects";
import AboutUs from "./components/pages/about-us/AboutUs";
import WeatherAlert from "./components/pages/weatherAlert/WeatherAlert";
import { FooterContainer } from "./containers/footer";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Visualize from "./components/pages/visual-insights/visualize";

////password page import
import { useCookies } from "react-cookie";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
var serialize = require('form-serialize');

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
function App() {
  const LandingImage = process.env.PUBLIC_URL + "/landing.jpg";
  const PageWrapper = styled.section`
    height: 100vh;
    background: url(${LandingImage});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
  `;
  const [cookies, setCookie] = useCookies(["name"]);
  const [auth, setAuth] = useState(cookies.auth);

  const handleSubmit = (event) => {
    var form = document.querySelector('#auth-form');
    form = serialize(form, { hash: true });
    const password = form.password
    if (password === "goplantitdev") {
      setCookie("auth", true);
      setAuth(true);
    } else {
      alert("Wrong password");
    }
  };
  // eslint-disable-next-line eqeqeq
 
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/effects" component={Effects} />
            <Route exact path="/alerts" component={WeatherAlert} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/insights" component={Visualize} />
          </Switch>
          <FooterContainer />
        </React.Fragment>
      </Router>
    );
}

export default App;
