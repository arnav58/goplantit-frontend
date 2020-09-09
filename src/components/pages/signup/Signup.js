import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import styled from "styled-components";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import signup from "./signup.jpg";

const ComponentWrapper = styled.section`
  width: 100%;
  padding: 0px;
  height: 95vh;
  background-image: url(${signup});
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
  border: 2px solid #17b978;
  border-radius: 10px
`;

const FormWrapper = styled.form`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const SelectWrapper = styled(FormControl)`
width: 100%;
width: 400px;
margin: 10px;
background: white;
//border: 2px solid #17b978;
border-radius: 10px
`;

const State = [
  { name: "VIC" },
  { name: "NSW" },
  { name: "SA" },
  { name: "WA" },
  { name: "NT" },
  { name: "QLD" },
  { name: "TAS" },
];

const Crops = [
  { name: "Wheat" },
  { name: "Barley" },
  { name: "Canola" },
  { name: "Sorghum" },
  { name: "Cotton" },
  { name: "Rice" },
];

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: "black",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      color: theme.palette.primary.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      color: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      color: theme.palette.primary.main,
    },
    "&.uiOutlinedInput-input": {
      display: "flex",
    },
   
  }
}));

const Signup = () => {

const [credentials, setCredentials] = useState({
    username:"",
    password:"",
    confirmpassword:"",
    state:"",
    crops:""
    
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
  

   const classes = useStyles();
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
      <FieldWrapper
      
        name="confirmpassword"
        onChange={handleChange}
        label="Confirmed Password"
         variant="filled"
        type="password"
      
        inputProps={{
          style: {
            color: "black",
          },
        }}
        InputLabelProps={{ style: { color: "black" } }}
      ></FieldWrapper>

      <SelectWrapper  >
      <Autocomplete
        id="combo-box-demo"
        classes={classes}
        options={State}
        getOptionLabel={(option) => option.name}
        style={{ width: 400 }}
        renderInput={(params) => <TextField {...params} label="State" variant="outlined" 
        InputLabelProps={{ style: { color: "black" } }}  />}
    />
      </SelectWrapper>

      <SelectWrapper  >
        <Autocomplete
        id="combo-box-demo"
        classes={classes}
        options={Crops}
        getOptionLabel={(option) => option.name}
        style={{ width: 400}}
        renderInput={(params) => <TextField {...params} label="Crops" variant="outlined" 
        InputLabelProps={{ style: { color: "black" } }}  />}
    />
      
      </SelectWrapper>
        
    </FormWrapper>

    <ButtonWrapper variant="contained" color="primary">
      Confirm
    </ButtonWrapper>
    <ButtonWrapper variant="outlined" color="primary">
      Cancel
    </ButtonWrapper>
  </ComponentWrapper>
);
};

export default Signup;

