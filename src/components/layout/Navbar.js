import React, { useState, useEffect, useRef, Fragment } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "../utils/useWindowWith";
// ----------------Imports for Notifications-Start-----------------
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Notify.css";

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
`;

const RowWrapper = styled.div`
  display: flex;
  height: 25%;
  margin-bottom: 10px;
  margin: 10px;
  flex-direction: row;
  width: 500px;
  justify-content: space-around;
`;

const ColumnWrapper = styled.div`
  display: flex;
`;

const SingleNotification = styled.div`
  display: flex;
  min-width: 200px;
  justify-content: space-around;
  margin-bottom: 10px;
  text-align: center;
`;
const PopoverWrapper = styled(Popover)`
  min-width: 200px;
  width: 100%;
`;

const DisplayNavbar = () => {
  const pageItems = [
    { page: "Home", link: "/", icon: "home" },
    { page: "Dashboard", link: "/dashboard", icon: "dashboard" },
    { page: "Insights", link: "/insights", icon: "insights" },
    { page: "Alerts", link: "/alerts", icon: "notification" },
    { page: "Effects", link: "/effects", icon: "location" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const { windowWidth } = useWindowDimensions();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles({
    paper: {
      background: "whitesmoke",
      color: "white",
    },
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
          theIcon = <Dashboard color="primary" />;
          break;
        case "insights":
          theIcon = <BarChart color="primary" />;
          break;
        default:
          throw new Error("No icon found with that name");
      }

      return theIcon;
    };

    let itemUi = [];
    pageItems.map((item) => {
      let menuItem = (
        <MenuItem style={{ backgroundColor: "whitesmoke" }}>
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

  const [itemsState, setItemsState] = useState({
    VIC: [],
    NSW: [],
    QLD: [],
    WA: [],
    NT: [],
    SA: [],
    TAS: [],
  });

  useEffect(() => {
    Object.keys(itemsState).map((state) => {
      let url =
        "https://goplantitbackend.herokuapp.com/api/warnings?state=" + state;
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            // setIsLoaded(true);
            if (result.length !== 0 && result[0] !== undefined) {
              if ("errorMessage" in result[0]) {
                // console.log(result[0]);
                // setItems1(data[i]);
              } else {
                let newState = itemsState;
                newState[state] = result;
                setItemsState(newState);
                setNotificationCount(getAllNotificationsLength());
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
        .catch((err) => console.log(err));
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsState]);

  // Hide the notification on clicking outside
  const hide = () => {
    setShow(false);
  };

  const handleClick1 = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const getAllNotificationsLength = () => {
    console.log("counting");
    /////go through the items of each state and get the count
    let count = 0;
    Object.keys(itemsState).forEach((state) => {
      count += itemsState[state].length;
    });
    return count;
  };

  //-------------------------------------------------------------Notification Menu-End------------------------------------------------------------------------------
  /**
   * Display notification of each state
   * @param {Array} itemsInTheState Notification Items in the state.
   * @param {String} state Name of the state.
   * @return {JSX Array} return a list of notification component.
   */
  const DisplayNotificationItems = (itemsInTheState, state) => {
    ////display the notification item in a state
    // console.log(itemsInTheState)
    if (itemsInTheState.length) {
      return (
        <Fragment>
          {itemsInTheState.map(
            (item) =>
              item !== undefined && (
                // <table className="notification-message" key={item}>
                //   <tbody>
                //     <tr>
                //       <td className="date">{item.pubDate}</td>
                //       <td className="content">

                //       </td>
                //       <td className="alertType" style={{ fontSize: "14px" }}>
                //         {item.tag}
                //       </td>
                //     </tr>
                //   </tbody>
                // </table>
                <SingleNotification>
                  <Typography variant="subtitle2" color="primary">
                    {state}:
                  </Typography>
                  <Link
                    to={{
                      pathname:`/alerts`,
                    stateProps:state}}
                    style={{ color: "black", width: "150px" }}
                    color="secondary"
                  >
                    {item.title.slice(0, 25)}...
                  </Link>
                  <Typography variant="subtitle2" color="secondary">
                    {item.tag}
                  </Typography>
                </SingleNotification>
              )
          )}
        </Fragment>
      );
    } else {
      return (
        <Typography
          variant="subtitle2"
          color="primary"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          No Alerts In {state}
        </Typography>
      );
    }
  };
  const DisplayNotificationIcons = () => {
    return (
      <React.Fragment>
        <NotificationContainer className="notification-container">
          <div
            className="notification notify show-count"
            data-count={notificationCount}
            onClick={(event) => handleClick1(event)}
          >
            <NotificationImportant style={{ color: "#ff304f" }} />
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
            <PopoverWrapper id="popover-contained">
              <Popover.Title as="h3" style={{ textAlign: "center" }}>
                Alerts!
              </Popover.Title>
              <Popover.Content style={{ padding: "3px 3px" }}>
                <ul className="notification-info-panel">
                  {Object.keys(itemsState).map((state) =>
                    DisplayNotificationItems(itemsState[state], state)
                  )}
                </ul>
              </Popover.Content>
            </PopoverWrapper>
          </Overlay>
        </div>
      </React.Fragment>
    );
  };

  const DisplayHorizontalBar = () => {
    const capitalize = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    const DisplaySingleLink = (pageItem) => {
      return (
        <ColumnWrapper>
          <Link to={pageItem.link} style={{ alignSelf: "flex-end" }}>
            <Typography variant="subtitle1" textAlign="left" color="secondary">
              {capitalize(pageItem.page)}
            </Typography>
          </Link>
        </ColumnWrapper>
      );
    };
    return (
      <RowWrapper>
        {pageItems.map((page) => DisplaySingleLink(page))}
      </RowWrapper>
    );
  };
  const DisplayHamburgerMenu = () => (
    <Fragment>
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
        style={{ marginRight: "20%" }}
      >
        {/* <MenuItem onClick={handleClose}>Home</MenuItem>
<MenuItem onClick={handleClose}>My account</MenuItem>
<MenuItem onClick={handleClose}>Logout</MenuItem> */}
        {renderMenuItems()}
      </Menu>
    </Fragment>
  );

  return (
    <AppBar position="sticky">
      <Toolbar style={{ backgroundColor: "white", paddingLeft: "18px" }}>
        <LogoWrapper>
          <Link to="/">
            <Logo src={logoUrl} />
          </Link>
          {windowWidth > 800 ? DisplayHorizontalBar() : DisplayHamburgerMenu()}
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
