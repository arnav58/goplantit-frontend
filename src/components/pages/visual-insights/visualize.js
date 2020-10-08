// const MAPBOX_TOKEN = "pk.eyJ1Ijoic2F0eWF2aXZlayIsImEiOiJja2V4ejVkam8zNGhkMnNwbmRmN3VjYzFsIn0.x3SWl6lWW5zPYL8mmhfRWw"; // eslint-disable-line
import React, { Fragment } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { ColumnLayer } from "@deck.gl/layers";
import styled from "styled-components";

import YieldData from "./yield.json"
import Timeseries from "./timeseries"
import Profitseries from "./profitseries"
import serviceTemplate from "../../layout/serviceTemplate";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Typography, Box, Paper, Grid } from "@material-ui/core";
import useWindowDimensions from "../../utils/useWindowWith";
import { get } from "jquery";

const crops = ["Wheat", "Barley", "Canola", "Sorghum", "Cotton", "Rice"];


////Styled components
const ComponentWrapper = styled.section`
  position: relative;
  max-width: 100%;
  margin-top: 20px;
  height: 50vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SecondTitle = styled(Typography)`
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

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

const Arti = styled(Card)`
  display: flex;
  width: 42%;
  margin-top: 2%;
  margin-left: 56%;
  background: #ffffff;
`;

const ArtiSuggest = styled(Card)`
  display: flex;
  width: 20%;
  margin-top: 2%;
  margin-left: 2%;
  background: #ffffff;
  @media only screen and (max-width: 1000px) {
    width: 30%;
  }
  @media only screen and (max-width: 800px) {
    width: 60%;
  }
  @media only screen and (max-width: 650px) {
    width: 70%;
  }
`;

const Title = styled(Typography)`
  display: flex;
  margin-bottom: 5px;
  font-weight: 500;
  // height: 50px;
  color: black;
`;

const CardContentWrapper = styled(CardContent)`
  width: 100%;
`;

// const ColorBlock = styled(Typography)`
//   width: 50px;
//   height: 15px;
//   border-radius: 3px;
// `;

const TextRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.width || "100%"};
  justify-content: ${(props) => props.space || "space-between"};
`;

const SelectItemWrapper = styled.div`
  width: ${(props) => props.width || "70%"};
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DisplayLegendsRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right:10px;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2F0eWF2aXZlayIsImEiOiJja2V4ejVkam8zNGhkMnNwbmRmN3VjYzFsIn0.x3SWl6lWW5zPYL8mmhfRWw"; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const INITIAL_VIEW_STATE = {
  longitude: 133.16,
  latitude: -26.26,
  zoom: 3.0,
  maxZoom: 16,
  pitch: 50,
  // bearing: 0
};

function getTooltip({ object }) {
  if (!object) {
    return null;
  }
  const crop = object.Crop;
  const yieldNum = object.yield.toFixed(2);
  const year = object.Year;

  return `\
    Crop: ${crop} \nYield: ${yieldNum} t/ht\nYear: ${year}`;
}

function getLegend() {
  const cropLegendMap = [
    { name: "Wheat", color: "rgb(92, 192, 192)" },
    { name: "Barley", color: "rgb(67,67,72" },
    { name: "Canola", color: "rgb(144, 237, 125)" },
    { name: "Sorghum", color: "rgb(247, 163, 92" },
    { name: "Cotton", color: "rgb(128, 133, 233)" },
    { name: "Rice", color: "rgb(241, 92, 128)" },
  ];
  const DisplayLegend = () => {
    return cropLegendMap.map((item) => (
      <SelectItemWrapper width="100%" style={{ alignItems: "center" }}>
        <div
          style={{
            backgroundColor: item.color,
            width: "50px",
            height: "15px",
            borderRadius: "3px",
          }}
        />
        <Typography variant="body1" color="secondary" style={{ width: "55%" }}>
          <img
            src={process.env.PUBLIC_URL + item.name.toLowerCase() + ".png"}
            style={{ width: "10%", height: "25px", marginRight: "10%" }}
            alt="Wheat"
          />
          {item.name}
        </Typography>
      </SelectItemWrapper>
    ));
  };

  return (
    <Arti>
      <CardContentWrapper>
        <Title variant="subtitle2'" style={{ fontSize: "16px" }}>
          Legend
        </Title>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {DisplayLegend()}
        </div>
      </CardContentWrapper>
    </Arti>
  );
}

function getSuggestedCrops() {
  const displayCropRow = (state, crop) => (
    <SelectItemWrapper
      style={{
        color: "black",
      }}
      width="100%"
    >
      <Typography variant="body1" style={{ width: "20%" }} color="primary">
        {state}
      </Typography>
      <Typography variant="body1" style={{ width: "60%" }} color="secondary">
        <img
          src={process.env.PUBLIC_URL + crop.toLowerCase() + ".png"}
          style={{ width: "10%", height: "20px", marginRight: "10%" }}
          alt={crop}
        />
        {crop}
      </Typography>
    </SelectItemWrapper>
  );

  const cropStateRecommendation = [
    {
      state: "VIC",
      crop: "Barley",
    },
    {
      state: "QLD",
      crop: "Sorghum",
    },
    {
      state: "NSW",
      crop: "Rice",
    },
    {
      state: "WA",
      crop: "Barley",
    },
    {
      state: "SA",
      crop: "Barley",
    },
    {
      state: "TAS",
      crop: "Wheat",
    },
  ];

  const DisplayCropSuggestion = () => {
    return cropStateRecommendation.map((item) =>
      displayCropRow(item.state, item.crop)
    );
  };

  return (
    <ArtiSuggest>
      <CardContentWrapper>
        <Title
          variant="subtitle2'"
          style={{ fontSize: "16px", marginTop: "2%" }}
        >
          Suggested Crops
        </Title>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {DisplayCropSuggestion()}
        </div>
      </CardContentWrapper>
    </ArtiSuggest>
  );
}

export default function App({
  data = YieldData,
  mapStyle = "mapbox://styles/mapbox/light-v10",
}) {
  const layers = [
    new ColumnLayer({
      id: "column-layer1",
      data: data.filter((c) => c.Crop === "Wheat"),
      diskResolution: 12,
      radius: 50000,
      extruded: true,
      pickable: true,
      elevationScale: 500,
      getPosition: (d) => [d.COORDINATES[0] - 3.0, d.COORDINATES[1]],
      getFillColor: () => [92, 192, 192, 200],
      getLineColor: [0, 0, 0],
      getElevation: (d) => d.yield * 175,
    }),
    new ColumnLayer({
      id: "column-layer2",
      data: data.filter((c) => c.Crop === "Barley"),
      diskResolution: 12,
      radius: 50000,
      extruded: true,
      pickable: true,
      elevationScale: 500,
      getPosition: (d) => [d.COORDINATES[0] - 1.5, d.COORDINATES[1]],
      getFillColor: () => [67, 67, 72, 128],
      getLineColor: [0, 0, 0],
      getElevation: (d) => d.yield * 175,
    }),
    new ColumnLayer({
      id: "column-layer3",
      data: data.filter((c) => c.Crop === "Canola"),
      diskResolution: 12,
      radius: 50000,
      extruded: true,
      pickable: true,
      elevationScale: 500,
      getPosition: (d) => [d.COORDINATES[0], d.COORDINATES[1]],
      getFillColor: () => [144, 237, 125, 128],
      getLineColor: [0, 0, 0],
      getElevation: (d) => d.yield * 175,
    }),
    new ColumnLayer({
      id: "column-layer4",
      data: data.filter((c) => c.Crop === "Sorghum"),
      diskResolution: 12,
      radius: 50000,
      extruded: true,
      pickable: true,
      elevationScale: 500,
      getPosition: (d) => [d.COORDINATES[0] + 1.5, d.COORDINATES[1]],
      getFillColor: () => [247, 163, 92, 128],
      getLineColor: [0, 0, 0],
      getElevation: (d) => d.yield * 175,
    }),
    new ColumnLayer({
      id: "column-layer5",
      data: data.filter((c) => c.Crop === "Cotton"),
      diskResolution: 12,
      radius: 50000,
      extruded: true,
      pickable: true,
      elevationScale: 500,
      getPosition: (d) => [d.COORDINATES[0] + 3.0, d.COORDINATES[1]],
      getFillColor: () => [128, 133, 233, 128],
      getLineColor: [0, 0, 0],
      getElevation: (d) => d.yield * 175,
    }),
    new ColumnLayer({
      id: "column-layer6",
      data: data.filter((c) => c.Crop === "Rice"),
      diskResolution: 12,
      radius: 50000,
      extruded: true,
      pickable: true,
      elevationScale: 500,
      getPosition: (d) => [d.COORDINATES[0] + 4.5, d.COORDINATES[1]],
      getFillColor: () => [241, 92, 128, 128],
      getLineColor: [0, 0, 0],
      getElevation: (d) => d.yield * 175,
    }),
  ];

  const [cropvalue, setCropValue] = React.useState("Wheat");
  const { windowWidth } = useWindowDimensions();

  const handleCropChange = (event) => {
    setCropValue(event.target.value);
  };

  const DisplayCropTypes = () => {
    //display all the selection radio buttons
    const DisplayCropSelections = () => {
      return crops.map((crop) => (
        <SelectItemWrapper>
          <FormControlLabel
            value={crop}
            control={<Radio style={{ color: "#A64942" }} />}
            label={
              <Typography variant="subtitle1" color="secondary">
                {crop}
              </Typography>
            }
          />

          <img
            src={process.env.PUBLIC_URL + crop.toLowerCase() + ".png"}
            style={{ width: "20px", height: "75px", marginRight: "2%" }}
            alt="Wheat"
          />
        </SelectItemWrapper>
      ));
    };

    return (
      <PaperGridWrapper item sm={3} xs={12}>
        <PaperWrapper
          style={{
            backgroundColor: "rgb(255, 250, 250)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
          }}
        >
          <Typography variant="h4" fontWeight={500} color="secondary">
            <Box fontWeight="fontWeightMedium" m={1}>
              Select Crop
            </Box>
          </Typography>
          {/* <InformationWrapper> */}
          <RadioGroup
            aria-label="Select Crop"
            name="crop"
            value={cropvalue}
            onChange={handleCropChange}
          >
            {DisplayCropSelections()}
          </RadioGroup>
          {/* </InformationWrapper> */}
        </PaperWrapper>
      </PaperGridWrapper>
    );
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };
  // const DisplayTextBlocks = () => {};
  const DisplayVisualComponent = () => {
    return (
      <ComponentGrid container spacing={4}>
        {DisplayCropTypes()}

        <PaperGridWrapper item sm={9} xs={12}>
          <PaperWrapper>
          <SecondTitle color="secondary" variant="h4">
            Winter and Summer Crop Statistics
          </SecondTitle>
          <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          style={{color: '#A64942'}} 
          variant="fullWidth"
          aria-label="Insights graphs"
        >
          <Tab label="Yields" {...a11yProps(0)}/>
          <Tab label="Profits" {...a11yProps(1)} />
          <Tab label="Recommendations" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        // onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Timeseries value={cropvalue}/>        
        <p style={{color: 'black', marginBottom: '1%'}}>
        According to Bureau of Meteorology, around 22 million hectares are planted annually to commercial grain crops across Australia. 
        Climate/weather patterns effectively split Australia into two major grain cropping regions — northern and southern — and two crop growing periods — winter and summer.
        
        </p>

        <table>
          <tbody>
            <tr>
              <td>
                <p style={{color: 'black'}}> 
                <b>The northern region</b> takes in central and southern Qld through to northern NSW down as far as the Dubbo region.
                Most extreme weather in this region predicted over the summer months, allowing for dryland summer crop production.
                <br></br><br></br>
                Winter crops - Wheat, barley, canola.
                <br></br>
                Summer crops - Sorghum, cotton and peanuts.
                </p>
              </td>
              <td>
                <p style={{color: 'black'}}>
                <b>The southern region</b> stretches from central NSW (south of Dubbo) through to Victoria, Tasmania and South Australia and the southwest corner of Western Australia. 
                The weather pattern ranges from uniform in central NSW through to winter-dominant in Victoria, Tasmania, SA and WA.
                <br></br><br></br>
                Winter crops - Wheat, barley, canola.
                <br></br>
                Summer crops - Rice.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Profitseries value={cropvalue}/>  
        <p style={{color: "black"}}></p>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <ComponentWrapper>
          <DeckGL initialViewState={INITIAL_VIEW_STATE} 
                controller={true} 
                layers={layers} 
                getTooltip={getTooltip}
                effects={[lightingEffect]} 
                >
                  According to Bureau of Meteorology, around 22 million hectares
                  are planted annually to commercial grain crops across
                  Australia. Climate/weather patterns effectively split
                  Australia into two major grain cropping regions — northern and
                  southern — and two crop growing periods — winter and summer.
                </Typography>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextRow>
                    <Typography
                      variant="body1"
                      style={{
                        color: "black",
                        width: "45%",
                        marginRight: "5px",
                      }}
                    >
                      <b>The northern region</b> takes in central and southern
                      Qld through to northern NSW down as far as the Dubbo
                      region. Most extreme weather in this region predicted over
                      the summer months, allowing for dryland summer crop
                      production.
                      <br></br>
                      <br></br>
                      Winter crops - Wheat, barley, canola.
                      <br></br>
                      Summer crops - Sorghum, cotton and peanuts.
                    </Typography>

                    <Typography
                      variant="body1"
                      style={{ color: "black", width: "45%" }}
                    >
                      <b>The southern region</b> stretches from central NSW
                      (south of Dubbo) through to Victoria, Tasmania and South
                      Australia and the southwest corner of Western Australia.
                      The weather pattern ranges from uniform in central NSW
                      through to winter-dominant in Victoria, Tasmania, SA and
                      WA.
                      <br></br>
                      <br></br>
                      Winter crops - Wheat, barley, canola.
                      <br></br>
                      Summer crops - Rice.
                    </Typography>
                  </TextRow>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <p style={{ color: "black" }}>Profit Insights goes here!</p>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <ComponentWrapper>
                  {/* display the map with the recommendation when the window is wider than 800,
                  else only display the recommendations */}
                  {windowWidth > 800 ? (
                    <DeckGL
                      initialViewState={INITIAL_VIEW_STATE}
                      controller={true}
                      layers={layers}
                      getTooltip={getTooltip}
                      effects={[lightingEffect]}
                    >
                      <StaticMap
                        reuseMaps
                        mapStyle={mapStyle}
                        preventStyleDiffing={true}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                      />

                      <DisplayLegendsRow>
                        {getSuggestedCrops()}
                        {getLegend()}
                      </DisplayLegendsRow>
                      {/* <table style={{ tableLayout:windowWidth > 1000 && "fixed", width: "100%" }}>
                      <tbody>
                        <tr>
                          <td style={{ width: windowWidth > 1000 ?"50%":'100%' }}>
                            {getSuggestedCrops()}
                          </td>
                          <td style={{ width: windowWidth > 1000 ?"50%":'100%' }}> {getSuggestedCrops()}</td>
                        </tr>
                      </tbody>
                    </table> */}
                    </DeckGL>
                  ) : (
                    <DisplayLegendsRow>
                      {getSuggestedCrops()}
                      {getLegend()}
                    </DisplayLegendsRow>
                  )}
                </ComponentWrapper>
                {windowWidth > 800 && (
                  <p style={{ color: "black", marginTop: "5px" }}>
                    The map shows the predicted yield and crop suggestion for
                    the farmers from the selected Summer and Winter Crops in the
                    year <b>2021</b> within every region of Australia.
                  </p>
                )}
              </TabPanel>
            </SwipeableViews>
          </PaperWrapper>
        </PaperGridWrapper>
      </ComponentGrid>
    );
  };

  return (
    <Fragment>
      {serviceTemplate({
        title: "Visual Insights",
        childComponent: DisplayVisualComponent(),
        custom: true,
      })}
    </Fragment>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}
