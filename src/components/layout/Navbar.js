import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Link as UiLink,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
//styled components
import styled from "styled-components";
import {
  NotificationImportant,
  NotListedLocation,
  Home,
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

///logo
const logoUrl = process.env.PUBLIC_URL + "/goplantit-logo.png";

const Logo = styled.img`
  width: 143px;
  height: 40px;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: bottom;
`;
const IconButtonWrapper = styled(IconButton)`
  margin-left: -30px;
`;

const DisplayNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles({
    paper: {
      background: 'whitesmoke',
      color: 'white'
    }
  });
  const styles = useStyles();

  const renderMenuItems = () => {
    //stupid way of display icons
    const RenderIcon = (icon) => {
      let theIcon;

      switch (icon) {
        case "notification":
          theIcon = <NotificationImportant color="primary" />;
          break;
        case "location":
          theIcon = <NotListedLocation color="primary" />;
          break;
        case "home":
          theIcon = <Home color="primary" />;
          break;
        default:
          throw new Error("No icon found with that name");
      }

      return theIcon;
    };
    let items = [
      { page: "Home", link: "/", icon: "home" },
      { page: "Alerts", link: "/alerts", icon: "notification" },
      { page: "Effects", link: "/effects", icon: "location" },
    ];

    let itemUi = [];
    items.map((item) => {
      let menuItem = (
        <MenuItem style={{backgroundColor: 'whitesmoke'}}>
        {RenderIcon(item.icon)}
          <UiLink href={item.link}>{item.page}</UiLink>
        </MenuItem>
      );

      itemUi.push(menuItem);
      return item;
    });

    return itemUi;
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: "white", paddingLeft: "18px" }}>
        <LogoWrapper>
          <Link to="/">
            <Logo src={logoUrl} />
          </Link>
          <IconButtonWrapper
            edge="start"
            aria-label="menu"
            color="secondary"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButtonWrapper>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{ paper: styles.paper }}
            
          >
            {/* <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            {renderMenuItems()}
          </Menu>
        </LogoWrapper>
      </Toolbar>
    </AppBar>
  );
};

const Navbar = () => {
  return <React.Fragment>{DisplayNavbar()}</React.Fragment>;
};

export default Navbar;
