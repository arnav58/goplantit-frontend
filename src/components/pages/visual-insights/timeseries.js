import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import styled from 'styled-components'
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

// import Temp from "./temps.json"
import useWindowDimensions from '../../utils/useWindowWith'

const data_url =
  "https://goplantitbackend.herokuapp.com/api/yields_data?area=1";

const crops = {
  Wheat: [0, "rgb(124, 181, 236)"],
  Barley: [1, "rgb(67, 67, 72)"],
  Canola: [2, "rgb(144, 237, 125)"],
  Sorghum: [3, "rgb(247, 163, 92)"],
  Cotton: [4, "rgb(128, 133, 233)"],
  Rice: [5, "rgb(241, 92, 128)"],
};

const Timeseriesgraph = (tempValue) => {
  const StateSelections = ["VIC", "NSW", "SA", "WA", "QLD", "TAS"];

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

  const [chartstate, setChartState] = useState("NSW");

  const {  windowWidth } = useWindowDimensions();


  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    if (!data_url) return;
    const fetchData = async () => {
      // setStatus('fetching');
      const response = await fetch(data_url);
      const data = await response.json();
      if (data !== undefined) {
        console.log(data);
        setItems(data);
      }
    };

    fetchData();
  }, [data_url]);

  if (items[chartstate] !== undefined) {
    // console .log(items[chartstate].series[0].data);
    // console.log(crops[tempValue]);
    const state = {
      chartOptions: {
        chart: {
          width: windowWidth>1000? 400:windowWidth/12*8
        },
        title: {
          text:
            "Yield of <b>" +
            tempValue +
            "</b> in <b>" +
            chartstate +
            "</b> over time",
        },
        subtitle: {
          text: "Source: Department of Agriculture, Water and the Environment",
        },
        yAxis: {
          title: {
            text: "Yield (tonnes per 1000 hectres)",
          },
        },

        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2020",
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
            pointStart: 2014,
            color: crops[tempValue][1],
          },
        },
        series: [
          {
            name: items[chartstate].series[crops[tempValue][0]].name,
            data: items[chartstate].series[crops[tempValue][0]].data,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      },
    };

    // console.log(items[chartstate].series[crops[tempValue][0]].data.reduce((result,number)=> result+number))

    const mapData = () => {
      ///map the data in series
      let states = ["VIC", "NSW", "SA", "WA", "QLD", "TAS"];
      return states.map((state) => ({
        name: state,
        y: items[state].series[crops[tempValue][0]].data.reduce(
          (result, number) => result + number
        ),
      }));
    };

    const pieOptions = {
      chart: {
        type: "pie",
        width: windowWidth>1000? 400:windowWidth/12*8
      },
      title: {
        text:
          "Average % Yield of <b>" +
          tempValue +
          "</b> in <b>Australia</b> over time",
      },
      subtitle: {
        text: "Source: Department of Agriculture, Water and the Environment",
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Average Yield (tonnes per 1000 hectres)",
        },
      },
      plotOptions: {
        series: {
          pointPadding: 0.4,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}%",
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          showInLegend: true,
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: "State",
          colorByPoint: true,
          data: mapData(),
        },
      ],
    };
    const ChartsRow = styled.div`
    display:flex;
    width:100%;
    justify-content:space-evenly;
    @media only screen and (max-width: 1000px) {
      flex-direction:column;
    }
    `

    return (
      <div>
        <Autocomplete
          classes={classes}
          id="combo-box"
          loading={!chartstate}
          value={chartstate}
          options={StateSelections}
          getOptionLabel={(option) => option}
          style={{ width: 165 }}
          onChange={(event, newValue) => {
            if (newValue) {
              setChartState(newValue);
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
        <ChartsRow>
          <HighchartsReact
            highcharts={Highcharts}
            options={state.chartOptions}
          />

          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </ChartsRow>

        <div style={{ marginTop: "5%" }} id="spacer"></div>
      </div>
    );
  }
};

const TimeSeries = (cropvalue) => {
  return <React.Fragment>{Timeseriesgraph(cropvalue.value)}</React.Fragment>;
};

export default TimeSeries;
