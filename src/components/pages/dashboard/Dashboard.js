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
  ExpansionPanelDetails,
  Modal,
  Backdrop,
  Fade,
  Link
} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faCompass, faTint, faCloud, faCloudRain, faSun } from '@fortawesome/free-solid-svg-icons'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

import { makeStyles } from '@material-ui/core/styles';

import ImageOps from "../disease-detect/ImageOps";
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
const ExpansionPanelWrapper = styled(ExpansionPanel)`
  background-color: #fffafa;
`
const ExpansionPanelDetailsWrapper = styled(ExpansionPanelDetails)`
  padding: 0;
`
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
  width: 56px;
  height: 56px;
`;
const scaleElement = styled.div`
  display: flex;
  width: 50px;
`;

// ----------------------------------------------------- Disease Detector - Start -------------------------------------------------------- //

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const PageButton = styled(Button)`
  width: 150px;
  height: 45px;
  color: white;
`;

const PageButtonAlert = styled(Button)`
  width: 120px;
  height: 30px;
  color: white;
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  modalPaper: {
    backgroundColor: "#fafaf6",
    boxShadow: theme.shadows[5],
    display: "flex",
    width: "90vh",
    height: "75vh",
    color: "#3e3636",
    flexDirection: "column",
    // justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "5px",
    overflow: "auto",
    padding: "20px",
  },
  modalPaperAlert: {
    backgroundColor: "#fafaf6",
    boxShadow: theme.shadows[5],
    display: "flex",
    width: "90vh",
    height: "60vh",
    color: "#3e3636",
    flexDirection: "column",
    // justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "5px",
    overflow: "auto",
    padding: "20px",
  },
  backDrop: {
    background: 'rgba(0,0,0,0.1)',
  },
  images: {
    height: "30vh",
    width: "30vh",
  },
}));

// ----------------------------------------------------- Disease Detector - End -------------------------------------------------------- //


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

  const getUVIRelatedData = (uvi) => {
    if (0 <= uvi && uvi < 2) {
      return {
        color: "green",
        tag: "No threat"
      }
    }
    else if (2 <= uvi && uvi < 5) {
      return {
        color: "yellow",
        tag: "Moderate"
      }
    }
    else if (5 <= uvi && uvi < 7) {
      return {
        color: "orange",
        tag: "High"
      }
    }
    else if (7 <= uvi && uvi < 10) {
      return {
        color: "red",
        tag: "Very high"
      }
    }
    else if (10 <= uvi) {
      return {
        color: "maroon",
        tag: "Extreme"
      }
    }
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

    const [summary, setSummary] = React.useState(false);
    const [type, setType] = React.useState();
    const alert_classes = useStyles();
    const handleOpen = (event) => {
      setSummary(true);
      setType(event);
    };
    const handleClose = () => {
      setSummary(false);
    };

    const getAlertModal = () => {

      let url = process.env.PUBLIC_URL + "/alert_images/" + type + ".jpg";
  
      console.log(type);
      return(
        <>
          <Modal
            className={alert_classes.modal}
            open={summary}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={summary} style={{ outline: "none" }}>
              <Paper className={alert_classes.modalPaperAlert}>
                {type === "wind" &&
                <>
                {/* <img src={url} alt={type} className={alert_classes.images}/> */}
                <br></br>
                  <Typography>
                  <b>Lodging</b> is the bending over of the stems near ground level of grain crops, which makes them very difficult to harvest, and can dramatically reduce yield. Lodging in cereals is often a result of the combined effects of inadequate standing power of the crop, and conditions such as rain, wind, hail, topography, soil, previous crop, and others.
                  </Typography>
                  <Spacer height="20px" /><br></br>
                  <Typography variant="h5" style={{alignSelf:"flex-start"}}>
                      Precautions
                  </Typography>
                  <Spacer height="10px" /><br></br>
                  <Typography  style={{alignSelf:"flex-start"}}>
                    <b>Pre-Harvest</b>
                  </Typography>  
                  <Spacer height="10px" />
                  <Typography>
                    <ul>
                      <li>
                      <b>Inspect Fields</b>. Producers should inspect susceptible fields regularly during late August and early September to estimate the rate of development of stalk rots which may be present.
                      </li>
                      <li>
                      <b>Identify the extent of the problem</b>. Is it isolated in only one area of a field, or is it spread evenly throughout the field? Also, is only one field affected, or are all fields affected? Once you have determined the extent of the problem, consider the following harvest options.
                      </li>
                    </ul>  
                  </Typography>    
                  <Spacer height="10px" />
                  <Typography  style={{alignSelf:"flex-start"}}>
                    <b>Harvest</b>
                  </Typography>  
                  <Spacer height="10px" />
                  <Typography>
                    <ul>
                      <li>
                      <b>Harvest the affected areas first</b>. Do not allow lodged fields to remain unharvested any longer than absolutely necessary.
                      </li>
                      <li>
                      <b>Harvest the affected areas slower than usual</b>. A ground speed of 2 mph is usually adequate for harvesting lodged corn. By harvesting at a slower speed, your ability to pick up lodged ears that would otherwise be missed will increase.
                      </li>
                      <li>
                      <b>Under severe stalk lodging conditions, harvest against the direction of the lodging</b>. For example, if the corn plants are lodged toward the east, come into the field from the east. Harvesting the field from the west will only lodge the plants further, making it almost impossible to pick up the ears.
                      </li>
                    </ul>  
                  </Typography>    
                  <Spacer height="10px" />
                  <Typography  style={{alignSelf:"flex-start"}}>
                    <b>Post-Harvest</b>
                  </Typography>  
                  <Spacer height="10px" />
                  <Typography>
                  While the cultural and harvest management options above will help you reduce the harvest losses you incur during the current growing season, you need to evaluate why certain fields or areas of fields lodged. Think carefully about the causes discussed earlier. Did you make the best choices as to hybrid selection, fertility levels, plant populations, pest control, or cultural practices? If not, which factors can be changed to avoid the problem next year?  
                  </Typography>    
                  <Spacer height="10px" />  
                  <Link href="https://www.extension.purdue.edu/extmedia/AY/AY-262.html" style={{alignSelf:"flex-end"}} target="_blank">
                  <Typography
                    variant="caption"
                    textAlign="left"
                    color="secondary"
                  >
                    Learn more...
                  </Typography>
                  </Link>
                  </>
              }
              {type === "rain" &&
                <>
                {/* <img src={url} alt={type} className={alert_classes.images}/> */}
                <br></br>
                  <Typography>
                  <b>Lodging</b> is the bending over of the stems near ground level of grain crops, which makes them very difficult to harvest, and can dramatically reduce yield. Lodging in cereals is often a result of the combined effects of inadequate standing power of the crop, and conditions such as rain, wind, hail, topography, soil, previous crop, and others.
                  </Typography>
                  <Spacer height="20px" /><br></br>
                  <Typography variant="h5" style={{alignSelf:"flex-start"}}>
                      Precautions
                  </Typography>
                  <Spacer height="10px" /><br></br>
                  <Typography>
                    <ul>
                      <li>
                      <b>Irrigation timing</b>. Do not irrigate when you expect winds. Irrigate in late afternoon when winds tend to subside, or early morning if that is the calmest time of day in your area. Particularly avoid irrigating if high winds are forecast.
                      </li>
                      <li>
                      <b>Late irrigation</b>. Avoid over wetting the soil during late grain filling.
                      </li>
                      <li>
                      <b>Variety</b>. Change to a shorter variety if your area is prone to high winds or rainstorms during the later stages of growth.
                      </li>
                      <li>
                      <b>Nitrogen</b>. Reduce nitrogen applications to unimproved, tall varieties, particularly very late applications.
                      </li>
                      <li>
                      <b>Diseases</b>. Control crown and root diseases by appropriate agronomy and/or seed dressings.
                      </li>
                    </ul>  
                  </Typography>    
                     
                  <Spacer height="10px" />  
                  <Link href="http://wheatdoctor.org/lodging" style={{alignSelf:"flex-end"}} target="_blank">
                  <Typography
                    variant="caption"
                    textAlign="left"
                    color="secondary"
                  >
                    Learn more...
                  </Typography>
                  </Link>
                  </>
              }
              {type === "uv" &&
                <>
                {/* <img src={url} alt={type} className={alert_classes.images}/> */}
                <br></br>
                  <Typography>
                  Plants are highly sensitive to UV-B radiation because of their sessile nature. In plants, UV-B radiation damages cell membranes and all organelles within the cell, including the chloroplasts, mitochondria, and deoxyribonucleic acid (DNA) within the nucleus. Consequently, UV-B damage harms crop yield and quality. An overview of various processes affected by UV-B radiation at cellular and plant levels. However, the effect of UV-B radiation varies with intensity and duration of irradiation and stage of plant development.
                  </Typography>
                  <Spacer height="20px" /><br></br>
                  <Typography variant="h5" style={{alignSelf:"flex-start"}}>
                      Effects
                  </Typography>
                  <Spacer height="10px" /><br></br>
                  <Typography  style={{alignSelf:"flex-start"}}>
                    <b>Plant Morphology and Architecture</b>
                  </Typography>  
                  <Spacer height="10px" />
                  <Typography>
                    <ul>
                      <li>
                      It induces a range of strong morphological effects in plants, including leaf thickness, leaf discoloration, cotyledon curling, inhibition of hypocotyl growth, stem and leaf elongation, axillary branching, and shifts in root-shoot ratio (Jansen, 2002).
                      </li>
                      <li>
                      Elevated UV-B radiation can result in slower stem extension rates, shorter internode lengths leading to shorter plant height, decreased individual leaf size, fewer leaves leading to less leaf area, and fewer tillers and branch lengths.
                      </li>
                      <li>
                      In addition, enhanced UV-B radiation causes increased leaf epicuticular wax and stomatal index, and reductions in thickness of palisade and mesophyll tissues without altering the thinness of the epidermal layers.
                      </li>
                    </ul>  
                  </Typography>    
                  <Spacer height="10px" />
                  <Typography  style={{alignSelf:"flex-start"}}>
                    <b>Plant Development and Growth</b>
                  </Typography>  
                  <Spacer height="10px" />
                  <Typography>
                    <ul>
                      <li>
                      Elevated UV-B radiation can delay flowering time in several different crops like cotton, etc.
                      </li>
                      <li>
                      UV-B radiation does affect flower size, anther number, and pollen production, germination, and tube growth in many plant species. Cotton flowers produced on plants exposed to elevated UV-B were smaller due to reduced petal and bract size, and had fewer anthers.
                      </li>
                      <li>
                      Exposure to UV-B radiation decreases pollen germination and rate of pollen tube growth by 10% - 25% in several crop species. Increased UV-B radiation decreased total pollen production, pollen germination, and tube growth.
                      </li>
                    </ul>  
                  </Typography>    
                  <Spacer height="10px" />
                  <Typography  style={{alignSelf:"flex-start"}}>
                    <b>Pest Damage</b>
                  </Typography>  
                  <Spacer height="10px" />
                  <Typography>
                  <ul>
                      <li>
                      The impact of elevated UV-B radiation on plant species is well understood, but knowledge of the effects of UV-B on insect pests and disease-causing pathogens (fungi and bacteria) is limited.
                      </li>
                      <li>
                      Solar UV-B can affect insect herbivores through reduced growth, survivorship, and fecundity through changes in leaf characteristics (appearance and composition).
                      </li>
                      <li>
                      The effect of UV-B on plant pathogens can occur either through direct effects on various stages of pathogen development, such as spore germination, germ tube extension, and sporulation or indirectly by influencing host-plant resistance by damaging cells, decreasing plant growth and morphology (decreasing leaf and cuticle thickness), or modifying gene expression.
                      </li>
                    </ul>  
                  </Typography>    
                  <Spacer height="10px" />  
                  <Link href="https://www.climate-policy-watcher.org/ultraviolet-radiation-2/specific-effects-of-uvb-radiation-on-plants.html" style={{alignSelf:"flex-end"}} target="_blank">
                  <Typography
                    variant="caption"
                    textAlign="left"
                    color="secondary"
                  >
                    Learn more...
                  </Typography> 
                  </Link>
                  </>
              }
              {type == "sorghum" &&
                <>
                {/* <img src={url} alt={type} className={alert_classes.images}/> */}
                <br></br>
                <Typography>
                Higher sorghum prices mean higher profitability. Areas where sorghum is now a major crop are likely to include a bigger percentage of sorghum in the rotation. In most other areas, other than full-irrigation areas, profit comparisons detailed in the report show sorghum to be equally or more profitable per hectare than alternative crops (based on projected returns).
                </Typography>
                <Spacer height="20px" /><br></br>
                <Typography variant="h5" style={{alignSelf:"flex-start"}}>
                    Precautions
                </Typography>  
                <Spacer height="10px" /><br></br>
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Sowing earlier</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    Milder temperatures lead to higher water-use efficiency (WUE) and yield. Farm observations show WUE for early-sown sorghum at Dalby can be as high as 16 kilograms a hectare per millimetre of rain, but with a December sowing yield drops by 33 per cent to 10.8kg/ha/mm.
                    </li>
                    <li>
                    Early sowing should use varieties with 'cold tolerance'. Suitable fungicide and insecticide seed dressings, combined with accurate shallow planting - with disc planters, which mix less dry soil with wet soil around the seed - press-wheels and pest monitoring all combine to make early sowing more reliable.
                    </li>
                    <li>
                    Moisture seeking (where dry topsoil is removed in front of the sowing unit) contributes to timely sowing.
                    </li>
                  </ul>  
                </Typography>    
                <Spacer height="10px" />
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Soil fertility, especially nitrogen</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    High soil fertility is essential to maximise yields in high-yielding seasons, the time when farmers make the greatest profit.
                    </li>
                    <li>
                    Growers should not skimp on nitrogen following a poor year. One way to have some extra nitrogen in reserve in good years is to use feedlot manure in the fertiliser program.
                    </li>
                  </ul>  
                </Typography>    
                <Spacer height="10px" />
                <Spacer height="10px" />
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Plant population and row spacing</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    The row spacing being more than one metre in a skip-row configuration, except where yield is unlikely to go much higher than 2.5 to 3.0t/ha.
                    </li>
                    <li>
                    Recommended populations are 60,000 to 80,000 plants/ha for higher rainfall and 40,000 for hotter, drier environments. Research indicates higher populations may be needed for wide-row sowing (for example, 150cm rows or skip row).
                    </li>
                  </ul>  
                </Typography>  
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Weeds and pest control</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                High standard of weed control is essential for sorghum, with an integrated control program involving various herbicides and techniques such as shielded sprays and rotations. Pests such as midge and heliothis need to be carefully monitored, and treated if thresholds are reached. Variety tolerance will not solve all midge problems. 
                </Typography>    
                
                <Spacer height="10px" />  
                <Link href="https://grdc.com.au/resources-and-publications/groundcover/ground-cover-issue-68-may-june-2007/sorghum-best-practice-key-to-sorghum-boom" style={{alignSelf:"flex-end"}} target="_blank">
                <Typography
                  variant="caption"
                  textAlign="left"
                  color="secondary"
                >
                  Learn more...
                </Typography>
                </Link>
                </>
              }
              {type === "cotton" &&
                <>
                {/* <img src={url} alt={type} className={alert_classes.images}/> */}
                <br></br>
                <Typography>
                Cotton is a natural fibre grown on a plant related to the commonly-found garden species hibiscus. Cotton seeds are planted in spring and the plant grows into green, bushy shrubs about one metre in height. In Australia, cotton is picked with large mechanical harvesters and gathered into large, round, wrapped modules. The modules are then sent off to a cotton gin for processing.
                </Typography>
                <Spacer height="20px" /><br></br>
                <Typography variant="h5" style={{alignSelf:"flex-start"}}>
                    Precautions
                </Typography>
                <Spacer height="10px" /><br></br>
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Planting</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    Growers check the soil temperature regularly before planting. Cotton seed is planted in the spring, as soon as the soil is warm enough to be sure of satisfactory seed germination and crop establishment.
                    </li>
                    <li>
                    Cotton seeds emerge from the ground five to 14 days after planting - depending on soil temperature and moisture.
                    </li>
                    <li>
                    Refuge crops are also established at this time, which help slow down resistance to Bt proteins from evolving in the pest population by producing susceptible Helicoverpa moths that have not been exposed to the Bt toxins. Moths produced in the refuge crops will disperse and mate with any potentially resistant moths from the Bollgard 3 crops. This tactic is called genetic dilution.
                    </li>
                  </ul>  
                </Typography>    
                <Spacer height="10px" />
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Growing season</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    Growers protect their crops from pests during this period using Integrated Pest Management (IPM). The UN's Food and Agriculture Organisation defines IPM as "the careful consideration of all available pest control techniques and subsequent integration of appropriate measures that discourage the development of pest populations and keep pesticides and other interventions to levels that are economically justified and reduce or minimize risks to human health and the environment.”
                    </li>
                    <li>
                    Growers conserve beneficial insects (natural enemies to pests), and manage their natural resources to help suppress pests, which is at the heart of IPM.
                    </li>
                    <li>
                    The use of biotechnology in cotton has made a significant contribution to the dramatic reduction in insecticides applied to Australian cotton crops. There has been a 97% decrease in insecticide use since 1992, coinciding with the introduction of Bt cotton and strong IPM.
                    </li>
                  </ul>  
                </Typography>    
                <Spacer height="10px" />
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Picking (harvesting)</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    Defoliation is then carried out to remove the plant’s leaves and to crack the bolls open. Growers usually choose to harvest the cotton crop once most bolls have opened and fully matured.
                    </li>
                    <li>
                    It is extremely important that cotton is dry when it is picked, or discolouration may occur and reduce quality.
                    </li>
                    <li>
                    When mature, the crop is harvested mechanically and placed into large modules. The modules are loaded onto trucks and transported from the farm to a cotton gin. Cotton gins are factories that separate cottonseed and trash from the lint (raw cotton fibre).
                    </li>
                  </ul>  
                </Typography>   
                <Spacer height="10px" />  
                <Link href="https://www.cottonaustralia.com.au/how-is-cotton-grown" style={{alignSelf:"flex-end"}} target="_blank">
                <Typography
                  variant="caption"
                  textAlign="left"
                  color="secondary"
                >
                  Learn more...
                </Typography>
                </Link>
                </>
              }
              {type === "rice" &&
                <>
                {/* <img src={url} alt={type} className={alert_classes.images}/> */}
                <br></br>
                <Typography>
                Rice is the third-largest crop production, after sugarcane and maize. The main producers of rice are the nations of China, India, Indonesia, Bangladesh, and Vietnam. Rice is a staple crop. More than half the people in the world, about 3.5 billion people, rely on its production.
                </Typography>
                <Spacer height="20px" /><br></br>
                <Typography variant="h5" style={{alignSelf:"flex-start"}}>
                    Precautions
                </Typography>
                <Spacer height="10px" /><br></br>
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Pre-plant Practices</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    Pre-plant practices mainly refer to the variety selection.
                    </li>
                    <li>
                    Rice has over 40,000 varieties and hybrids. It’s important for a farmer to use healthy seed of locally adapted varieties to get a crop with a good potential yield.
                    </li>
                    <li>
                    A good pre-plant management practice is also to plan and determine crop season, inputs and labor requirements. That way a farmer can manage his resources, plan a potential credit, and organize his workers.
                    </li>
                  </ul>  
                </Typography>    
                <Spacer height="10px" />
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Growth Practices</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                  <ul>
                    <li>
                    Growth management starts with proper planting or sowing practices.
                    </li>
                    <li>
                    Rice crops can be seeded directly into the field, or sown in seedbeds and then transplanted in the field.
                    </li>
                    <li>
                    Choosing the best planting practice depends on location and rice ecosystem, soil type, and the availability of input and physical labor.
                    </li>
                    <li>
                    Improving soil fertility is also an important farm practice in the management of rice production. Soil fertilization can be practiced with mineral and organic fertilizers, depending upon the production type required. However, organic fertilizers are always recommended practice for the improvement of soil organic matter
                    </li>
                    <li>
                    Rice is a crop extremely sensitive to water shortages. Shallow tillage is a desirable practice to prevent water losses due to land soaking.
                    </li>
                  </ul>  
                </Typography>    
                <Spacer height="10px" />
                <Typography  style={{alignSelf:"flex-start"}}>
                  <b>Harvest Practices</b>
                </Typography>  
                <Spacer height="10px" />
                <Typography>
                <ul>
                    <li>
                    Good harvest practices are important to maximize grain yield and minimize yield losses and quality spoilage.
                    </li>
                    <li>
                    By practicing the harvest at the right time, a farmer can preserve his yields. It’s also important for a farmer to avoid delays in threshing after the harvesting, and use a threshing machine. After threshing, it is recommended practice to clean and dry the grains.
                    </li>
                    <li>
                    Embracing good farm practices is the right path to ensure high yields and sustainable crop production.
                    </li>
                  </ul> 
                </Typography>    
                <Spacer height="10px" />  
                <Link href="https://blog.agrivi.com/post/sustainable-farm-practices-for-rice-farming" style={{alignSelf:"flex-end"}} target="_blank">
                <Typography
                  variant="caption"
                  textAlign="left"
                  color="secondary"
                >
                  Learn more...
                </Typography>
                </Link>
                </>
              }
              </Paper>
              </Fade>
              </Modal>
        </>
      );
    }

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

            <ContentRow>
          {todayWeatherData.wind_speed_threat_type != "green" && 
          <PageButtonAlert
              variant="contained"
              color="primary"
              onClick={() => handleOpen("wind")}
            >
              suggestions
            </PageButtonAlert>
          }

            {getAlertModal()}
          
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
            <Tooltip title={"No threat of lodging because of rain"}>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{ marginRight: "5px", color: "#3e4a61" }}
              >
                No threat
              </Typography>
            </Tooltip>
          </ContentRow>)}

          <ContentRow>
          {todayWeatherData.rain_threat_type != "green" && 
          <PageButtonAlert
              variant="contained"
              color="primary"
              onClick={() => handleOpen("rain")}
            >
              suggestions
            </PageButtonAlert>
          }
          {getAlertModal}
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
            <ContentRow>
              {DisplayColorBlock(getUVIRelatedData(todayWeatherData.uvi).color, "12px", "12px")}
              <Tooltip title={getUVIRelatedData(todayWeatherData.uvi).tag}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  style={{ marginRight: "5px", color: "#3e4a61" }}
                >
                  {getUVIRelatedData(todayWeatherData.uvi).tag}
                </Typography>
              </Tooltip>
            </ContentRow>
            <ContentRow>
          {getUVIRelatedData(todayWeatherData.uvi).color != "green" && 
          <PageButtonAlert
              variant="contained"
              color="primary"
              onClick={() => handleOpen("uv")}
            >
              suggestions
            </PageButtonAlert>
          }
          {getAlertModal}
              </ContentRow>
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
              <ContentRow>
          {todayWeatherData[crop + "_temp_status_color"] != "green" && 
          <PageButtonAlert
              variant="contained"
              color="primary"
              onClick={() => handleOpen(crop)}
            >
              suggestions
            </PageButtonAlert>
          }
          {getAlertModal}
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

  // ----------------------------------------------------- Disease Detector - Start -------------------------------------------------------- 


  const DisplayDiseaseDetector = () => {

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (

      <>
        <PageButton
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Click here &nbsp; <p style={{ fontSize: "10px" }}> Beta </p>
        </PageButton>

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
              <ImageOps />
            </Paper>
          </Fade>
        </Modal>

      </>

    );

  }

  // ----------------------------------------------------- Disease Detector - End -------------------------------------------------------- 


  const DisplayDashboard = () => {
    return (
      <ComponentGrid container spacing={4}>
        {DisplayWeatherToday()}

        <PaperGridWrapper item sm={9} xs={12}>
          <PaperWrapper>
            <Spacer />
            <HeaderRow>
              <LocationPicker
                displayLocation={displayLocation}
                setDisplayLocation={setDisplayLocation}
                setCookie={setCookie}
                setCoordinates={setCoordinates}
              />
              {/* ----------------------------------------------------- Disease Detector - Start --------------------------------------------------------  */}
              <Spacer width="30%" style={{ paddingTop: '5%' }} />
              <Typography color="secondary" variant="h6" style={{ paddingRight: "2%", paddingTop: "1%" }}>Know your Crop Disease</Typography>
              <DisplayDiseaseDetector />

              {/* ----------------------------------------------------- Disease Detector - Start --------------------------------------------------------  */}
            </HeaderRow>
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
            <ExpansionPanelWrapper title="Crop status and concerns in next 7 days">
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}>
                <ContentRow style={{ marginLeft: "15px" }}>
                  {DisplayColorScale()}
                </ContentRow>
              </ExpansionPanelSummary>
              <ExpansionPanelDetailsWrapper>
                <Spacer height="20px" />
                <WeatherCardsRow>{DisplayWeekWeather()}</WeatherCardsRow>
              </ExpansionPanelDetailsWrapper>
            </ExpansionPanelWrapper>
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
