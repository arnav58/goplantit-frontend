import React, { useState, useEffect, Fragment } from "react";

///ui components import
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";
import styled from "styled-components";
import serviceTemplate from "../../layout/serviceTemplate";
import LocationPicker from "../../utils/LocationPicker";
//////images import
import clear from "./1-clear-sky.png";
import snow from "./2-snow.png";
import mist from "./3-mist.png";
import thunderstorm from "./4-thunderstorm.png";
import rain from "./5-rain.png";
import clouds from "./6-cloudy.png";
/// http helpers import
import axios from "axios"
//cookies
import { useCookies } from "react-cookie";
/////styled components
const PaperWrapper = styled(Paper)`
  background-color: #fffafa !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 70vh;
  padding: 10px;
`;
const InformationWrapper = styled.div`
  background-color: rgba(0,0,0,0.4);
  border-radius: 5px;
`;
const DividerWrapper = styled(Divider)`
  background-color: #e2f3f5;
  margin-top: 25px;
  width: 100%;
`;
const PaperGridWrapper = styled(Grid)`
  height: 100%;
  padding-left: 0px !important;
`;
const ComponentGrid = styled(Grid)`
  height: 100%;
  margin: 20px 0px 0px 0px;
`;
const Spacer = styled.div`
height:${props => props.height ? props.height : '10px'};
width:${props => props.width ? props.width : '10px'};
`

const backgroundWeather = (weather) => {
  const weatherImageMap = {
    clear: clear,
    snow: snow,
    mist: mist,
    thunderstorm: thunderstorm,
    rain: rain,
    clouds: clouds,
    default: clear
  };
  return weatherImageMap[weather] ? weatherImageMap[weather] : weatherImageMap["default"];
};

const Dashboard = () => {
  ///helpers functions and state for user to select an area and store in cookie
  const DefaultLocation = { postcode: 3000, suburb: "Melbourne", state: "VIC" };
  const DefaultCoordinates = { lat: -37.8152065, lng: 144.963937 };

  const [cookies, setCookie] = useCookies(["name"]);
  const [displayLocation, setDisplayLocation] = useState(
    cookies.location ? cookies.location : DefaultLocation
  );
  const [coordinates, setCoordinates] = useState(
    cookies.latLng ? cookies.latLng : DefaultCoordinates
  );


  ///weather data and crops data for making the cards
  const [weatherData, setWeatherData] = useState(null)
  const [cropsData, setCropsData] = useState(null)

  //in production pass in the base url via environmental variable
  const baseUrl = process.env.BASEURL ? process.env.BASEURL : "http://localhost:5000/api";

  useEffect(() => {
    let url = `/weather_data?lat=${coordinates.lat}&long=${coordinates.lng}`
    axios.get(baseUrl + url).then(res => {
      if (res.data) { ///incase of there is no return and app crashes

        ///hacky -> separate weather from current_day 
        const { weather, ...current_day } = res.data.current_day
        console.log("current ", current_day)
        setCropsData(current_day);
        console.log("weather", weather)
        setWeatherData(weather);
      }

    })
  }, [baseUrl, coordinates, displayLocation])
  ////the left panel of weather
  const DisplayWeatherToday = () => {
    var weather_type = weatherData? weatherData[0].main : "default";

    let backgroundUrl = backgroundWeather(weather_type.toLowerCase());
    return (
      <PaperGridWrapper item sm={3} xs={12}>
        <PaperWrapper
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <InformationWrapper>
            <Typography variant="h4" fontWeight={500}>
              <Box fontWeight="fontWeightMedium" m={1}>
                Weather today
            </Box>
            </Typography>
            <DividerWrapper />
            <Typography variant="h6" fontWeight={500}>
              <Box fontWeight="fontWeightMedium" m={1}>
                {displayLocation.suburb + ", " + displayLocation.state}
              </Box>
            </Typography>
            <Typography variant="h6" fontWeight={500}>
              <Box fontWeight="fontWeightMedium" m={1}>
                {cropsData?.temp} °C
            </Box>
            </Typography>
            <Typography variant="h6" fontWeight={500}>
              <Box fontWeight="fontWeightMedium" m={1}>
                {weatherData && weatherData[0].main}
              </Box>
            </Typography>
          </InformationWrapper>
        </PaperWrapper>
      </PaperGridWrapper>
    );
  };
  //the right panel of dashboard with visualisations
  const DisplayDashboard = () => {
    return (
      <ComponentGrid container spacing={4}>
        {DisplayWeatherToday()}

        <PaperGridWrapper item sm={9} xs={12}>
          <PaperWrapper>
            <Spacer />
            <LocationPicker
              displayLocation={displayLocation}
              setDisplayLocation={setDisplayLocation}
              setCookie={setCookie}
              setCoordinates={setCoordinates}
            />
            <Typography color="primary">
              {JSON.stringify(coordinates)}
            </Typography>
          </PaperWrapper>
        </PaperGridWrapper>
      </ComponentGrid>
    );
  };

  return (
    <Fragment>
      {serviceTemplate({
        title: "Extreme Weather Alerts",
        childComponent: DisplayDashboard(),
        custom: true,
      })}
    </Fragment>
  );
};

export default Dashboard;
