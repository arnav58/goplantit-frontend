import React, { useState, useEffect, Fragment } from "react";

///ui components import
import { Paper, Grid, Typography,Box } from "@material-ui/core";
import styled from "styled-components";
import serviceTemplate from "../../layout/serviceTemplate";
//////images import
import cold from "./cold.jpg";
import hot from "./hot.jpg"
import sunny from "./sunny.jpg"
/// http helpers import

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

const backgroundWeather = (weather) => {
  const weatherImageMap = {
    cold: cold,
    hot:hot,
    sunny:sunny
  };
  return weatherImageMap[weather];
};

const Dashboard = () => {
  const DisplayWeatherToday = () => {
      let backgroundUrl = backgroundWeather('sunny')
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
          <Typography variant="h4"fontWeight={500}>
              <Box fontWeight="fontWeightMedium" m={1}>
            Weather today
            </Box>
          </Typography>
        </PaperWrapper>
      </PaperGridWrapper>
    );
  };

  const DisplayDashboard = () => {
    return (
      <ComponentGrid container spacing={4}>
        {DisplayWeatherToday()}

        <PaperGridWrapper item sm={9} xs={12}>
          <PaperWrapper>
            <Typography>Insights</Typography>
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
