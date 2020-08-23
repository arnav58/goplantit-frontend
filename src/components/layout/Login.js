import React from "react";
import { Button,TextField } from "@material-ui/core";

import styled from "styled-components";
import login from "./login.jpg";
import { makeStyles } from '@material-ui/core/styles';

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
color: black;
border: 3px solid #17B978;
font-size: 18px
margin-buttom:10px;
`



const useStyles = makeStyles((theme) => ({
  
    username: {
      display: "flex",
      color: "#FFFFFF",
      font: "Roboto",
      style: "normal",
      background: "#000000",
      width: "400px",
      

  
    },
    password: {
        display: "flex",
        color: "#FFFFFF",
        font: "Roboto",
        style: "normal",
        background: "#000000",
        width: "400px",
        margin: "40px",
    
      },
    
  }));

const Login = () => {
    const classes = useStyles();
    return(<ComponentWrapper>

        <form className={classes.username} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Username" variant="filled">
        </TextField>
        </form>
        <form className={classes.password} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Password" variant="filled" type="password"
          autoComplete="current-password"  defaultValue="Password">
        </TextField>
  
        </form>
        <LoginButton variant="contained" color="primary">
        Login
        </LoginButton>
        </ComponentWrapper>
    );

};


export default Login;