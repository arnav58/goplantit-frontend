import React from "react";
//components import
import serviceTemplate from "../../layout/serviceTemplate";
//styled components
import styled from "styled-components";
//material ui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Modal, Backdrop, Fade, Paper, Link, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EcoIcon from '@material-ui/icons/Eco';
const ComponentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardRow = styled.div`
  display: flex;
  height: 25%;
  margin-bottom: 10px;
  flex-direction: column;
`;
const Arti = styled(Card)`
  display: flex;
  width: 350px;
  margin: 5px;
  background: #ffffff;
`;

const Title = styled(Typography)`
  display: flex;
  margin: 5px;
  font-weight: 500;
  height: 50px;
`;
// const Summary = styled(Typography)`
//   display: flex;
//   margin: 5px;
//   height: 50px;
//   overflow: auto;
// `;

const cards = [
  {
    title: "Temperature effects on plant growth and development is dependent upon plant species.",
    summary:
      " Under an increasing climate change scenario there is a greater likelihood of air temperatures exceeding the optimum range for many species. Cool season species will have a constrained growing season because of the potential of average temperatures exceeding their range.It is the primary factor to affect the plant development. According to USDA Agriculture Researcher, Dr. Jerry, Pollination is one of the most sensitive phenological stages to temperature extremes across all species, especially in wheat and during this developmental stage temperature extremes would greatly affect crop production. Few adaptation strategies are available to cope up with this situation. ",
    link:
      "https://www.sciencedirect.com/science/article/pii/S2212094715300116#:~:text=The%20effects%20of%20increased%20temperature,fill%20the%20grain%20or%20fruit.",
  },
  {
    title: "Whether it’s extreme heat or cold, temperature does affect plants and their growth.",
    summary:
      " High temperatures affect plant and seed growth in numerous ways and the most obvious are the effects of Photosynthesis. Experts’ team led by Mary H. Dyer at Colorado State University explains that this process increases with rise in temperature. At high / extreme temperature, photosynthesis becomes unstable and may lead to unconditional plant growth. Different plants have different effects, some plant seeds, including cool season vegetables, like lettuce and broccoli, germinate best in temperatures between 55 and 70 F. (13 to 21 C.), while warm season plants, such as squash and marigolds, germinate best when temperatures are between 70 and 85 F. (21 to 13 C.).",
    link:
      "https://www.gardeningknowhow.com/plant-problems/environmental/temperature-on-plants.htm",
  },
  {
    title: "Effect of higher temperature difference between day and night on crop growth.",
    summary:
      " Higher day and night temperatures affect the growth and yields of some crop plants. Mainly, caused due to gaseous emissions from human activities that are substantially increasing the concentrations of atmospheric greenhouse gases. Yash P. Abrol from Indian Agricultural Research Institute explains about the heat tolerance in different crops while emphasising 4 major aspects to take care of. Global warming may cause one of the acute effects of one of the  heat stress and cold stress or both. In some areas under cold stress, the effective growing season will be extended by higher temperatures, which will lead to thermal limits for agriculture like polar shifts, which are particularly important for crops such as rice.",
    link: "http://www.fao.org/3/w5183e08.htm",
  },
  {
    title: "Heat stress affects plant growth and development, monitoring soil moisture during this period.",
    summary:
      " Extreme Heat stress can be an important risk and/or limitation to plant growth and development. According to Suat Irmak (Distinguished Professor, Soil and Water Resources and Irrigation Engineering) this condition varies between different crops, some crops are more susceptible to heat stress during critical growth stages. Effect of both heat and water stress on the yield of many crops, including corn and soybean, is much stronger than the effect(s) of individual stress alone. Therefore, monitoring soil moisture during heat wave periods is critical.  The interval for this pivot run with a small amount of water can be every three to five days, depending on the irrigation well, center pivot capacity, and duration of heat wave.",
    link:
      "https://cropwatch.unl.edu/2016/impacts-extreme-heat-stress-and-increased-soil-temperature-plant-growth-and-development",
  },
  {
    title: "Climate change affects the quality of crops and leads to higher food prices.",
    summary:
      " Climate change is making weather patterns more extreme and unpredictable, with serious consequences for Australia’s agricultural production. More frequent and intense heat waves and extreme weather events are already affecting prices, quality, and seasonal availability of many foods in Australia. Droughts and Strom can drive up food prices, during 2005-2007 increased at twice the previous rate. Climate change affects food quality and availability, higher temperatures cause earlier ripening and reduction.",
    link:
      "https://www.climatecouncil.org.au/uploads/7579c324216d1e76e8a50095aac45d66.pdf",
  },
  {
    title: "Climate change will become a major food security threat to Australia.",
    summary:
      " Climate change is emerging as a key threat to global and national food security in the coming decades. Jinny Collet from Global Food and Water Crises Research Programme, Monash University predicts that Climate change is a key threat to Australian food security between now and 2050. In her report, she suggested to invest urgently in both adaptive and mitigative climate change research. More rainfall, droughts may last longer, and the frequency of extreme weather is increasing. This would disrupt agricultural production and reduce crop yields.",
    link:
      "https://www.futuredirections.org.au/wp-content/uploads/2014/06/Climate_Change_and_Australian_Food_Security.pdf",
  },
  {
    title: "The decomposition of heat exposure and water stress will cause damage to the agricultural economy when the temperature rises.",
    summary:
      "  Increasing heat exposure and increasing water stress through greater evapotranspiration demand affect crops yield under the influence of high temperature. These two mechanisms have significant implications for designing appropriate adaptation strategies to climate change. Studies have shown that annual damages due to a 2◦C increase in temperature of $8.76 billion on non irrigated cropland in the Corn Belt, Mississippi Delta, and Great Plains, more than 90% of the damage was caused by heat exposure.  An increase in average temperature has a much larger effect on extreme degree days in hotter counties.",
    link:
      "https://www.canr.msu.edu/afre/uploads/files/AFRE_Seminar_Papers/Hendricks_Paper.pdf",
  },
  {
    title: "The extreme weather has affected food supplies in the mostly agricultural United State.",
    summary:
      "  Agriculture is of vital importance to the United State, agriculture is highly dependent on weather. Increases in temperature and carbon dioxide (CO2) can increase some crop yields in some places. But to realize these benefits, nutrient levels, soil moisture, water availability, and other conditions must also be met. Changes in the frequency and severity of droughts and floods could pose challenges for farmers and ranchers and threaten food safety. Climate change will make it more difficult to grow crops and will affect changes in farming practices and technologies. ",
    link:
      "https://19january2017snapshot.epa.gov/climate-impacts/climate-impacts-agriculture-and-food-supply_.html",
  },
  {
    title: "Climate change impacts on wheat yields and soil erosion risk have been investigated across South Australia’s cropping zone.",
    summary:
      " In the driest inhabited areas, temperature has a significant impact on agricultural production. Scientists predict that there will be a number of extreme weather trends in southern Australia over the next few decades. In a low rainfall area,  sandy surface soils with a large plant-available water holding capacity will be most resilient for production. A warming, drying trend won’t have the same impacts everywhere due to variation in rainfall and soils. In recent decades there has been a general trend towards decreased late autumn and winter rainfall across southern Australia, which includes most of the cropping zone of Southern SA",
    link:
      "https://www.environment.sa.gov.au/files/sharedassets/public/science/kb-fact-climate-change-erosion.pdf",
  },
  {
    title: "Crops in New South Wales will be severely reduced in 2019.",
    summary:
      " Abares said in NSW the double-barrel hit from low rainfall and high temperatures in spring have slashed forecasts for Australia's 2019 winter crops. The latest report to be released on Tuesday by the Australian Bureau of Agricultural and Resource Economics and Sciences predicts total winter crop production to fall for the third year in a row. Farmers had to give up harvesting grain for hay because of the extreme drought conditions.",
    link:
      "https://www.smh.com.au/business/the-economy/winter-crop-forecasts-slashed-as-armageddon-drought-bites-20191202-p53g2p.html",
  },
  {
    title: "Contrary to common perceptions, most crop physiologists expect global warming to reduce crop yields.",
    summary: " In drought weather, the life cycle of most grains is shortened, accelerating aging and shortening the length of the growing season. Major cereal crops can only tolerate a narrow temperature range, and exceeding the temperature range during flowering can destroy the yield of fertile seeds and thus reduce yields. Global warming would also be expected to increase the frequency of exposure to extreme temperatures and thus damage crop fertility. ",
    link:
      "https://www.sciencedirect.com/book/9780128175620/effect-of-high-temperature-on-crop-productivity-and-metabolism-of-macro-molecules#book-description",
  },
  {
    title: "With climate change, plants should be reselected and planting times set.",
    summary:
      "  Summary:As temperature impacts the number of base growth days, it is necessary to adapt plant selection, strategize planting times, and understand the expected impact of adaptive steps to ensure maximum plant health and crop yield. Global warming, climate change and change in environmental conditions, these changes in climatic patterns constrain normal growth and reproduction cycles. An increase of 2°C in temperature could decrease the rice yield by about 0.75 t/ha and a 0.5°C increase in winter temperature could reduce wheat yield by 0.45 t/ha.",
    link: "https://www.nature.com/articles/436174b",
  },
];

const DisplayCategory = (color, name) => {
  const Category = styled(Typography)`
    display: flex;
    width: 350px;
    margin: 5px;
    margin-top: 5px;
    font-weight: 1200;
    color: #5d5d5a;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-bottom: 5px solid ${color};
  `;
  return (
    <Category>
      <Typography variant="h6"> {name}</Typography>
    </Category>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  paper: {
    backgroundColor: "#fafaf6",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    width: "90vh",
    height: "50vh",
    color: "#3e3636",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "5px",
  },
}));

const Effects = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [displayCard, setDisplayCard] = React.useState(null);

  const handleOpen = (card) => {
    setDisplayCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setDisplayCard(null);
    setOpen(false);
  };

  const DisplayModal = () => {
    if (displayCard) {
      return (
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open} style={{outline:'none'}}>
            <Paper className={classes.paper}>
              <Typography variant="h6" fontWeight="fontWeightMedium">
                  <EcoIcon color="primary" iconSize="large"/>
                {displayCard.title}
              </Typography>
              <Typography variant="subtitle1">{displayCard.summary}</Typography>
              <Link href={displayCard.link} style={{alignSelf:"flex-start"}}>
                <Typography
                  variant="caption"
                  textAlign="left"
                  color="secondary"
                >
                  Link to the Article
                </Typography>
              </Link>
            </Paper>
          </Fade>
        </Modal>
      );
    } else return null;
  };
  const mapCards = (cards, categoryColor) => {
    const LinkButton = styled(Button)`
      display: flex;
      margin:5px;
      color: ${categoryColor};
    `;
    let uis = [];
    cards.map((card) => {
      uis.push(
        <React.Fragment>
          <Arti>
            <CardContent>
              <Title color="secondary" variant="subtitle2'">
                {card.title}
              </Title>
              <CardActions>
                <LinkButton size="small" onClick={() => handleOpen(card)}>
                  Learn More
                </LinkButton>
              </CardActions>
            </CardContent>
          </Arti>
          <Divider style={{ color: { categoryColor } }} variant="middle" />
        </React.Fragment>
      );
      return null;
    });
    return uis;
  };

  const DisplayArticleComponent = () => {
    return (
      <ComponentWrapper>
        {/* <GridList cols={5}> */}
        <CardRow>
          {/* <Category >Plant Grow</Category> */}
          {DisplayCategory("#775ada", "Plant Growth")}
          {mapCards(cards.slice(0, 4), "#775ada")}
        </CardRow>
        <CardRow>
          {/* <Category>Crop Yield and Production</Category> */}
          {DisplayCategory("#f85959", "Yield and Production")}
          {mapCards(cards.slice(4, 8), "#f85959")}
        </CardRow>
        <CardRow>
          {/* <Category>Crop Compatibility</Category> */}
          {DisplayCategory("#107a8b", "Crop Compatibility")}
          {mapCards(cards.slice(8, 12), "#107a8b")}
        </CardRow>
        {DisplayModal()}

        {/* </GridList> */}
      </ComponentWrapper>
    );
  };

  return (
    <React.Fragment>
      {serviceTemplate({
        title: "Know Your Effects",
        childComponent: DisplayArticleComponent(),
      })}
    </React.Fragment>
  );
};

export default Effects;
