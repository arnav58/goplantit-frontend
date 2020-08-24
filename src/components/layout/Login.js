import React from "react";
import { Button,TextField } from "@material-ui/core";

import styled from "styled-components";
import login from "./login.jpg";
// import { makeStyles } from '@material-ui/core/styles';

const ComponentWrapper = styled.section`
  width: 100%;
  padding: 0px;
  height: 95vh;
  background-image: url(${login});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  display:flex;
  flex-direction:column;
  align-items: center;
 justify-content:center;
`;

const LoginButton = styled(Button)`
font: Roboto;
display: flex;
width: 400px;
height:55px;
border: 3px solid #17B978;
font-size: 16px;
margin:40px;
`
const Username = styled(TextField)`
font: Roboto;
display: flex;
width: 400px;
height:55px;
color: #000000;
style: normal;
background: #000000;
margin-bottom:40px;
`
const Password = styled(TextField)`
font: Roboto;
display: flex;
width: 400px;
height:55px;
font-size: 18px
margin-buttom:40px;
color: #FFFFFF;
style: normal;
background: #000000;

`



  

const Login = () => {
    // const classes = useStyles();
    return(<ComponentWrapper>


        <Username id="outlined-basic" label="Username" variant="filled" >
        </Username>

        <Password id="outlined-basic" label="Password" variant="filled" type="password"
          autoComplete="current-password"  >
        </Password>
  
        <LoginButton variant="contained" color="primary">
        Login
        </LoginButton>
        </ComponentWrapper>
    );

};


export default Login;