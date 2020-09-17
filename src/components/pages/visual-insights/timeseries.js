import React, { useState, useEffect } from "react";
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import {
    TextField,
  } from "@material-ui/core";

import Temp from "./temps.json"

const data_url = "https://goplantitbackend.herokuapp.com/api/yields_data?area=50";


  
const Timeseriesgraph = () => {

    const StateSelections = [
        { name: "VIC" },
        { name: "NSW" },
        { name: "SA" },
        { name: "WA" },
        { name: "QLD" },
        { name: "TAS" },
      ];
    
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

  const [chartstate, setChartState] = useState(["VIC"]);


  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(data_url)
      .then(res => res.json())
      .then(
        (result) => {
            if(result !== undefined){
                console.log(result)
                setItems(result);
            }          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

//   console.log(chartstate);

  if(items[chartstate] !== undefined){
        // console.log(items[chartstate].series[0].data);
        
        const state = {
        chartOptions: {
            title: {
                text: 'Yield of selected crops in '+chartstate+' over time'
            },
            subtitle: {
                text: 'Source: Department of Agriculture, Water and the Environment'
            },
            yAxis: {
                title: {
                    text: 'Yield (tonnes per 1000 hectre)'
                }
            },
        
            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2020'
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
                    pointStart: 2014
                }
            },
          series: [{
              name: items[chartstate].series[0].name,
              data: items[chartstate].series[0].data,
              tooltip: {
                  valueDecimals: 2
            }
          },
          {
            name: items[chartstate].series[1].name,
            data: items[chartstate].series[1].data,
            tooltip: {
                  valueDecimals: 2
            }
          },
          {
            name: items[chartstate].series[2].name,
            data: items[chartstate].series[2].data,
            tooltip: {
                  valueDecimals: 2
            }
          },
          {
            name: items[chartstate].series[3].name,
            data: items[chartstate].series[3].data,
            tooltip: {
                  valueDecimals: 2
            }
          },
          {
            name: items[chartstate].series[4].name,
            data: items[chartstate].series[4].data,
            tooltip: {
                  valueDecimals: 2
            }
          },
          {
            name: items[chartstate].series[5].name,
            data: items[chartstate].series[5].data,
            tooltip: {
                  valueDecimals: 2
            }
          }
          ],
        },
      }

    //   console.log(Temp.VIC.Temperature)

      const extemp = {
        chartOptions: {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Temperature Change in '+chartstate+' over time'
            },
            subtitle: {
                text: 'Source: Bureau of Meteorology'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Temperature (in Farenheit)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    // threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Temperature',
                data: Temp[chartstate].Temperature
            }]
        },
      }

      return (
        <div>
            <Autocomplete
          classes={classes}
          id="combo-box-demo"
          loading={!chartstate}
          value={{ name: chartstate }}
          options={StateSelections}
          getOptionLabel={(option) => option.name}
          style={{ width: 165 }}
          onChange={(event, newValue) => {
            if (newValue) {
                setChartState(newValue.name);
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
        <br></br>

        <table>
            <tbody>

              <tr>

                <td style={{width:'50%'}}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={state.chartOptions}
                />
                </td>
                <td style={{width:'50%'}}>

                <HighchartsReact
                  highcharts={Highcharts}
                  options={extemp.chartOptions}
                />

                </td>

              </tr>

            </tbody>

        </table>
        
        <div style={{marginTop: '5%'}}></div>
        
      </div> 
      );

    };
  }


      
    
    const TimeSeries = () => {
        return <React.Fragment>{Timeseriesgraph()}</React.Fragment>;
      };
      
    export default TimeSeries;