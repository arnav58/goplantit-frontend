import React, { Fragment, useState } from "react";
import {
    Container,
    Typography,
    Card,
    Divider,
    CardContent,
    CardMedia,
} from "@material-ui/core";
import styled from "styled-components";
import serviceTemplate from "../../layout/serviceTemplate";

import {
    NotificationImportant,
    BarChart,
    WbSunny,
    TrendingUp,
    Error
} from "@material-ui/icons/";

import arnav from "./arnav_jain.jpg";
import yuncheng from "./yuncheng_yang.jpg";
import yifan from "./yifan_wang.jpg";
import vivek from "./vivek_pabolu.jpg";
import ruoxin from "./ruoxin_wang.png";

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  height: 100%;
  overflow: auto;
`;

const DividerWrapper = styled(Divider)`
  background-color: #e2f3f5;
  margin-top: 25px;
  width: 100%;
`;

const CardMediaWrapper = styled(CardMedia)`
    height: 210px;
`;

const SecondTitle = styled(Typography)`
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
`;

const ThirdTitle = styled(Typography)`
  font-weight: 400;
  color: black;
  padding-bottom: 10px;
  margin: 0 auto;
  margin-top: 25px; 
  width: 90%; 
  text-justify: "inter-word";
`;

const CardsWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 60%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const SingleCardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  background: white;
  height: 400px;
  width: 210px;
  border-color: #17b978 !important;
  padding: 5px;
  margin-bottom:15px;
`;

const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;

`;

const InfoWrapper = styled.div`
  display: flex;
  height: 70px;
  margin-bottom: 15px;
`;
const AboutUs = () => {
    const TeamMemberDetails = [
        {
            name: "Arnav Jain",
            image: arnav,
            description: "Majored in Master of Data Science, have experience in machine learning, natural language processing, web development and mobile application development."
        },
        {
            name: "Satya Vivek Pabolu",
            image: vivek,
            description: "Majored in Master of Data Science. Ability to think critically and analytically. Technical skills include Deep Learning, Computer Vision, NLP, AR / VR. Working expertise on Full-Stack Application Development."
        },
        {
            name: "Yuncheng Yang",
            image: yuncheng,
            description: "Majored in Master of IT. Experienced in Web development and mobile application development. Good understanding in machine learning and cloud computing. Keen on Agile project team management."
        },
        {
            name: "Yifan Wang",
            image: yifan,
            description: "Majored in Master of IT, Technical skills include but not limited to application development, understanding in machine learning, and data analysis. "
        },
        {
            name: "Ruoxin Wang",
            image: ruoxin,
            description: "Majored in Master of Business Information System, expert at text, picture and video editing."
        }
    ];

    const RenderIcon = (tag) => {
        let iconStyle = {
            width: "25px",
            height: "25px"
        };
        let theIcon;
        switch (tag.toLowerCase()) {
            case "alerts":
                theIcon = <NotificationImportant color="secondary" style={iconStyle} />;
                break;
            case "visualizations":
                theIcon = <BarChart color="secondary" style={iconStyle} />;
                break;
            case "weather":
                theIcon = <WbSunny color="secondary" style={iconStyle} />;
                break;
            case "predictions":
                theIcon = <TrendingUp color="secondary" style={iconStyle} />;
                break;
            default:
                theIcon = <Error color="primary" style={iconStyle} />;
        }

        return theIcon;
    };

    const [team_details] = useState(TeamMemberDetails);

    const DisplaySingleTeamMemberCard = (team_member) => (
        <SingleCardWrapper variant="outlined">
            <CardMediaWrapper
                title={team_member.name}
                image={team_member.image}
            />
            <CardContent>
                <CardTitleWrapper>
                    <Typography
                        variant="h6"
                        style={{ color: "#5c5757", textAlign: "left"}}
                    >
                        {team_member.name}
                    </Typography>
                </CardTitleWrapper>
                <InfoWrapper>
                    <Typography
                        variant="subtitle1"
                        style={{
                            color: "#5c5757",
                            fontWeight: 400,
                            width: "100%",
                            fontSize: "14px",
                            marginTop: "5px",
                            marginBottom: "15px",
                        }}
                    >
                        {team_member.description}
                    </Typography>
                </InfoWrapper>
            </CardContent>
        </SingleCardWrapper>
    );

    const DisplayTeamCards = () => {
        return team_details.map((team_member) => {
            return DisplaySingleTeamMemberCard(team_member)
        });
    };

    const DisplayAboutUsComponent = () => {
        return (
            <ContentWrapper>
                <SecondTitle color="secondary" variant="h5">
                    About the Project
                </SecondTitle>
                <ThirdTitle variant="h7">
                    Due to climate change, the occurrence of extreme weather conditions is increasingly common and this can have some severe effects on the crop yields. Researchers have found through recent studies that certain types of crops can grow better under the current climatic conditions but this information is not very accessible to the farmers. Through this project, we aim to educate the farmers about the effects of the changing climatic conditions and extreme temperatures on their crop yields and help them understand what crops they should grow in order to make higher profits. Our project also aims to help the farmers keep oversight over the seasonal crops they grow from the perspective of ideal growing weather condition insights and weather forecast information for their region. Through this project, we also want the farmers to be able to forecast their yields based on their location and get an estimate of their yield so that they can plan ahead. Finally, our project also lets the farmers keep informed of the severe weather warnings issued in their state relevant to agricultural practices.
                </ThirdTitle>
                <DividerWrapper />
                <SecondTitle color="secondary" variant="h5">
                    Key Features
                </SecondTitle>
                <ThirdTitle variant="h7">
                    {RenderIcon("alerts")} Severe Weather Alerts.
                </ThirdTitle>
                <ThirdTitle variant="h7">
                    {RenderIcon("visualizations")} Insights on effects of extreme temperature on crops.
                </ThirdTitle>
                <ThirdTitle variant="h7">
                    {RenderIcon("weather")} Weather conditions and forecast information.
                </ThirdTitle>
                <ThirdTitle variant="h7">
                    {RenderIcon("predictions")} Yield forecast based on past trends.
                </ThirdTitle>
                <DividerWrapper />
                <SecondTitle color="secondary" variant="h5">
                    About the Team
                </SecondTitle>
                <CardsWrapper>{DisplayTeamCards()}</CardsWrapper>
            </ContentWrapper>
        );
    };

    return (
        <Fragment>
            {serviceTemplate({
                title: "About Us",
                childComponent: DisplayAboutUsComponent(),
            })}
        </Fragment>
    )

};

export default AboutUs;
