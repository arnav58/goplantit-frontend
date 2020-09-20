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
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


import {
  Typography,
  Divider,
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


const SecondTitle = styled(Typography)`
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
`;


const ThirdTitle = styled(Typography)`
  font-weight: 300;
  // color: black;
  padding-bottom: 10px;
  margin-top: 2px; 
`;

const Arti = styled(Card)`
  display: flex;
  width: 32%;
  margin-top: 2%;
  margin-left: 65%;
  background: #ffffff;
  
`;

const ArtiSuggest = styled(Card)`
  display: flex;
  width: 30%;
  margin-top: 2%;
  margin-left: 2%;
  background: #ffffff;
  
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

const ColorBlock = styled(Typography)`
  width: 50px; 
  height: 15px; 
  border-radius: 3px;
`;


// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1Ijoic2F0eWF2aXZlayIsImEiOiJja2V4ejVkam8zNGhkMnNwbmRmN3VjYzFsIn0.x3SWl6lWW5zPYL8mmhfRWw"; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

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
  const yieldNum = object.yield.toFixed(2);
  const year = object.Year

  return `\
    Crop: ${crop} \nYield: ${yieldNum} t/ht\nYear: ${year}`;
}

function getLegend() {  
  return (

    <Arti>
      <CardContentWrapper>
        <Title variant="subtitle2'" style={{fontSize: "16px"}}>
          Legend
        </Title>
        <table color='primary'>
          <tbody>
            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(92, 192, 192)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "wheat" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Wheat
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(67,67,72'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Barley
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(144,237,125)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "canola" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Canola
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(247,163,92)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "sorghum" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Sorghum
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(128,133,233)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "cotton" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Cotton
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(241,92,128)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "rice" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Rice
              </td>
            </tr>
          </tbody>
        </table>
        
      </CardContentWrapper>
    </Arti>

  );
}

function getSuggestedCrops() {  
  return (

    <ArtiSuggest>
      <CardContentWrapper>
        
        <Title variant="subtitle2'" style={{fontSize: "16px", marginTop: '2%'}}>
          Suggested Crops
        </Title>

        <table color='primary'>
          <tbody>
            <tr>
              <td>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                VIC
              </td> 
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
              Barley
              </td>
            </tr>

            <tr>
              <td>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                QLD
              </td>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "sorghum" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Sorghum
              </td>
            </tr>

            <tr>
              <td>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                NSW
              </td>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "rice" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Rice
              </td>
            </tr>

            <tr>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                WA
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Barley
              </td>
            </tr>

            <tr>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                SA
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Barley
              </td>
            </tr>

            <tr>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                TAS
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "wheat" + ".png"} style={{width: '10%', height: '2%', marginRight: '10%'}}/>
                Wheat
              </td>
            </tr>
          </tbody>
        </table>
        
      </CardContentWrapper>
    </ArtiSuggest>

  );
}

export default function App({
  data = YieldData,
  mapStyle = 'mapbox://styles/mapbox/light-v10',
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
    getFillColor: () => [92, 192, 192, 200],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175,
    
    
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
    getFillColor: () => [67,67,72, 128],
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
    getFillColor: () => [144,237,125, 128],
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
    getFillColor: () => [247,163,92, 128],
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
    getFillColor: () => [128,133,233, 128],
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
    getFillColor: () => [241,92,128,128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
]

const DisplayVisualComponent = () => {
  return (
      <SectionWrapper>
        <SecondTitle color="secondary" variant="h4">
            Winter and Summer Crop Production Statistics
        </SecondTitle>
        <br></br>
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
              <td style={{paddingLeft: '7%'}}>
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
        <p style={{color: 'black', marginTop: '1%',}}>        
        The graphs provided below helps the farmer to mitigate risk of current yield and plan his future based on the temperature changes.
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
        The map shows the predicted yield and crop suggestion for the farmers from the selected Summer and Winter Crops in the year 2021 within every region of Australia.
      </p>
      <ComponentWrapper>
        <DeckGL initialViewState={INITIAL_VIEW_STATE} 
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
          <table style={{tableLayout: 'fixed', width: '100%'}}>
            <tbody>
              <tr>
                <td style={{width: '50%'}}>
                {getSuggestedCrops()}               
                </td>
                <td style={{width: '50%'}}>
                {getLegend()}
                </td>
              </tr>
            </tbody>
          </table>
          
          
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