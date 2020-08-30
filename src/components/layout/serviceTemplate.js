import React from "react";
import { Paper,Typography, Container } from "@material-ui/core";
import styled from "styled-components";

import Fade from "react-reveal/Fade";


const ComponentWrapper = styled.section`
background:#17B978;
height:100%;
min-height:90vh;
width:100vw;
`
const PageContainer = styled(Container)`
height:100%;
display:flex;
flex-direction:column;
padding-top:20px;
`
const ContentWrapper = styled(Paper)`

width:100%;
background-color:white !important;
margin:20px 0px 20px 0px;
padding-bottom:20px;
min-height:70vh;
height:100%;
padding:10px;
`
const Title = styled(Typography)`
color:white;
font-weight: 500;
`
const serviceTemplates = (props) => {
  return <ComponentWrapper >
     <Fade bottom>
    <PageContainer maxWidth='lg'>
    <Title color="accent" variant ='h4'>
    {props.title}
    </Title>
  
    <ContentWrapper>
    {props.childComponent}
    </ContentWrapper>
    </PageContainer>
    </Fade>
  </ComponentWrapper>;
};

export default serviceTemplates;