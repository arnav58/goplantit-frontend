//React imports
import React, { Fragment, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
//style imports
import { Typography, Button, Paper } from "@material-ui/core";
import styled from "styled-components";
//image imports
import landing from "./john-foust-HkJ1AOnJF8Q-unsplash.jpg";
//Icons imports
import { NotificationImportant, NotListedLocation } from "@material-ui/icons";
////Styled components
const ComponentWrapper = styled.section`
  max-width: 100vw;
  padding: 0px;
  height: 95vh;
  background-image: url(${landing});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomePageName = styled(Typography)`
  font-style: normal;
  font-weight: 500;
  color: #e8ffe8;
  margin-bottom: 50px;
`;
const Subtitle = styled(Typography)`
  width: 571px;
  text-align: center;
  margin-bottom: 46px;
  color: white;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 671px;
  justify-content: space-around;
`;

const PageButton = styled(Button)`
  width: 200px;
  height: 54px;
  color: white;
  border: 3px solid #17b978;
`;

const ServiceSectionWrapper = styled.section`
  height: 65vh;
  max-width: 100vw;
  position: relative;
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-item: top;
  z-index: 9;
  position: absolute;
  top: 120px;
  width: 100%;


`;

const ServiceCard = styled(Paper)`
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  background: white;
  justify-content: space-around;
  align-items: center;
`;

const TopBrownBar = styled.div`
  width: 142px;
  height: 21px;
  background: #A64942;
  position: absolute;
  z-index: 1;
  top: 0px;
  left:50px;
`;

const TopRightBrownBar = styled.div`
  width: 32px;
  height: 11px;
  background: #A64942;
  position: absolute;
  z-index: 1;
  top: 50px;
  right:40px;
`;

const LeftGreenBar = styled.div`
  width: 932px;
  height: 121px;
  background: #17b978;
  position: absolute;
  z-index: 1;
  top: 60px;
`;
const RightGreenBar = styled.div`
  width: 932px;
  height: 121px;
  background: #17b978;
  position: absolute;
  z-index: 1;
  top: 320px;
  right: 0;
`;

const ServiceCardInnerWrapper=styled.div`
  margin:10px;
  width: 250px;
  height: 200px;
  display: flex;
  flex-direction: column;
  background: white;
  align-items: center;
`

//useMemo to improve loading speed (Just for my personal practice)

const Landing = () => {
  //constant card values
  const cards = useMemo(
    () => [
      {
        icon: "notification",
        title: "Extreme Weather Alert",
        subtitle:
          "Help you to plan early when the extreme weather may damage your crops.",
      },
      {
        icon: "location",
        title: "Know the effects",
        subtitle: "Understand the effects of exterme temperatures to the crops.",
      },
    ],
    []
  );

  //scroll to services section smoothly
  const scrollToRef = (ref) =>
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  // General scroll to element function
  const serviceRef = useRef(null);
  const executeScroll = () => scrollToRef(serviceRef);

  //stupid way of display icons
  const RenderIcon = (icon) => {
    let theIcon;
    let iconStyle ={width:"45.88px", height:"45.88px", marginBottom:"20px"}
    switch (icon) {
      case "notification":
        theIcon = <NotificationImportant color="secondary" style ={iconStyle}/>;
        break;
      case "location":
        theIcon = <NotListedLocation color="secondary" style = {iconStyle}/>;
        break;
      default:
        throw new Error("No icon found with that name");
    }

    return theIcon;
  };

  //Display service card:
  const DisplayServiceCards = () => cards.map(card=>{
      return (
        <ServiceCard>
          <ServiceCardInnerWrapper>
          {RenderIcon(card.icon)}
          <Typography color="secondary" variant="h6" align='center' style={{marginBottom:"20px" }}>
            {card.title}
          </Typography>
          <Typography color="secondary" variant="subtitle" align= 'center' style = {{width:"200px"}}>
            {card.subtitle}
          </Typography>
        </ServiceCardInnerWrapper>
        </ServiceCard>
      );
    })
    

  return (
    <Fragment>
      <ComponentWrapper>
        <HomePageName variant="h2">GoPlantIt</HomePageName>

        <Subtitle id="subtitle" variant="h6">
          Providing Australian farmers with scientific plans to cope with
          extreme temperatures
        </Subtitle>

        <ButtonRow>
          <PageButton
            variant="outlined"
            color="primary"
            component={Link}
            to="/login"
          >
            dashboard
          </PageButton>

          <PageButton
            variant="contained"
            color="primary"
            onClick={executeScroll}
          >
            view our services
          </PageButton>
        </ButtonRow>
      </ComponentWrapper>
      {/* the services section after the landing page */}
      <ServiceSectionWrapper ref={serviceRef}>
        <TopBrownBar/>
        <TopRightBrownBar/>
        <LeftGreenBar />
        <RightGreenBar />
        <CardsRow>{DisplayServiceCards()}</CardsRow>
      </ServiceSectionWrapper>
    </Fragment>
  );
};

export default Landing;
