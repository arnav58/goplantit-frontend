import React from 'react'
import Footer from '../Components/layout/Footer'
import Icon from '../Components/icons'
import Logo from '../Components/layout/goplantit.png'
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
                    <Footer.Link href="#">Dashboard</Footer.Link>                    
                    <Footer.Link href="#">Weather Forecast</Footer.Link>
                    <Footer.Link href="#">Know your effects</Footer.Link>
                    <Footer.Link href="#">About us</Footer.Link>
                </Footer.Column>                
                <Footer.Column>
                <Footer.Title>Collaborate with us</Footer.Title>
                    <Footer.Link href="#"><Icon className="fab fa-github" />Facebook</Footer.Link>
                </Footer.Column>
            </Footer.Row>
                <Footer.Copyright>©️2020 Upgraded. All Right Reserved. GoPlantIt. El Nino @Monash</Footer.Copyright>
            </Footer.Wrapper>
        </Footer>
    )
}