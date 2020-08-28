import React from "react";
import { Paper,Typography, Container } from "@material-ui/core";
import styled from "styled-components";


const ComponentWrapper = styled.section`
background:#17B978;
height:100vh;
width:100vw;
`
const PageContainer = styled(Container)`
height:90vh;
display:flex;
flex-direction:column;
padding-top:20px;
`
const ContentWrapper = styled(Paper)`
width:100%;
background-color:white !important;
min-height:85%!important;
margin-top:10px;
overflow:hidden;
`
const Title = styled(Typography)`
color:white;
font-weight: 500;
`
const serviceTemplates = (props) => {
  return <ComponentWrapper >
    <PageContainer maxWidth='lg'>
    <Title color="accent" variant ='h4'>
    {props.title}
    </Title>
    <ContentWrapper>
    {props.childComponent}
    </ContentWrapper>
    </PageContainer>
  </ComponentWrapper>;
};

export default serviceTemplates;