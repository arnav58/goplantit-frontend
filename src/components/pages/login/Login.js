import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import styled from "styled-components";
import login from "./login.jpg";

const ComponentWrapper = styled.section`
  width: 100%;
  padding: 0px;
  height: 95vh;
  background-image: url(${login});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled(Button)`
  display: flex;
  width: 400px;
  height: 55px;
  color: white;
  border: 3px solid #17b978;
  margin-bottom: 20px;
`;
const FieldWrapper = styled(TextField)`
  width: 100%;
  width: 400px;
  margin: 10px;
  background: white;
`;

const FormWrapper = styled.form`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const Login = () => {

const [credentials, setCredentials] = useState({
    username:"",
    password:""
})

const handleChange = (e)=>{
    let name = e.target.name;
    let value = e.target.value
    let newCredential =credentials
    newCredential[name] = value
    setCredentials(newCredential)
}

// const handleSumbit = ()=>{
    
// }

  return (
    <ComponentWrapper>
      <FormWrapper noValidate autoComplete="off" onSubmit>
        <FieldWrapper
        name="username"
        onChange={handleChange}
          label="username"
          variant="filled"
          inputProps={{
            style: {
              color: "black",
            },
          }}
          InputLabelProps={{ style: { color: "black" } }}
        ></FieldWrapper>
        <FieldWrapper
        name="password"
            onChange={handleChange}
          label="Password"
          variant="filled"
          type="password"
          autoComplete="current-password"
          inputProps={{
            style: {
              color: "black",
            },
          }}
          InputLabelProps={{ style: { color: "black" } }}
        ></FieldWrapper>
      </FormWrapper>

      <ButtonWrapper variant="contained" color="primary">
        Login
      </ButtonWrapper>
      <ButtonWrapper variant="outlined" color="primary">
        Sign Up
      </ButtonWrapper>
    </ComponentWrapper>
  );
};

export default Login;
