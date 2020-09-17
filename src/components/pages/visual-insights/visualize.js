// const MAPBOX_TOKEN = "pk.eyJ1Ijoic2F0eWF2aXZlayIsImEiOiJja2V4ejVkam8zNGhkMnNwbmRmN3VjYzFsIn0.x3SWl6lWW5zPYL8mmhfRWw"; // eslint-disable-line
import React, {Fragment} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ColumnLayer} from '@deck.gl/layers';
import styled from "styled-components";

import YieldData from "./yield.json"
import Timeseries from "./timeseries"
import serviceTemplate from "../../layout/serviceTemplate";

import {
  Container,
  Typography,
  Card,
  Divider,
  CardContent,
  CardMedia,
} from "@material-ui/core";


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

const SectionWrapper = styled.section`
  height: 100%;
  max-width: 100%;
  position: relative;
  background: #fafaf6;
  z-index: 1;
  margin: 20px;
  // padding: 50px;
`;

const DividerWrapper = styled(Divider)`
  background-color: #e2f3f5;
  margin-top: 25px;
  width: 100%;
`;

const SecondTitle = styled(Typography)`
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
`;

const TextContent = styled(Typography)`
  font-weight: 400;
  // color: black;
  padding-bottom: 10px;
  margin: 0 auto;
  margin-top: 25px; 
  width: 90%; 
  text-justify: "inter-word";
`;

const ThirdTitle = styled(Typography)`
  font-weight: 400;
  // color: black;
  padding-bottom: 10px;
  margin-top: 25px; 
`;

// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1Ijoic2F0eWF2aXZlayIsImEiOiJja2V4ejVkam8zNGhkMnNwbmRmN3VjYzFsIn0.x3SWl6lWW5zPYL8mmhfRWw"; // eslint-disable-line


const INITIAL_VIEW_STATE = {
  longitude: 133.16,
  latitude: -26.26,
  zoom: 3.2,
  maxZoom: 16,
  pitch: 50,
  // bearing: 0
};

function getTooltip({object}) {
  if (!object) {
    return null;
  }
  const crop = object.Crop;
  const yieldNum = object.yield;
  const year = object.Year

  return `\
    Crop: ${crop} \nYield: ${yieldNum} t/ht\nYear: ${year}`;
}

export default function App({
  data = YieldData,
  mapStyle = 'mapbox://styles/mapbox/dark-v10'
}) {

  const layers = [
    
    new ColumnLayer({
    id: 'column-layer1',
    data: data.filter(c => c.Crop === "Wheat"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]-3.0, d.COORDINATES[1]],
    getFillColor: () => [255, 0, 0, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
    
  }),
  new ColumnLayer({
    id: 'column-layer2',
    data: data.filter(c => c.Crop === "Barley"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]-1.5, d.COORDINATES[1]],
    getFillColor: () => [0, 255, 0, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer3',
    data: data.filter(c => c.Crop === "Canola"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0], d.COORDINATES[1]],
    getFillColor: () => [0, 0, 255, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer4',
    data: data.filter(c => c.Crop === "Sorghum"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]+1.5, d.COORDINATES[1]],
    getFillColor: () => [255, 255, 0, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer5',
    data: data.filter(c => c.Crop === "Cotton"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]+3.0, d.COORDINATES[1]],
    getFillColor: () => [0, 255, 255, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer6',
    data: data.filter(c => c.Crop === "Rice"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]+4.5, d.COORDINATES[1]],
    getFillColor: () => [255, 0, 255, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  })
]

const DisplayVisualComponent = () => {
  return (
      <SectionWrapper>
        <SecondTitle color="secondary" variant="h4">
            Winter and Summer Crop Production Statistics
        </SecondTitle>
        <br></br>
        <p style={{color: 'black'}}>
        Around 22 million hectares are planted annually to commercial grain crops across Australia. 
        Climate/weather patterns effectively split Australia into two major grain cropping regions — northern and southern — and two crop growing periods — winter and summer.
        Over the past decade, due to extreme temperatures the crop yield has been one of the major targeted and invested area to tackle Australia’s challenging environment.
        Since 1996 — notwithstanding the devastating droughts of 2002 and 2006 — the nation has harvested an annual average grain production in excess of 35 million tonnes 
        that is worth more than $7.9 billion each year.
        </p>
        <ThirdTitle color="secondary" variant="h5">Northern cropping region</ThirdTitle>
        <p style={{color: 'black'}}> 
        The northern region takes in central and southern Qld through to northern NSW down as far as the Dubbo region.
        Most extreme weather in this northern region predicted be over the summer months, allowing for dryland summer crop production.
        <br></br><br></br>
        Winter crops - Wheat, barley, canola.
        <br></br>
        Summer crops - Sorghum, cotton and peanuts.
        </p>
        <ThirdTitle color="secondary" variant="h5">Southern  cropping region</ThirdTitle>
        <p style={{color: 'black'}}>
        The southern region stretches from central NSW (south of Dubbo) through to Victoria, Tasmania and South Australia and the southwest corner of Western Australia. 
        The weather pattern ranges from uniform in central NSW through to winter-dominant in Victoria, Tasmania, SA and WA.
        <br></br><br></br>
        Winter crops - Wheat, barley, canola.
        <br></br>
        Summer crops - Rice.
        </p>

        <p style={{color: 'black'}}>
        According to Bureau of Meteorology, Australian farmers are often said to operate in one of the riskiest environments in the world. 
        While farming businesses face many sources of risk, the variability of Australian weather and climate is one of the most difficult risks to manage. 
        Indeed most activities in Australian agriculture have at least some climate-related risk component.
        <br></br><br></br>
        The graphs provided below helps the farmer to mitigate rish of current yield and plan his future based on the temperature changes.
        </p>
      
        <SecondTitle color="secondary" variant="h4">
            Graphical Overview
        </SecondTitle>
        <br></br>
      <Timeseries/>     

      <SecondTitle color="secondary" variant="h4">
            Geographical Yield Predictions
      </SecondTitle>
      <br></br>
      <p style={{color: 'black'}}>
      The trend maps are a useful way to visualize how climate extremes were predicted in different regions of Australia over time. 
      Trend values have been determined by Bureau of Meteorology for providing insights to the farmers in the time of extreme climate changes. 
      <br></br><br></br>
      The map shows the predicted yield for the selected Summer and Winter Crops in the year 2021 within every region of Australia.
      </p>
      <ComponentWrapper>
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers} getTooltip={getTooltip} >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
        </ComponentWrapper>
    
      </SectionWrapper>
      
  );
};


  return (
    <Fragment>
      
      {serviceTemplate({
                title: "Visual Insights",
                childComponent: DisplayVisualComponent(),
      })}

    </Fragment>

  );
}

export function renderToDOM(container) {
  render(<App />, container);
}