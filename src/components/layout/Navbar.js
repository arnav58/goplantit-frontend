import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  Link as UiLink,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
//styled components
import styled from "styled-components";
import {
  NotificationImportant,
  NotListedLocation,
  Home,
  Dashboard, 
  BarChart,
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
const NotificationContainer = styled.div`
margin-right: 15px;
    width: 100%;
    text-align: right;
    `

const RowWrapper = styled.div`
display: flex;
height: 25%;
margin-bottom: 10px;
margin: 10px;
flex-direction: row;
width: 100%;
  `;

const ColumnWrapper = styled.div`
display: flex;
margin-left: 40px;


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
        case "dashboard":
          theIcon = <Dashboard color="#18b979" color="primary" />;
          break;
        case "insights":
          theIcon = <BarChart color="#18b979" color="primary" />;
          break;
        default:
          throw new Error("No icon found with that name");
      }

      return theIcon;
    };
    let items = [
      { page: "Home", link: "/", icon: "home" },      
      { page: "Dashboard", link: "/dashboard", icon: "dashboard" },
      { page: "Insights", link: "/insights", icon: "insights" },
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


  // const [items1, setItems1] = useState([]);

const [itemsVIC, setItemsVIC] = useState([]);
const [itemsNSW, setItemsNSW] = useState([]);
const [itemsQLD, setItemsQLD] = useState([]);
const [itemsWA, setItemsWA] = useState([]);
const [itemsNT, setItemsNT] = useState([]);
const [itemsSA, setItemsSA] = useState([]);
const [itemsTAS, setItemsTAS] = useState([]);


  useEffect(() => {
    fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=VIC")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          if(result.length !== 0 && result[0] !== undefined){
            if('errorMessage' in result[0]){
              console.log(result[0]);
              // setItems1(data[i]);
            } else {
              console.log(result);
              setItemsVIC(result);
            }       
          }
          // console.log(result[0].title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  useEffect(() => {
    fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=NSW")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          if(result.length !== 0 && result[0] !== undefined){
            if('errorMessage' in result[0]){
              console.log(result[0]);
              // setItems1(data[i]);
            } else {
              console.log(result);
              setItemsNSW(result);
            }       
          }
          // console.log(result[0].title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  useEffect(() => {
    fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=QLD")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          if(result.length !== 0 && result[0] !== undefined){
            if('errorMessage' in result[0]){
              console.log(result[0]);
              // setItems1(data[i]);
            } else {
              console.log(result);
              setItemsQLD(result);
            }       
          }
          // console.log(result[0].title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  useEffect(() => {
    fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=NT")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          if(result.length !== 0 && result[0] !== undefined){
            if('errorMessage' in result[0]){
              console.log(result[0]);
              // setItems1(data[i]);
            } else {
              console.log(result);
              setItemsNT(result);
            }       
          }
          // console.log(result[0].title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  useEffect(() => {
    fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=WA")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          if(result.length !== 0 && result[0] !== undefined){
            if('errorMessage' in result[0]){
              console.log(result[0]);
              // setItems1(data[i]);
            } else {
              console.log(result);
              setItemsWA(result);
            }       
          }
          // console.log(result[0].title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  useEffect(() => {
    fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=SA")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          if(result.length !== 0 && result[0] !== undefined){
            if('errorMessage' in result[0]){
              console.log(result[0]);
              // setItems1(data[i]);
            } else {
              console.log(result);
              setItemsSA(result);
            }       
          }
          // console.log(result[0].title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  useEffect(() => {
    fetch("https://goplantitbackend.herokuapp.com/api/warnings?state=TAS")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          if(result.length !== 0 && result[0] !== undefined){
            if('errorMessage' in result[0]){
              console.log(result[0]);
              // setItems1(data[i]);
            } else {
              console.log(result);
              setItemsTAS(result);
            }       
          }
          // console.log(result[0].title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
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

const DisplayNotificationIcons = ()=>{
  return(
    <React.Fragment>
      <NotificationContainer className="notification-container">
                <div className='notification notify show-count'
                    data-count={itemsVIC.length + itemsNSW.length + itemsQLD.length + itemsNT.length + itemsWA.length + itemsSA.length + itemsTAS.length}
                    onClick={event => handleClick1(event)}
                    >
                    <NotificationImportant style={{color: '#ff304f'}}/>
                </div>
            </NotificationContainer>

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
                                    itemsVIC.map(item => (item !== undefined) ?
                                    
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
                                           <td className="alertType" style={{fontSize: '14px'}}>                                           
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

                                  {
                                    itemsNSW.map(item => (item !== undefined) ?
                                    
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
                                           <td className="alertType" style={{fontSize: '14px'}}>                                           
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

                                  {
                                    itemsQLD.map(item => (item !== undefined) ?
                                    
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
                                           <td className="alertType" style={{fontSize: '14px'}}>                                           
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

                                  {
                                    itemsNT.map(item => (item !== undefined) ?
                                    
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
                                           <td className="alertType" style={{fontSize: '14px'}}>                                           
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

{
                                    itemsWA.map(item => (item !== undefined) ?
                                    
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
                                           <td className="alertType" style={{fontSize: '14px'}}>                                           
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

{
                                    itemsSA.map(item => (item !== undefined) ?
                                    
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
                                           <td className="alertType" style={{fontSize: '14px'}}>                                           
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

{
                                    itemsTAS.map(item => (item !== undefined) ?
                                    
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
                                           <td className="alertType" style={{fontSize: '14px'}}>                                           
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


    </React.Fragment>

  )
  
}

const DisplayHorizatalBar = ()=>{
  return(
    <RowWrapper>
    <ColumnWrapper>
     <Link to="/"  style={{alignSelf:"flex-end"}} >
          <Typography
            variant="h6"
            textAlign="left"
            color="secondary">
            Home
          </Typography>
      </Link>
      </ColumnWrapper>
      <ColumnWrapper>
      <Link to="/dashboard"  style={{alignSelf:"flex-end"}} >
          <Typography
            variant="h6"
            textAlign="left"
            color="secondary">
            Dashboard
          </Typography>
      </Link>
      </ColumnWrapper>
      <ColumnWrapper>
      <Link to="/insights"  style={{alignSelf:"flex-end"}} >
          <Typography
            variant="h6"
            textAlign="left"
            color="secondary">
            Insights
          </Typography>
      </Link>
      </ColumnWrapper>
      <ColumnWrapper>
      <Link to="/alerts"  style={{alignSelf:"flex-end"}} >
          <Typography
            variant="h6"
            textAlign="left"
            color="secondary">
            Alerts
          </Typography>
      </Link>
      </ColumnWrapper>
      <ColumnWrapper>
      <Link to="/effects"  style={{alignSelf:"flex-end"}} >
          <Typography
            variant="h6"
            textAlign="left"
            color="secondary">
            Effects
          </Typography>
      </Link>
      </ColumnWrapper>
      </RowWrapper>
    
  );
};

  return (
    <AppBar position="sticky">
      <Toolbar style={{ backgroundColor: "white", paddingLeft: "18px"}}>
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
            style={{marginRight:"20%"}}
            
          >
            {/* <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            {renderMenuItems()}
            
          </Menu>
          {DisplayHorizatalBar()}
        </LogoWrapper>

        {/* -------------------------------------------------------------Notification Menu-Start------------------------------------------------------------------------------ */}

        
            {/* -------------------------------------------------------------Notification Menu-End------------------------------------------------------------------------------ */}
      {DisplayNotificationIcons()}
      

      </Toolbar>

    </AppBar>
  );
};

const Navbar = () => {
  return <React.Fragment>{DisplayNavbar()}</React.Fragment>;
};

export default Navbar;
