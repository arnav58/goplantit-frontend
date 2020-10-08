import React, { Fragment } from "react";
import { Paper, Typography, Container } from "@material-ui/core";
import styled from "styled-components";

import Fade from "react-reveal/Fade";

const ComponentWrapper = styled.section`
  background: #17b978;
  min-height: 100%;
  width: 100%;
`;
const PageContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const ContentWrapper = styled(Paper)`
  width: 100%;
  background-color: #fffafa !important;
  margin: 20px 0px 20px 0px;
  min-height: 70vh;
  height: 100%;
  padding: 20px 20px 20px 20px;
`;

const Title = styled(Typography)`
  color: white;
  font-weight: 500;
`;
const serviceTemplates = (props) => {
  return (
    <ComponentWrapper>
      <Fade bottom style={{height:"100%"}}>
        <PageContainer maxWidth="lg">
          <Title color="accent" variant="h4">
            {props.title}
          </Title>
          {/* if custom is true, return the child component without the paper wrapper
    else, wrap the child component in the paper component */}
          {props.custom ? (
            <Fragment>{props.childComponent}</Fragment>
          ) : (
            <ContentWrapper>{props.childComponent}</ContentWrapper>
          )}
        </PageContainer>
      </Fade>
    </ComponentWrapper>
  );
};

export default serviceTemplates;
