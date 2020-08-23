import React from "react";
import { Typography, Button } from "@material-ui/core";

import styled from "styled-components";

import landing from "./john-foust-HkJ1AOnJF8Q-unsplash.jpg";

////Styled components
const ComponentWrapper = styled.section`
  width: 100%;
  padding: 0px;
  height: 95vh;
  background-image: url(${landing});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  display:flex;
  flex-direction:column;
  align-items: center;
 justify-content:center;

`;

const HomePageName = styled(Typography)`
font-style: normal;
font-weight: 500;
color:#E8FFE8;
margin-bottom:50px;
`
const Subtitle = styled(Typography)`
width:571px;
text-align:center;
margin-bottom:46px;
`

const ButtonRow = styled.div`
display:flex;
width:671px;
justify-content:space-around;

`

const PageButton = styled(Button)`
width: 200px;
height:54px;
color: white;
border: 3px solid #17B978;
`
const Landing = () => {
  return (<ComponentWrapper>
     
    <HomePageName variant ="h2">
        GoPlantIt
    </HomePageName>

    <Subtitle id = "subtitle" color = "secondary" variant='h6'>
    Providing Australian farmers with scientific plans
to cope with extreme temperatures
    </Subtitle>

    <ButtonRow>
    <PageButton variant="outlined" color="primary">
    login
</PageButton>
<PageButton variant="contained" color="primary">
    Signup
</PageButton>
    </ButtonRow>
  </ComponentWrapper>);
};

export default Landing;
