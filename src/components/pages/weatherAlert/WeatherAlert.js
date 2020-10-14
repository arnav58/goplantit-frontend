import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Divider,
  Card,
  CardContent,
  Button,
  Modal,
  Backdrop,
  Fade,
  Paper,
  Link,
} from "@material-ui/core";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import EventIcon from "@material-ui/icons/Event";
import EcoIcon from "@material-ui/icons/Eco";

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
  DirectionsRun,
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
  height: 320px;
  width: 500px;
  border-color: #17b978 !important;
  padding: 5px;
  padding-left: 10px !important;
  margin-bottom: 15px;
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

const AffectedCropsWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const NoAlertsWrapper = styled.div`
  height: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled(Button)`
  width: 150px;
  height: 25px;
  color: white;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const alertToCropsMap = {
  frost: {
    suggestions:
      "Pasture rotations are a lower risk enterprise and oats are less susceptible to frost during the reproductive stage than other cereals. Wheat is more susceptible then barley at flowering, but it is not known if barley and wheat have different frost susceptibilities during grain fill. Canola is an expensive crop to grow and can increase financial risk on frost-prone paddocks due to high input costs.",
    link: "https://www.agric.wa.gov.au/frost/managing-frost-risk",
    susceptibleCrops: ["wheat", "barley"],
    lessSusceptibleCrops: ["oats"],
  },
  //flood, storm, cyclone are in the same category
  flood: {
    suggestions: `
    DPIRD suggests that farmers take the following actions if they are in a flood or cyclone prone area:
    Prepare a current inventory of livestock, infrastructure, equipment and supplies.
    Check, and fix if necessary, that all buildings and infrastructure meet design guidelines for cyclones or storms in the area.
    Map flood risk areas and build suitable flood diversion structures.
    Have alternative power, communication, water and food supplies in the case of being isolated.
    Have a plan for escape if needed.`,
    link:
      "https://www.agric.wa.gov.au/floods-and-cyclones/flood-and-cyclone-preparedness",
    susceptibleCrops: ["wheat", "barley", "canola", "canola", "cotton", "rice"],
  },
  fire: {
    suggestions: `
    If you see an unattended grass fire, or if your life in in danger, call Triple Zero (000).
    Follow your survival plan. Your safest option is to leave early.
    If you become trapped always keep the burnt ground in mind as a safety refuge point or move to a ploughed or well grazed paddock.
    If you stay and risk defending your property always protect yourself by covering up all exposed skin with protective clothing such as:
    Long-sleeved shirt and pants made from a natural fibre such as cotton.
    Sturdy leather boots and woollen socks.
    Leather gloves.
    A wide-brimmed hat.
    A face mask or towel to cover your mouth and nose.
    Eye protection such as goggles.
    `,
    link:
      "http://www.rfs.nsw.gov.au/plan-and-prepare/farm-fire-safety/grassfires/farming",
    susceptibleCrops: ["wheat", "barley", "canola", "canola", "cotton", "rice"],
  },
  wind: {
    suggestions: `
    A more recent method of preventing wind erosion and damage is to plant a cover crop in the fall. Wheat or rye is commonly used. 
    Rye is lower priced but it is more difficult to kill in the spring before planting cotton. 
    The cover can be planted solid or in one or two rows in the furrow, leaving the beds bare. 
    The advantage to planting in the furrow is that in the spring the beds are clean and the cover crop stubble will not interfere with planting.
    `,
    link:
      "https://extension2.missouri.edu/g4271#:~:text=A%20more%20recent%20method%20of,furrow%2C%20leaving%20the%20beds%20bare.",
    susceptibleCrops: ["cotton"],
    lessSusceptibleCrops: ["canola"],
  },
  cyclone: {
    suggestions: `
    Management strategies
    can help prepare the farm and secure onfarm infrastructure. These include regular
    pruning of established trees, selection
    of trees that can best withstand wind in
    wind-breaks, cross bracing and anchoring
    of farm buildings and sheds, and standby generation capacity. Post cyclone it is
    important to thoroughly assess damage
    and work out a strategy for recovery and
    improvements needed to build farm
    resilience for the future. 
    `,
    link:
      "https://coastadapt.com.au/sites/default/files/case_studies/STDP7_Reducing_cyclone_damage_on_farm.pdf",
    susceptibleCrops: [
      "wheat",
      "barley",
      "sorghum",
      "canola",
      "cotton",
      "rice",
    ],
  },
  sheep: {
    suggestions: `
    Provides warnings of wet and windy conditions to enable sheep graziers 
    to take action to reduce losses among newly born lambs and newly shorn sheep due to hypothermia.
  `,
    susceptibleCrops: ["barley"],
  },
  "severe weather": {
    suggestions: `
  Wind erosion can affect any land that is exposed to strong wind and has detached soil.
  There are practical options for preventing or reducing wind erosion in cropping and pasture systems, and some options for treating already eroding surfaces.
  Maintaining a protective groundcover and a stable soil surface on susceptible soils works well in most areas.
    `,
    link:
      "https://www.agric.wa.gov.au/wind-erosion/managing-wind-erosion-southern-western-australia",
    susceptibleCrops: [
      "wheat",
      "barley",
      "sorghum",
      "canola",
      "cotton",
      "rice",
    ],
  },
};

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  modalPaper: {
    backgroundColor: "#fafaf6",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    width: "90vh",
    height: "50vh",
    color: "#3e3636",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "5px",
  },
}));

////////The main return
/////////////////////

const WeatherAlert = (props) => {
  const [suggestion, setSuggestion] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  // const handleOpen = (suggestion) => {
  //   setSuggestion(suggestion);
  //   setOpen(true);
  // };

  const handleClose = () => {
    setSuggestion(null);
    setOpen(false);
  };
  const DisplayModal = () => {
    if (suggestion) {
      return (
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open} style={{ outline: "none" }}>
            <Paper className={classes.modalPaper}>
              <Typography variant="subtitle1">
                <EcoIcon color="primary" iconSize="large" />
                {suggestion.text}
              </Typography>
              <Link href={suggestion.link} style={{ alignSelf: "flex-start" }} target="_blank">
                <Typography
                  variant="caption"
                  textAlign="left"
                  color="secondary"
                >
                  Link to the source
                </Typography>
              </Link>
            </Paper>
          </Fade>
        </Modal>
      );
    } else return null;
  };
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
  const [state, setState] = useState(props.location.stateProps||"VIC");

  useEffect(() => {
    const getWarnings = async () => {
     
      await setState(props.location.stateProps||"VIC")
      //without await the render data will not change because setState is async function
      // so the data will render by calling the url before the state is set to the correct one
      console.log("getting warnings from "+state);
      let url = `https://goplantitbackend.herokuapp.com/api/warnings?state=${state}`;
      const res = await axios.get(url);
      console.log(url)
      await setAlerts(res.data);
      ///same issue with this, without await it will set the alerts using the previous data
    };
    getWarnings();
  }, [state, props.location.stateProps]);

  const classes = useStyles();

  //////////////UI elements

  const DisplayEmptyAlerts = () => {
    return (
      <NoAlertsWrapper>
        <EcoIcon fontSize="large" color="primary" />
        <Typography
          variant="h4"
          color="secondary"
          fontWeight="fontWeightMedium"
        >
          No Alerts
        </Typography>
      </NoAlertsWrapper>
    );
  };

  const DisplayAffectedCrop = (tag) => {
    let uiArray = [];
    if (alertToCropsMap[tag.toLowerCase()]) {
      let crops = alertToCropsMap[tag.toLowerCase()].susceptibleCrops;

      // eslint-disable-next-line array-callback-return
      crops.map((crop) => {
        let url = process.env.PUBLIC_URL + "/" + crop + ".png";
        uiArray.push(
          <Typography
            color="secondary"
            variant="body1"
            style={{ marginRight: "5px" }}
          >
            <img
              src={url}
              style={{ objectFit: "contain", height: "40px", width: "35px" }}
              alt={crop}
            />
            {crop}
          </Typography>
        );
      });
    } else {
      console.log(tag);
      console.log(alertToCropsMap[tag]);
    }
    return uiArray;
  };

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
        <CardTitleWrapper>
          {RenderIcon(card.tag)}
          <Typography
            variant="h6"
            style={{
              color: "#5c5757",
              fontWeight: 500,
              textAlign: "left",
              marginLeft: "5px",
            }}
          >
            {card.tag.toUpperCase()}
          </Typography>
          {/* <Link
            variant="h6"
            style={{ color: "#5c5757", fontWeight: 500, textAlign:"left", marginLeft:"5px" }}
          >
            {card.tag.toUpperCase()}
          </Link> */}
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
        <Typography variant="subtitle1" color="primary">
          Affected Crops:
        </Typography>
        <AffectedCropsWrapper>
          {alerts.length > 0 ? DisplayAffectedCrop(card.tag) : null}
        </AffectedCropsWrapper>
        <ButtonRow>
          <PageButton
            variant="contained"
            color="primary"
            onClick ={()=>{
              let tag = card.tag.toLowerCase()
                let suggestion = {
                  text:alertToCropsMap[tag].suggestions,
                  link:alertToCropsMap[tag].link
                }
                setSuggestion(suggestion);
                setOpen(true)


            }}
          >
            Suggestions
          </PageButton>

          <CardTitleWrapper style={{ justifyContent: "flex-end" }}>
            <EventIcon color="primary" />

            <Typography variant="subtitle2" color="secondary">
              {card.formattedDate}
            </Typography>
          </CardTitleWrapper>
        </ButtonRow>
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
    return (
      <SelectStateRowWrapper>
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
        <Autocomplete
          classes={classes}
          id="combo-box-demo"
          loading={!state}
          value={{ name: state }}
          options={StateSelections}
          getOptionLabel={(option) => option.name}
          style={{ width: 165 }}
          onChange={(event, newValue) => {
            if (newValue) {
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
          Weather Alerts
        </SecondTitle>
        {DisplaySelectionRow()}
        <DividerWrapper />
        {DisplayModal()}
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
