import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Divider,
  Card,
  CardContent,
  Link
} from "@material-ui/core";
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import EventIcon from "@material-ui/icons/Event";
import EcoIcon from '@material-ui/icons/Eco';

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
  DirectionsRun
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
const SelectStateRowWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  margin-left: -8px;
  align-items: center;
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

const CardsWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 60%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const SingleCardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  background: white;
  height: 200px;
  width: 500px;
  border-color: #17b978 !important;
  padding: 5px;
  padding-left: 10px !important;
  margin-bottom:15px;
`;
const CardTitleWrapper = styled.div`
  display: flex;
  width: 50%;
  align-items: center;

`;

const InfoWrapper = styled.div`
  display: flex;
  height: 70px;
  overflow-y: auto;
  border: 1px solid #e2f3f5;
  margin-bottom: 15px;
`;

const NoAlertsWrapper = styled.div`
height:350px;
width:100%;
display:flex;
justify-content:center;
align-items:center;
`

////////The main return
/////////////////////

const WeatherAlert = () => {

  ////////Constant values

  const StateSelections = [
    { name: "VIC" },
    { name: "NSW" },
    { name: "SA" },
    { name: "WA" },
    { name: "NT" },
    { name: "QLD" },
    { name: "TAS" },
  ];

  const RenderIcon = (tag) => {
    let iconStyle = {
      width: "45.88px",
      height: "45.88px",
      marginBottom: "20px",
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
        case "surf":
        theIcon = <DirectionsRun color="primary" style={iconStyle} />;
        break;
      default:
        theIcon = <Error color="primary" style={iconStyle} />;
    }
    return theIcon;
  };



  //////setups

  const [alerts, setAlerts] = useState([]);
  const [state, setState] = useState("VIC");

 useEffect(() => {
   const getWarnings = async()=>{
     console.log("getting warnings")
     console.log(state)
    let url = `https://goplantitbackend.herokuapp.com/api/warnings?state=${state}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data[0])
    setAlerts(res.data)
   }
   getWarnings()
 }, [state])



  const useStyles = makeStyles((theme) => ({
    inputRoot: {
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
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
      height: "45px",
    },
  }));

  //////////////UI elements

  const DisplayEmptyAlerts = () =>{

    return(
      <NoAlertsWrapper>
        <EcoIcon fontSize="large" color="primary"/>
      <Typography variant="h4" color='secondary' fontWeight="fontWeightMedium">
        No Alerts
      </Typography>
      </NoAlertsWrapper>
    )

  }

  // const DisplayMultipleSkeletons = () => {
  //   var i;
  //   var skeletons = [];
  //   for (i = 0; i < 5; i++) {
  //     skeletons.push(
  //       <Skeleton
  //         width={550}
  //         height={188}
  //         animation="wave"
  //         style={{ background: "#f6f6f6" }}
  //       />
  //     );
  //   }
  //   return skeletons;
  // };

  const DisplaySingleCard = (card) => (
    <SingleCardWrapper variant="outlined">
      <CardContent>
      <Typography href={card.link} target="_blank">

        <CardTitleWrapper>
          {RenderIcon(card.tag)}
          <Typography
            variant="h6"
            style={{ color: "#5c5757", fontWeight: 500, textAlign:"left", marginLeft:"5px" }}
          >
            {card.tag.toUpperCase()}
          </Typography>
          <Link
            variant="h6"
            style={{ color: "#5c5757", fontWeight: 500, textAlign:"left", marginLeft:"5px" }}
          >
            {card.tag.toUpperCase()}
          </Link>
        </CardTitleWrapper>
        <InfoWrapper>
          <Typography
            variant="subtitle1"
            style={{
              color: "#5c5757",
              fontWeight: 500,
              width: "500px",
            }}
          >
            {card.title.split("EST").splice(-1)[0]}
          </Typography>
        </InfoWrapper>
        <CardTitleWrapper style ={{width:"100%", justifyContent:"flex-end"}}>
          <EventIcon color="primary" />

          <Typography variant="subtitle2" color="secondary">
            {card.formattedDate}
          </Typography>
        </CardTitleWrapper>
      </Typography>

      </CardContent>
    </SingleCardWrapper>
  );

  const DisplayAlertCards = () => {
    return alerts.length
      ? alerts.map((alert) => {
          return DisplaySingleCard(alert);
        })
      : DisplayEmptyAlerts();
  };

  const DisplaySelectionRow = () => {
    const classes = useStyles();
    return (
      <SelectStateRowWrapper>
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
        <Autocomplete
          classes={classes}
          id="combo-box-demo"
          loading={!state}
          value={{name:state}}
          options={StateSelections}
          getOptionLabel={(option) => option.name}
          style={{ width: 165 }}
          onChange={(event, newValue) => {
            if(newValue){
              setState(newValue.name);
            }
            
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="State"
              variant="outlined"
              InputLabelProps={{
                style: {
                  width: "100%",
                  color: "#17B978",
                  top: "-6px",
                },
              }}
            />
          )}
        />
        <DescriptionWrapper>
          <QuestionAnswerIcon color="primary" fontSize="large" />
          <Typography
            variant="subtitle2"
            color="secondary"
            style={{ marginLeft: "5px" }}
          >
            A collection of RSS feeds has been developed to assist people who
            need to stay up to date with the latest information issued by the
            Bureau of Meteorology.
          </Typography>
        </DescriptionWrapper>
      </SelectStateRowWrapper>
    );
  };

  const DisplayAlertChildComponent = () => {
    return (
      <ContentWrapper>
        <SecondTitle color="secondary" variant="h5">
          RSS Weather Alerts
        </SecondTitle>
        {DisplaySelectionRow()}
        <DividerWrapper />
        <CardsWrapper>{DisplayAlertCards()}</CardsWrapper>
      </ContentWrapper>
    );
  };

  return (
    <Fragment>
      {serviceTemplate({
        title: "Extreme Weather Alerts",
        childComponent: DisplayAlertChildComponent(),
      })}
    </Fragment>
  );
};

export default WeatherAlert;
