import React from "react";


import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
//styled components
import styled from "styled-components"


///logo
const logoUrl = process.env.PUBLIC_URL + '/goplantit-logo.png'

const Logo = styled.img`
width:143px;
height:40px;
`
const LogoWrapper = styled.div`
display:flex;
align-items:bottom;
`
const IconButtonWrapper = styled(IconButton)`
margin-left:-30px;
`

const DisplayNavbar = ()=>{
    return (
    <AppBar position="static" >
    <Toolbar style ={{backgroundColor:'white', paddingLeft:"18px"}} >
      <LogoWrapper>
      <Logo src ={logoUrl}/>
      <IconButtonWrapper edge="start" aria-label="menu" color="secondary">
        <MenuIcon />
      </IconButtonWrapper>
      </LogoWrapper>
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