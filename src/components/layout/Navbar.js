import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';




const DisplayNavbar = ()=>{
    return (
    <AppBar position="static"  color ="secondary">
    <Toolbar>
    <Typography variant="h6">
        GoPlantIt
      </Typography>
      <IconButton edge="start"  color="inherit" aria-label="menu">
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