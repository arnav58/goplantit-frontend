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
import landing from "./john-foust-HkJ1AOnJF8Q-unsplash.jpg";
import scroll from "./scroll.gif";
//Icons imports
import { NotificationImportant, NotListedLocation } from "@material-ui/icons";

////Styled components
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
  height: 100vh;
  max-width: 100vw;
  position: relative;
  background: #fafaf6;
  z-index: 1;
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-item: top;
  z-index: 9;
  position: absolute;
  top: 220px;
  width: 100%;
`;

const ServiceCard = styled(Paper)`
  opacity: 1;
  transition: opacity 300ms ease-in;
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
  background: #a64942;
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 50px;
`;
const BottomBrownBar = styled.div`
  width: 62px;
  height: 21px;
  background: #a64942;
  position: absolute;
  z-index: 1;
  top: 640px;
  left: 320px;
`;

const TopRightBrownBar = styled.div`
  width: 32px;
  height: 11px;
  background: #a64942;
  position: absolute;
  z-index: 1;
  top: 90px;
  right: 40px;
`;

const LeftGreenBar = styled.div`
  width: 932px;
  height: 121px;
  background: #17b978;
  position: absolute;
  z-index: 1;
  top: 150px;
`;
const RightGreenBar = styled.div`
  width: 932px;
  height: 121px;
  background: #17b978;
  position: absolute;
  z-index: 1;
  top: 420px;
  right: 0;
`;

const ServiceCardInnerWrapper = styled.div`
  margin: 10px;
  width: 250px;
  height: 200px;
  display: flex;
  flex-direction: column;
  background: white;
  align-items: center;
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
      {
        icon: "notification",
        title: "Extreme Weather Alert",
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
    };
    switch (icon) {
      case "notification":
        theIcon = <NotificationImportant color="secondary" style={iconStyle} />;
        break;
      case "location":
        theIcon = <NotListedLocation color="secondary" style={iconStyle} />;
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
        <Fade bottom duration={1000}>
          <UiLink underline="none" href={card.link}>
            <ServiceCard>
              <ServiceCardInnerWrapper>
                {RenderIcon(card.icon)}
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
              </ServiceCardInnerWrapper>
            </ServiceCard>
          </UiLink>
        </Fade>
      );
    });

  return (
    <Fragment>
      <ComponentWrapper>
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
        <FadeIn transitionDuration={1000}>
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
        </FadeIn>
        <MouseGraphicWrapper><img src={scroll} alt="scroll..." style={{height: "80px"}} /></MouseGraphicWrapper>
      </ComponentWrapper>
      {/* the services section after the landing page */}

      <ServiceSectionWrapper ref={serviceRef}>
        <Fade left duration={500}>
          <TopBrownBar />
        </Fade>
        <Fade right duration={500}>
          <TopRightBrownBar />
        </Fade>
        <Fade left duration={800}>
          <LeftGreenBar />
        </Fade>
        <Fade right duration={800}>
          <RightGreenBar />
        </Fade>
        <BottomBrownBar />
        <CardsRow>{DisplayServiceCards()}</CardsRow>

      </ServiceSectionWrapper>
    </Fragment>
  );
};

export default Landing;
