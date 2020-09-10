import React, { useState, useEffect, useRef } from "react";
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

// ----------------Imports for Notifications-Start-----------------
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Notify.css';

// ----------------Imports for Notifications-End-----------------


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

  //-------------------------------------------------------------Notification Menu-Start------------------------------------------------------------------------------

  // State variabls
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  // Useref for the overlay
  const ref = useRef(null);


  const [items1, setItems1] = useState([]);

// Get the notification message
  useEffect(() => {
    Promise.all([
      fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=VIC"),
      fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=NSW"),
      fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=SA"),
      fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=QLD"),
      fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=NT"),
      fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=WA"),
      fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=TAS")
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here    

    for(var i = 0; i<data.length; i++){
      if(data[i].length !== 0 && data[i] !== undefined){
        if('errorMessage' in data[i][0]){
          console.log(data[i][0]);
          // setItems1(data[i]);
        } else {
          console.log(data[i]);
          setItems1(data[i]);
        }       
      }
    }
    
    
  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });
}, [])



// Hide the notification on clicking outside
const hide = () => {
    setShow(false);
}

const handleClick1 = (event) => {
  setShow(!show);
  setTarget(event.target);
}

//-------------------------------------------------------------Notification Menu-End------------------------------------------------------------------------------


  return (
    <AppBar position="sticky">
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

        {/* -------------------------------------------------------------Notification Menu-Start------------------------------------------------------------------------------ */}


        <div className="notification-container">
                <div className='notification notify show-count'
                    data-count={items1.length}
                    onClick={event => handleClick1(event)}
                    >
                    <NotificationImportant style={{color: 'red'}}/>
                </div>
            </div>

            <div ref={ref}>
                <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref.current}
                    containerPadding={20}
                    rootClose={true}
                    onHide={hide}
                >
                    <Popover id="popover-contained">
                        <Popover.Title as="h3" style={{ textAlign: 'center' }}>Alerts!</Popover.Title>
                        <Popover.Content style={{ padding: '3px 3px' }}>                            
                            <ul className="notification-info-panel">
                                {
                                    items1.map(item => (item !== undefined) ?
                                    
                                    (
                                      <table className='notification-message'
                                      key={item}>
                                        <tbody>
                                        <tr>
                                          <td className="date">{item.pubDate}</td>
                                          <td className="content">
                                          <Link to="/alerts" style={{color: 'black'}}>
                                            {item.title}
                                          </Link>
                                          </td>                                          
                                           <td className="alertType">                                           
                                             {item.tag}                                             
                                           </td>
                                          
                                        </tr>
                                        </tbody>
                                      </table>
                                    ) :
                                    <>
                                        {/* <AlertTriangle color='#000000' size={32} />
                                        <h5 className="nodata">No Notifications found!</h5> */}
                                    </>
                                    )}
                            </ul>
                        </Popover.Content>
                    </Popover>
                </Overlay>
            </div>
            {/* -------------------------------------------------------------Notification Menu-End------------------------------------------------------------------------------ */}

      </Toolbar>
    </AppBar>
  );
};

const Navbar = () => {
  return <React.Fragment>{DisplayNavbar()}</React.Fragment>;
};

export default Navbar;
