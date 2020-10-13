import React, { useState, useEffect } from "react";
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import {
    Typography
  } from "@material-ui/core";


const data_url = "https://goplantitbackend.herokuapp.com/api/profits_data?area=1";

const crops = {
  "Wheat": [0, "rgb(124, 181, 236)"],
  "Barley": [1, "rgb(67, 67, 72)"],
  "Canola": [2, "rgb(144, 237, 125)"],
  "Sorghum": [3, "rgb(247, 163, 92)"],
  "Cotton": [4, "rgb(128, 133, 233)"],
  "Rice": [5, "rgb(241, 92, 128)"]
};

const NoDdataWrapper = styled.div`
  height: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
  
const Profitseriesgraph = (tempValue) => {

    
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
    
  const classes = useStyles();

  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    if (!data_url) return;
    const fetchData = async () => {
        // setStatus('fetching');
        const response = await fetch(data_url);
        const data = await response.json();
        if(data !== undefined){
            console.log(data)
            setItems(data);
        }
    };

    fetchData();
}, [data_url]);


    if(tempValue === "Cotton" || tempValue === "Rice"){
       
            return (
            <NoDdataWrapper>
                <Typography
                  variant="h4"
                  color="secondary"
                  fontWeight="fontWeightMedium"
                >
                  NO DATA
                </Typography>
                </NoDdataWrapper>
            );
  

    };
    

  if(items[tempValue] !== undefined){
        
        const state = {
        chartOptions: {
            title: {
                text: 'Profit of <b>'+tempValue+'</b> over time'
            },
            // subtitle: {
            //     text: 'Source: Department of Agriculture, Water and the Environment'
            // },
            yAxis: {
                title: {
                    text: 'Profit (dollars per tonnes)'
                }
            },
        
            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 1995 to 2020',
                    layout: 'vertical',
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    },
                    pointStart: 1995,
                    color: crops[tempValue][1],
                }
            },
            series: [           
              {
                name: tempValue,
                data: items[tempValue].values,
                tooltip: {
                    valueDecimals: 2
              }
            }
            ],
        },
      };


    
    
    

      return(
        <div>
        <br></br>
        <table>
            <tbody>
              <tr>
                <td style={{width: "1000px"}}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={state.chartOptions}   
                           
                />
                
                </td>
              </tr>
              <br></br><br></br>
            </tbody>
        </table>
        <div style={{marginTop: '5%'}}></div>
        </div> 
      );

    };
  }


      
    
    const ProfitSeries = (cropvalue) => {
        return <React.Fragment>{Profitseriesgraph(cropvalue.value)}</React.Fragment>;
      };
      
    export default ProfitSeries;