import React from "react";
import styled from "styled-components";
import { Typography, Button, TextField } from "@material-ui/core";
import signup from "./john-foust-HkJ1AOnJF8Q-unsplash.jpg";

const ComponentWrapper = styled.section`
//background-color: #46B763;
width: 100%;
  padding: 0px;
  height: 95vh;
  background-image: url(${signup});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  
display:flex;
  flex-direction:column;
  align-items: center;
 justify-content:center;
`
const Title = styled(Typography)`
display:flex;
font-style: normal;
font-weight: 500;
color:#FFFFFF;
margin-bottom:30px;
text-align:center;
`
const Username = styled(TextField)`
display: flex;
color: #FFFFFF;
font: Roboto;
style: normal;
width: 600px;

`
const Email = styled(TextField)`
display: flex;
color: #FFFFFF;
font: Roboto;
style: normal;
width: 600px;
margin: 30px
`
const TextRow = styled.div`
display:flex;
width:600px;
justify-content:space-between;
`
const Password = styled(TextField)`
width: 295px;
height:54px;
color: white;
`
const ButtonRow = styled.div`
display:flex;
width:500px;
justify-content:space-between;
margin: 40px;
`

const ConfirmButton = styled(Button)`
width: 200px;
height:54px;
color: white;
border: 3px solid #17B978;
`

const Signup = () => {
    return (<ComponentWrapper>
    <Title variant ="h5">
        Create New Account
    </Title>
    <Username id="username" label="Username" variant="filled">
    </Username>
    <Email id="email" label="Enter Email" variant="filled">
    </Email>
    <TextRow>
        <Password id="password1" label="Password" variant="filled" type="password"
          autoComplete="current-password"  >
        </Password>
        <Password id="password2" label="Repeat Password" variant="filled" type="password"
          autoComplete="current-password"   >
        </Password>
    </TextRow>
    <ButtonRow>
    <ConfirmButton variant="contained" color="primary" >
        Confirm
    </ConfirmButton>
    <ConfirmButton variant="outlined" color="primary">
        Cancel
    </ConfirmButton>
    </ButtonRow>
     


    </ComponentWrapper>);
  };
  
  export default Signup;