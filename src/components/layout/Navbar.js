import React from "react";


import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
//styled components
import styled from "styled-components"

const Title = styled(Typography)`
margin-right:5px;
`


const DisplayNavbar = ()=>{
    return (
    <AppBar position="static" >
    <Toolbar style ={{backgroundColor:'white'}} >
    <Title variant="h6" color="secondary">
        GOPLANTIT
      </Title>
      <IconButton edge="start" aria-label="menu" color="secondary">
        <MenuIcon />
      </IconButton>
    
      </Toolbar>
      </AppBar>
    )
}


const Navbar = () => {
  return <React.Fragment>
      {DisplayNavbar()}
  </React.Fragment>;
};

export default Navbar;