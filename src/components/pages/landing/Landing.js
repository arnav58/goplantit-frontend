//React imports
import React, { Fragment, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
//style imports
import { Typography, Button, Paper, Link as UiLink } from "@material-ui/core";
import styled from "styled-components";
//special effects
import ReactTypingEffect from "react-typing-effect";
import FadeIn from "react-fade-in";
import Fade from "react-reveal/Fade";
//image imports
import landing from "./max-bottinger-gRT-IRygEhg-unsplash.jpg";
import scroll from "./scroll.gif";
//Icons imports
import { NotificationImportant, NotListedLocation, Dashboard, BarChart } from "@material-ui/icons";

////Styled components
const serviceCardHeight = 220
const negativeMargin = 70

const ComponentWrapper = styled.section`
  position: relative;
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

const LayerWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const HomePageName = styled(Typography)`
  font-style: normal;
  font-weight: 500;
  color: #e8ffe8;
  margin-bottom: 50px;
  z-index: 100;
`;
const Subtitle = styled(Typography)`
  width: 571px;
  text-align: center;
  margin-bottom: 46px;
  color: white;
  z-index: 100;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 671px;
  justify-content: space-around;
  z-index: 100;
  @media only screen and (max-width: 671px) {
    width:600px;

  };
`;

const FadeInWrapper = styled(FadeIn)`
  z-index: 100;
`;

const PageButton = styled(Button)`
  width: 200px;
  height: 54px;
  color: white;
  border: 3px solid #17b978;
  z-index: 100;
`;

const ServiceSectionWrapper = styled.section`
  max-width: 100vw;
  display:flex;
  flex-direction:column;
  background: #fafaf6;
  padding-top:100px;
  padding-bottom:50px; 
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-item: top;
  width: 100%;
  flex-wrap:wrap;
  z-index:10;
`;

const ServiceCardContainer = styled.div`
  flex 0 50%;
`;

const ServiceCard = styled(Paper)`
  opacity: 1;
  transition: opacity 300ms ease-in;
  width: 400px;
  height: ${serviceCardHeight}px;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  background: white;
  justify-content: space-around;
  align-items: center;
  
`;


const ServiceCardInnerWrapper = styled.div`
  margin: 10px;
  height: 100%;
  width: 100%;
  background: white;
`;

const CardIconContainer = styled.div`
  display: flex;
  width: 20%;
  height 100%;
  align-items: center;
  float: left;
`;

const CardContentContainer = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  
`;

const LeftGreenBar = styled.div`
  width: 932px;
  height: 121px;
  background: #17b978;
  z-index: 1;

  margin-bottom:-${negativeMargin}px;
  @media only screen and (max-width: 930px) {
  width:75%;
};


`;
const RightGreenBarContainer = styled.div`
display:flex;
width:100%;
justify-content:flex-end;
margin-top:-${negativeMargin}px;



`
const RightGreenBar = styled.div`
  height: 121px;
  width:932px;
  background: #17b978;
  align-self:flex-end;
  @media only screen and (max-width: 930px) {
    width:75%;
  };


`;

const MouseGraphicWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 40px;
  border-radius: 16px;
  height: 50px;
  width: 30px;
  margin-left: -17px;
  display: block;
  z-index: 10;
`;

//////////the main rendering components

const Landing = () => {
  //constant card values
  //useMemo to improve loading speed (Just for my personal practice)
  const cards = useMemo(
    () => [
      // {
      //   icon: "dashboard",
      //   title: "Personalized Dashboard",
      //   subtitle:
      //     "Help you to plan early when the extreme weather may damage your crops.",
      //   link: "/alerts",
      // },
      // {
      //   icon: "insights",
      //   title: "Yields and Profits Insights",
      //   subtitle:
      //     "Help you to plan early when the extreme weather may damage your crops.",
      //   link: "/alerts",
      // },
      {
        icon: "notification",
        title: "Extreme Weather Alerts",
        subtitle:
          "Help you to plan early when the extreme weather may damage your crops.",
        link: "/alerts",
      },
      {
        icon: "location",
        title: "Know the effects",
        subtitle:
          "Understand the effects of extreme temperatures to the crops.",
        link: "/effects",
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
    let iconStyle = {
      width: "45.88px",
      height: "45.88px",
      marginBottom: "20px",
      margin: "auto",
      display: "block"
    };
    switch (icon) {
      case "notification":
        theIcon = <NotificationImportant color="#18b979" style={iconStyle} />;
        break;
      case "location":
        theIcon = <NotListedLocation color="#18b979" style={iconStyle} />;
        break;
      case "dashboard":
        theIcon = <Dashboard color="#18b979" style={iconStyle} />;
        break;
      case "insights":
        theIcon = <BarChart color="#18b979" style={iconStyle} />;
        break;
      default:
        throw new Error("No icon found with that name");
    }

    return theIcon;
  };

  //Display service card:
  const DisplayServiceCards = () =>
    cards.map((card) => {
      return (
        <ServiceCardContainer>
          <ServiceCard>
            <ServiceCardInnerWrapper>
              <UiLink underline="none" href={card.link}>
                <CardIconContainer>{RenderIcon(card.icon)}</CardIconContainer>
                <CardContentContainer>
                  <Typography
                    color="secondary"
                    variant="h6"
                    align="center"
                    style={{ marginBottom: "20px" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    color="secondary"
                    variant="subtitle1"
                    align="center"
                    style={{ width: "300px" }}
                  >
                    {card.subtitle}
                  </Typography>
                </CardContentContainer>
              </UiLink>
            </ServiceCardInnerWrapper>

            {/* 
              <ServiceCardInnerWrapper>
                
                <Typography
                  color="secondary"
                  variant="h6"
                  align="center"
                  style={{ marginBottom: "20px" }}
                >
                  {card.title}
                </Typography>
                <Typography
                  color="secondary"
                  variant="subtitle1"
                  align="center"
                  style={{ width: "200px" }}
                >
                  {card.subtitle}
                </Typography>
              </ServiceCardInnerWrapper> */}
          </ServiceCard>
          </ServiceCardContainer>

     
      );
    });

  return (
    <Fragment>
      <ComponentWrapper>
        <LayerWrapper />
        <HomePageName variant="h2">GoPlantIt</HomePageName>
        <Subtitle>
          <ReactTypingEffect
            speed={90}
            typingDelay={600}
            eraseDelay={10000000000}
            text="Providing Australian farmers with scientific plans to cope with
      extreme temperatures." //text=["Hello.", "World!"
          />
        </Subtitle>
        <FadeInWrapper transitionDuration={1000}>
          <ButtonRow>
            <PageButton
              variant="contained"
              color="primary"
              onClick={executeScroll}
            >
              view our services
            </PageButton>
            <PageButton
              variant="outlined"
              color="primary"
              component={Link}
              to="/about-us"
            >
              about us
            </PageButton>
          </ButtonRow>
        </FadeInWrapper>
        <MouseGraphicWrapper><img src={scroll} alt="scroll..." style={{ height: "80px" }} /></MouseGraphicWrapper>
      </ComponentWrapper>
      {/* the services section after the landing page */}

      <ServiceSectionWrapper ref={serviceRef}>
        <Fade left duration={800}>
          <LeftGreenBar />
        </Fade>
      
        <CardsRow>{DisplayServiceCards()}</CardsRow>
        <Fade right duration={800} style={{alignSelf:'flex-end;'}}>
          <RightGreenBarContainer>
          <RightGreenBar />
          </RightGreenBarContainer>
        </Fade>
      </ServiceSectionWrapper>
    </Fragment>
  );
};

export default Landing;
