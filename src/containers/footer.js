import React from 'react'
import Footer from '../components/layout/Footer'
import Logo from '../components/layout/goplantit.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  
    logo: {
      font: "Roboto",
      style: "normal",
      width: "250px",
    },
    
  }));

export function FooterContainer() {
    const classes = useStyles();
    return (
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                <img src={Logo} alt="Logo" className={classes.logo}/>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Pages</Footer.Title>
                    <Footer.Link  href="/">Home</Footer.Link>                    
                    <Footer.Link href="/alerts">Weather Alerts</Footer.Link>
                    <Footer.Link href="/effects">Know your effects</Footer.Link>
                    <Footer.Link href="/about-us">About us</Footer.Link>
                    <Footer.Link href="/visualze">Insights</Footer.Link>
                </Footer.Column>
            </Footer.Row>
                <Footer.Copyright>©️2020 Upgraded. All Right Reserved. GoPlantIt. El Nino @Monash</Footer.Copyright>
            </Footer.Wrapper>
        </Footer>
    )
}