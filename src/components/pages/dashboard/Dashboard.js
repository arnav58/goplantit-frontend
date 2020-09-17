import React, { useState, useEffect, Fragment } from "react";

///ui components import
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";
import styled from "styled-components";
import serviceTemplate from "../../layout/serviceTemplate";
import LocationPicker from "../../utils/LocationPicker";
//////images import
import cold from "./cold.jpg";
import hot from "./hot.jpg";
import sunny from "./sunny.jpg";
/// http helpers import
import axios from "axios";
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
const PaperGridWrapper = styled(Grid)`
  height: 100%;
  padding-left: 0px !important;
`;
const ComponentGrid = styled(Grid)`
  height: 100%;
  margin: 20px 0px 0px 0px;
`;

const WeatherCardsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const WeatherCard = styled(Paper)`
  width: 250px;
  height: 180px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: white;
  align-item:center;
  padding:10px;
`;
const Spacer = styled.div`
  height: ${(props) => (props.height ? props.height : "10px")};
  width: ${(props) => (props.width ? props.width : "10px")};
`;
const ContentRow = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;

const backgroundWeather = (weather) => {
  const weatherImageMap = {
    cold: cold,
    hot: hot,
    sunny: sunny,
  };
  return weatherImageMap[weather];
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
  const [todayWeatherData, setTodayWeatherData] = useState(null);
  const [dailyData, setDailyData] = useState(null);

  //in production pass in the base url via environmental variable
  const baseUrl = process.env.BASEURL
    ? process.env.BASEURL
    : "http://localhost:5000/api";

  useEffect(() => {
    let url = `/weather_data?lat=${coordinates.lat}&long=${coordinates.lng}`;
    axios
      .get(baseUrl + url)
      .then((res) => {
        if (res.data) {
          ///incase of there is no return and app crashes

          ///hacky -> separate weather from current_day
          console.log(res.data);
          const { weather, ...current_day } = res.data.current_day;

          setTodayWeatherData(weather);
          setDailyData(res.data.daily);
        }
      })
      .catch((err) => console.log(err));
  }, [baseUrl, coordinates, displayLocation]);
  ////the left panel of weather
  const DisplayWeatherToday = () => {
    let backgroundUrl = backgroundWeather("sunny");
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
          <Typography variant="h4" fontWeight={500}>
            <Box fontWeight="fontWeightMedium" m={1}>
              Weather today
            </Box>
          </Typography>
          <Typography variant="h6" fontWeight={500}>
            <Box fontWeight="fontWeightMedium" m={1}>
              {displayLocation.suburb + ", " + displayLocation.state}
            </Box>
          </Typography>
        </PaperWrapper>
      </PaperGridWrapper>
    );
  };

  //the right panel of concerns
  const DisplayColorBlock = (threatStatus, width, height) => {
    let colorMap = {
      green: "#17b978",
      maroon: "#85203b",
      yellow: "#ffd615",
      red: "#e41749",
    };

    return (
      <div
        style={{
          backgroundColor: colorMap[threatStatus],
          width: width,
          height: height,
          padding:"2px"
        }}
      />
    );
  };

  const DisplayWeekWeather = () => {
    //display weather cards for the week
    let crops = ["canola", "barely", "wheat"];
    console.log(dailyData);
    return (
      dailyData &&
      dailyData.map((daily) => (
        <WeatherCard>
          <Typography variant="caption" color="primary">
            {daily.formatted_date}
          </Typography>
          <Typography variant="h6" color="primary">
            Threats:
          </Typography>
          <ContentRow>
            <Typography variant="subtitle1" color="primary" style={{marginRight:"5px"}}>
              Wind:
            </Typography>
            {/* <Typography variant="caption" color="secondary">
              {daily.wind_speed_threat_desc}
            </Typography> */}
            <Typography variant="subtitle1" color="primary" style={{marginRight:"5px", color:"#3e4a61"}}>
            {daily.wind_speed_threat_desc.split(" ").slice(0,2).join(" ")}
            </Typography>
            {DisplayColorBlock(daily.wind_speed_threat_type, "10px", "70%")}
          </ContentRow>
          {daily.rain_threat_desc &&
          <ContentRow>
            <Typography variant="subtitle1" color="primary" style={{marginRight:"10px"}}>
              Rain:
            </Typography>
            {/* <Typography variant="caption" color="secondary">
              {daily.wind_speed_threat_desc}
            </Typography> */}
            <Typography variant="subtitle1" color="primary" style={{marginRight:"5px", color:"#3e4a61"}}>
            {daily.rain_threat_desc.split(" ").slice(0,2).join(" ")}
            </Typography>
            {DisplayColorBlock(daily.rain_threat_type, "10px", "70%")}
          </ContentRow>
  }
        </WeatherCard>
      ))
    );
  };

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
            <Spacer height="20px" />
            <Typography color="secondary" variant="h5">
              <Box fontWeight="fontWeightMedium" m={1}>
                Crop status and concerns in 7 days
              </Box>
            </Typography>
            <Divider
              variant="middle"
              style={{
                backgroundColor: "grey",
                width: "85%",
                opacity: 0.5,
                marginLeft: "9px",
              }}
            />
            <Spacer height="20px" />
            <WeatherCardsRow>{DisplayWeekWeather()}</WeatherCardsRow>
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
