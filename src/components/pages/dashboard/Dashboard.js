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
const InformationWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
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

const WeatherCardsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const WeatherCard = styled(Paper)`
  width: 280px;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: white;
  align-item: center;
  padding: 10px;
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

const WeatherCropsTileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  border: solid;
  border-width: 0 1px;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;
const scaleElement = styled.div`
  display: flex;
  width: 50px;
`;

const backgroundWeather = (weather) => {
  const weatherImageMap = {
    clear: clear,
    snow: snow,
    mist: mist,
    thunderstorm: thunderstorm,
    rain: rain,
    clouds: clouds,
    default: clear,
  };
  return weatherImageMap[weather]
    ? weatherImageMap[weather]
    : weatherImageMap["default"];
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

  ///weather data and crops data for making the cards
  const [weatherData, setWeatherData] = useState(null);
  const [cropsData, setCropsData] = useState(null);

  //in production pass in the base url via environmental variable
  const baseUrl = process.env.BASEURL
    ? process.env.BASEURL
    : "http://localhost:5000/api";

  useEffect(() => {
    let url = `/weather_data?lat=${coordinates.lat}&long=${coordinates.lng}`;
    axios.get(baseUrl + url).then((res) => {
      if (res.data) {
        ///incase of there is no return and app crashes

        ///hacky -> separate weather from current_day
        const { weather, ...current_day } = res.data.current_day;
        console.log("current ", current_day);
        setCropsData(current_day);
        console.log("weather", weather);
        setWeatherData(weather);
        setTodayWeatherData(weather);
        setDailyData(res.data.daily);
      }
    });
  }, [baseUrl, coordinates, displayLocation]);
  ////the left panel of weather
  const DisplayWeatherToday = () => {
    var weather_type = weatherData ? weatherData[0].main : "default";

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
  const colorMap = {
    green: "#17b978",
    yellow: "#ffd615",
    red: "#e41749",
    maroon: "#85203b",
  };
  //the right panel of concerns
  const DisplayColorBlock = (threatStatus, width, height) => {
    return (
      <div
        style={{
          backgroundColor: colorMap[threatStatus],
          width: width,
          height: height,
          padding: "2px",
        }}
      />
    );
  };

  const ReturnCrops = (crop, status) => {
    let url = process.env.PUBLIC_URL + "/" + crop + ".png";
    return (
      <WeatherCropsTileWrapper
        style={{
          borderRadius: "2px",
          borderColor: colorMap[status],
          borderWidth: "1px",
        }}
      >
        <img
          src={url}
          style={{ objectFit: "contain", height: "20px", width: "20px" }}
          alt={crop}
        />
        <Typography
          color="secondary"
          variant="caption"
          style={{
            marginRight: "5px",
            borderRadius: "2px",
            borderWidth: "1px",
          }}
        >
          {crop}
        </Typography>

        {/* {DisplayColorBlock(status, "10px", "70%")} */}
      </WeatherCropsTileWrapper>
    );
  };

  const DisplayWeekWeather = () => {
    //display weather cards for the week
    let crops = ["wheat", "canola", "barley"];
    return (
      dailyData &&
      dailyData.map((daily) => (
        <WeatherCard>
          <Typography variant="caption" color="primary">
            {daily.formatted_date}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Weather Condition and Threats
          </Typography>
          <ContentRow>
            <Typography
              variant="subtitle1"
              color="secondary"
              style={{ marginRight: "5px" }}
            >
              Wind:
            </Typography>
            {/* <Typography variant="caption" color="secondary">
              {daily.wind_speed_threat_desc}
            </Typography> */}
            <Typography
              variant="subtitle1"
              color="secondary"
              style={{ marginRight: "5px", color: "#3e4a61" }}
            >
              {daily.wind_speed_threat_desc.split(" ").slice(0, 2).join(" ")}
            </Typography>
            {DisplayColorBlock(daily.wind_speed_threat_type, "10px", "70%")}
          </ContentRow>
          {daily.rain_threat_desc && (
            <ContentRow>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "10px" }}
              >
                Rain:
              </Typography>
              {/* <Typography variant="caption" color="secondary">
              {daily.wind_speed_threat_desc}
            </Typography> */}
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px", color: "#3e4a61" }}
              >
                {daily.rain_threat_desc.split(" ").slice(0, 2).join(" ")}
              </Typography>
              {DisplayColorBlock(daily.rain_threat_type, "10px", "70%")}
            </ContentRow>
          )}
          <ContentRow>
            <Typography
              variant="subtitle1"
              color="primary"
              style={{ marginRight: "5px" }}
            >
              Temperature Effect
            </Typography>
          </ContentRow>
          <ContentRow>
            {crops.map((crop) =>
              ReturnCrops(crop, daily[crop + "_temp_status_color"])
            )}
          </ContentRow>
        </WeatherCard>
      ))
    );
  };
  const DisplayColorScale = () => {
    let conditionMap = {
      green: "ideal",
      yellow: "slightly unfavorable",
      red: "concerning",
      maroon: "severe",
    };
    return Object.keys(colorMap).map((element) => (
      <div
        style={{
          display: "flex",
          marginRight: "10px",
          alignItems: "center",
        }}
      >
        {DisplayColorBlock(element, "10px", "10px")}
        <Typography
          variant="body1"
          color="secondary"
          style={{
            marginLeft: "2px",
            textTransform: "capitalize",
            color: "#3e4a61",
            opacity: "0.5",
          }}
        >
          {conditionMap[element]}
        </Typography>
      </div>
    ));
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
            <Typography color="secondary" variant="caption">
              We store the location as cookie to provide personalized experience
            </Typography>
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
            <ContentRow style={{ marginLeft: "15px" }}>
              {DisplayColorScale()}
            </ContentRow>
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
        title: "Dashboard",
        childComponent: DisplayDashboard(),
        custom: true,
      })}
    </Fragment>
  );
};

export default Dashboard;
