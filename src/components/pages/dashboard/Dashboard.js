import React, { useState, useEffect, Fragment } from "react";

///ui components import
import {
  Paper,
  Grid,
  Typography,
  Box,
  Divider,
  Tooltip,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faCompass, faTint, faCloud, faCloudRain, faSun } from '@fortawesome/free-solid-svg-icons'
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
  let crops = ["sorghum", "cotton", "rice"];

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
    : "https://goplantitbackend.herokuapp.com/api";

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
        var daily = res.data.daily;
        setTodayWeatherData(daily.shift());
        console.log("daily ", daily);
        setDailyData(daily);
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
            <Typography variant="h5" fontWeight={500}>
              <Box fontWeight="fontWeightMedium" m={1}>
                {displayLocation.suburb + ", " + displayLocation.state}
              </Box>
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              <Box fontWeight="fontWeightMedium" m={1}>
                {cropsData && cropsData.temp.toString().slice(0, 2)} °C
              </Box>
            </Typography>
            <Typography variant="h5" fontWeight={500}>
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
          margin: "5px",
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
          borderWidth: "3px",
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

  const getWindSpeedDirection = (wind_deg) => {
    var directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
    var index = Math.round(((wind_deg %= 360) < 0 ? wind_deg + 360 : wind_deg) / 45) % 8;

    return directions[index];
  }

  const getFormattedCropName = (crop) => {
    return crop.charAt(0).toUpperCase() + crop.slice(1);
  }

  const getIdealTemperatureRange = (crop) => {
    if (crop === "sorghum") {
      return "Between 12°C and 34°C"
    } else if (crop === "rice") {
      return "Between 16°C and 32°C"
    } else if (crop === "cotton") {
      return "Between 27°C and 32°C"
    } else if (crop === "wheat") {
      return "Between 20°C and 25°C"
    } else if (crop === "canola") {
      return "Between 20°C and 25°C"
    } else if (crop === "barley") {
      return "Between 12°C and 25°C"
    }
  }

  const DisplayTodayWeather = () => {
    if (todayWeatherData) {
      let wind_direction = getWindSpeedDirection(todayWeatherData.wind_deg);
      console.log("today's weather ", todayWeatherData);
      return (
        <>
          <WeatherCard>
            <Typography variant="subtitle1" color="primary">
              Wind Conditions
          </Typography>
            <ContentRow>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px" }}
              >
                Wind Speed: {todayWeatherData.wind_speed} m/s <FontAwesomeIcon icon={faWind} />
              </Typography>
            </ContentRow>
            <ContentRow>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px" }}
              >
                Wind Direction: {wind_direction} <FontAwesomeIcon icon={faCompass} />
              </Typography>
            </ContentRow>
            <Divider
              variant="middle"
              style={{
                backgroundColor: "grey",
                width: "85%",
                opacity: 0.5,
                marginLeft: "9px",
              }}
            />
            <Typography variant="subtitle1" color="primary">
              Wind Related Threats
          </Typography>
            <ContentRow>
              {DisplayColorBlock(todayWeatherData.wind_speed_threat_type, "12px", "12px")}
              <Tooltip title={todayWeatherData.wind_speed_threat_desc}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px", color: "#3e4a61" }}
                >
                  {todayWeatherData.wind_speed_threat_desc
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                </Typography>
              </Tooltip>

            </ContentRow>

          </WeatherCard>
          <WeatherCard>
            <Typography variant="subtitle1" color="primary">
              Rain Conditions
            </Typography>
            {todayWeatherData.rain && (
              <ContentRow>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px" }}
                >
                  Rain: {todayWeatherData.rain}mm <FontAwesomeIcon icon={faCloudRain} />
                </Typography>
              </ContentRow>
            )}
            <ContentRow>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px" }}
              >
                Cloudiness: {todayWeatherData.clouds}% <FontAwesomeIcon icon={faCloud} />
              </Typography>
            </ContentRow>
            <ContentRow>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px" }}
              >
                Humidity: {todayWeatherData.humidity}% <FontAwesomeIcon icon={faTint} />
              </Typography>
            </ContentRow>
            <Divider
              variant="middle"
              style={{
                backgroundColor: "grey",
                width: "85%",
                opacity: 0.5,
                marginLeft: "9px",
              }}
            />
            <Typography variant="subtitle1" color="primary">
              Rain Related Threats
          </Typography>
            <ContentRow>
              {DisplayColorBlock(todayWeatherData.wind_speed_threat_type, "12px", "12px")}
              <Tooltip title={todayWeatherData.wind_speed_threat_desc}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px", color: "#3e4a61" }}
                >
                  {todayWeatherData.wind_speed_threat_desc
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                </Typography>
              </Tooltip>

            </ContentRow>

          </WeatherCard>
          <WeatherCard>
            <Typography variant="subtitle1" color="primary">
              UV Conditions
          </Typography>
            <ContentRow>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px" }}
              >
                UV Index: {todayWeatherData.uvi} <FontAwesomeIcon icon={faSun} />
              </Typography>
            </ContentRow>
            <Divider
              variant="middle"
              style={{
                backgroundColor: "grey",
                width: "85%",
                opacity: 0.5,
                marginLeft: "9px",
              }}
            />
            <Typography variant="subtitle1" color="primary">
              UVI Related Threats
          </Typography>
            {todayWeatherData.rain_threat_desc ? (
              <ContentRow>
                {DisplayColorBlock(todayWeatherData.rain_threat_type, "12px", "12px")}
                <Tooltip title={todayWeatherData.rain_threat_desc}>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    style={{ marginRight: "5px", color: "#3e4a61" }}
                  >
                    {todayWeatherData.rain_threat_desc.split(" ").slice(0, 2).join(" ")}
                  </Typography>
                </Tooltip>
              </ContentRow>
            ) : (<ContentRow>
              {DisplayColorBlock("green", "12px", "12px")}
              <Tooltip title={"No threat of lodging because of wind speed"}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px", color: "#3e4a61" }}
                >
                  No threat
              </Typography>
              </Tooltip>
            </ContentRow>)}

          </WeatherCard>

          {crops.map((crop) => (
            <WeatherCard>
              <Typography variant="subtitle1" color="primary">
                Conditions for {getFormattedCropName(crop)}
                <img
                  src={process.env.PUBLIC_URL + "/" + crop + ".png"}
                  style={{ objectFit: "contain", height: "20px", width: "20px" }}
                  alt={crop}
                />
              </Typography>
              <ContentRow>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px" }}
                >
                  Ideal Temperature Range: {getIdealTemperatureRange(crop)}
                </Typography>

              </ContentRow>
              <Divider
                variant="middle"
                style={{
                  backgroundColor: "grey",
                  width: "85%",
                  opacity: 0.5,
                  marginLeft: "9px",
                }}
              />
              <Typography variant="subtitle1" color="primary">
                Temperature Related Threats
              </Typography>
              <ContentRow>
                {DisplayColorBlock(todayWeatherData[crop + "_temp_status_color"], "12px", "12px")}
                <Tooltip title={todayWeatherData[crop + "_temp_status_tag"]}>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    style={{ marginRight: "5px", color: "#3e4a61" }}
                  >
                    {getFormattedCropName(todayWeatherData[crop + "_temp_status_tag"])}
                  </Typography>
                </Tooltip>
              </ContentRow>
            </WeatherCard>
          ))}

        </>

      )
    }
    return

  }

  const DisplayWeekWeather = () => {
    //display weather cards for the week
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
          {daily.wind_speed_threat_desc && (
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
              <Tooltip title={daily.wind_speed_threat_desc}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px", color: "#3e4a61" }}
                >
                  {daily.wind_speed_threat_desc
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                </Typography>
              </Tooltip>
              {DisplayColorBlock(daily.wind_speed_threat_type, "12px", "12px")}
            </ContentRow>
          )}

          {daily.rain_threat_desc ? (
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
              <Tooltip title={daily.rain_threat_desc}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px", color: "#3e4a61" }}
                >
                  {daily.rain_threat_desc.split(" ").slice(0, 2).join(" ")}
                </Typography>
              </Tooltip>
              {DisplayColorBlock(daily.rain_threat_type, "12px", "12px")}
            </ContentRow>
          ) : (<ContentRow>
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
            <Tooltip title={"No threat of lodging because of wind speed"}>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px", color: "#3e4a61" }}
              >
                No threat
              </Typography>
            </Tooltip>
            {DisplayColorBlock("green", "12px", "12px")}
          </ContentRow>)}
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
        {DisplayColorBlock(element, "12px", "12px")}
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
                Crop status and concerns today
              </Box>
            </Typography>
            <WeatherCardsRow>{DisplayTodayWeather()}</WeatherCardsRow>
            <Typography color="secondary" variant="h5">
              <Box fontWeight="fontWeightMedium" m={1}>
                Crop status and concerns in next 7 days
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
            <ExpansionPanel title="7 day predicted weather">
              <ExpansionPanelSummary>
                <ContentRow style={{ marginLeft: "15px" }}>
                  {DisplayColorScale()}
                </ContentRow>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Spacer height="20px" />
                <WeatherCardsRow>{DisplayWeekWeather()}</WeatherCardsRow>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
