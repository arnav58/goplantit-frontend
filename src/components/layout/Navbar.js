import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  
  title: {
    flexGrow: 1,
    color: "#A64942",
    font: "Roboto",
    style: "normal",

  },
  icon: {
    marginRight: theme.spacing(150),
    color: "#A64942",
  },
}));



const DisplayNavbar = ()=>{
  const classes = useStyles();
    return (
    <AppBar position="static"  color ="secondary">
    <Toolbar >
    <Typography variant="h6" className={classes.title}>
        GOPLANTIT
      </Typography>
      <IconButton edge="start" aria-label="menu" className={classes.icon} >
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