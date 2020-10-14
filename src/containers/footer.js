import React from "react";
import Footer from "../components/layout/Footer";
import Logo from "../components/layout/goplantit.png";
import { makeStyles } from "@material-ui/core/styles";
import useWindowWidth from "../components/utils/useWindowWith";

const useStyles = makeStyles((theme) => ({
  logo: {
    font: "Roboto",
    style: "normal",
    width: "250px",
  },
}));

export function FooterContainer() {
  const { windowWidth } = useWindowWidth();
  const imgAndCopyRrightBreakPoint = 650;
  const classes = useStyles();
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          {windowWidth > imgAndCopyRrightBreakPoint && (
            <Footer.Column>
              <img src={Logo} alt="Logo" className={classes.logo} />
            </Footer.Column>
          )}

          <Footer.Column>
            <Footer.Title>Pages</Footer.Title>
            <Footer.Link href="/">Home</Footer.Link>
            <Footer.Link href="/dashboard">Dashboard</Footer.Link>
            <Footer.Link href="/insights">Insights</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <div style={{ marginTop: "44px" }}></div>
            <Footer.Link href="/alerts">Weather Alerts</Footer.Link>
            <Footer.Link href="/effects">Know your effects</Footer.Link>
            <Footer.Link href="/about-us">About us</Footer.Link>
          </Footer.Column>
        </Footer.Row>
        {windowWidth > imgAndCopyRrightBreakPoint && (
          <Footer.Copyright>
            ©️2020 Upgraded. All Right Reserved. GoPlantIt. El Nino @Monash
          </Footer.Copyright>
        )}
      </Footer.Wrapper>
    </Footer>
  );
}
