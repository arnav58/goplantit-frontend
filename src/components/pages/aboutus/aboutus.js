import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import EventIcon from "@material-ui/icons/Event";

import {
  Pool,
  AcUnit,
  FlightTakeoff,
  WbSunny,
  Pets,
  Whatshot,
  FlashOn,
  Waves,
  BeachAccess,
  Error,
  WbIncandescent,
  NotificationImportant, 
  NotListedLocation
} from "@material-ui/icons/";

import styled from "styled-components";

import serviceTemplate from "../../layout/serviceTemplate";

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  height: 100%;
  overflow: hidden;
`;
const SecondTitle = styled(Typography)`
  font-weight: 500;  
`;

const ThirdTitle = styled(Typography)`
  font-weight: 400;
  color: black;
  padding-bottom: 10px;
`;

const DescriptionWrapper = styled.div`
  width: 50%;
  text-align: left;
  padding-left: 12%;
  display: flex;
`;

const DividerWrapper = styled(Divider)`
  background-color: #e2f3f5;
  margin-top: 25px;
  width: 100%;
`;

const CardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  height: 40px;
  overflow: scroll;
  border: 1px solid #e2f3f5;
  margin-bottom: 15px;
`;


const Aboutus = () => {

  const RenderIcon = (tag) => {
    let iconStyle = {
      width: "25px",
      height: "25px",
    //   marginTop: "50px",
    };
    let theIcon;
    switch (tag.toLowerCase()) {
      case "flood":
        theIcon = <Pool color="primary" style={iconStyle} />;
        break;
      case "frost":
        theIcon = <AcUnit color="primary" style={iconStyle} />;
        break;
      case "wind":
        theIcon = <FlightTakeoff color="primary" style={iconStyle} />;
        break;
      case "sheep":
        theIcon = <Pets color="primary" style={iconStyle} />;
        break;
      case "severe weather":
        theIcon = <WbSunny color="primary" style={iconStyle} />;
        break;
      case "fire":
        theIcon = <Whatshot color="primary" style={iconStyle} />;
        break;
      case "cyclone":
        theIcon = <BeachAccess color="primary" style={iconStyle} />;
        break;
      case "thunderstorm":
        theIcon = <FlashOn color="primary" style={iconStyle} />;
        break;
      case "tsunami":
        theIcon = <Waves color="primary" style={iconStyle} />;
        break;
      case "WbIncandescent":
        theIcon = <WbIncandescent color="primary" style={iconStyle} />;
        break;
      case "notification":
        theIcon = <NotificationImportant color="secondary" style={iconStyle} />;
        break;
      case "location":
        theIcon = <NotListedLocation color="secondary" style={iconStyle} />;
        break;
      default:
        theIcon = <Error color="primary" style={iconStyle} />;
    }
    return theIcon;
  };

  const DisplayAlertChildComponent = () => {
    return (
      <ContentWrapper>
        <SecondTitle color="secondary" variant="h5">
          About the Project
        </SecondTitle>
        <br></br>
        <ThirdTitle variant="h7">
        This team project “GoPlantIt”, halps the Farmers to tackle the Extreme Temperatures by recommending optimal type of crops and their yields while providing personalized 
        suggestions/notifications on their existing crops if there are any sudden climate extremities. 
        </ThirdTitle>
        <br></br>
        <SecondTitle color="secondary" variant="h6">
          Key Features
        </SecondTitle>
        <br></br>
        <ThirdTitle variant="h7">
        Our application uses API calls to collect data and provide precise recommendations as well as has various modules that a Farmer can use. 
        </ThirdTitle>
        <br></br>
        <ThirdTitle variant="h7">
        {RenderIcon("notification")} Farmers receive any
severe weather warnings issued by the agricultural department. 
        </ThirdTitle>
        <ThirdTitle variant="h7">
        {RenderIcon("WbIncandescent")} Identify the extreme weather patterns. 
        </ThirdTitle>
        <ThirdTitle variant="h7">
        {RenderIcon("notification")} Pest Growth warning. 
        </ThirdTitle>
        <ThirdTitle variant="h7">
        {RenderIcon("WbIncandescent")} Personalized recommendations on effect of extreme temperatures on existing yields
        </ThirdTitle>
        <ThirdTitle variant="h7">
        {RenderIcon("WbIncandescent")} live feed and general guide to farm safety during extreme weather conditions.
        </ThirdTitle>
        <br></br>
      </ContentWrapper>
    );
  };

  return (
    <Fragment>
      {serviceTemplate({
        title: "About Us",
        childComponent: DisplayAlertChildComponent(),
      })}     
    </Fragment>
  );
};

export default Aboutus;
