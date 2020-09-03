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
//Import images
import Wheat from './Wheat.jpg';
import Barley from './Barley.jpg';
import Canola from './Canola.jpg';
import Sorghum from './Sorghum.jpg';
import Cotton from './Cotton.jpg';
import Rice from './Rice.jpg';

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
    title: "wheat yields are influenced by climate change",
    image:Wheat,
    crop: "wheat",
    insights:["Rainfall distribution is likely to have a greater effect on crop yield than absolute reductions, with crop yields being more sensitive to reduced rainfall during May or August (germination and flowering, respectively) than June and July (months of highest rainfall).", "Yields are projected to decline in drier eastern and northern areas and remain largely unchanged or increase in wetter western and southern areas.", "Increased atmospheric carbon dioxide concentration offsets a small percentage of the negative effects of decreased rainfall and increased temperatures.", "Higher temperatures, and to a lesser extent declining rainfall, will hasten development times and reduce the flowering period.", "Plant available water capacity of soils becomes increasingly important to yield potential: yield declines are greater on clay soils than sands in eastern areas.", "Production risks associated with climate variability in drier, marginal areas are projected to increase."],
    link:
      "https://www.agric.wa.gov.au/climate-change/how-wheat-yields-are-influenced-climate-change-western-australia",
  },
  {
    title: "Research quantifies effects of increased temperatures on Australian wheat yields",
    image:Wheat,
    crop: "wheat",
    insights:["Heat events during reproductive and grain-filling phases can heavily impact on yield.", "These events are generally not classified as stressful but can lead to problems like phenological development, shortened growth stages and increased evaporative demand.", "This results in decreased transpiration efficiency and increased drought stress.", "Heat shock and heat stress can cause problems like photosynthetic apparatus of plants, pollen and developing embryo mortality, and scorched leaves.", "Frost accounts for 10% loss in the yield of wheat, with another 10 percent due to the indirect costs related to late sowing.", "Australian wheatbelt might experience a loss in their yield by 15 percent by 2050 owing to the effects of heat stress."],
    link:
      "https://qaafi.uq.edu.au/article/2019/06/research-quantifies-effects-increased-temperatures-australian-wheat-yields",
  },
  {
    title: "The effect of rainfall on Barley",
    image:Barley,
    crop: "barley",
    insights:["The expectation is that greater yields will be associated with lower water stress due to higher rainfall and lower VPD.", "For the series analysed (2009-2013), the findings confirm that for wheat, barley and canola; high yields were associated with significantly higher rainfall particularly in the South and West.", "There was little or no association between yield and rainfall in the pulses. High ET was significantly and consistently associated with lower yields in wheat, barley and canola in the South and West and chickpea in the West but did not define high and low yielding environments in the North."],
    link: "https://www.sciencedirect.com/science/article/pii/S016819231730326X",
  },
  {
    title: "The effect of rainfall on barley.",
    image:Barley,
    crop: "barley",
    insights:["The sprouting of grain while still in the head is caused by rain or damp conditions during the ripening stage of the crop.", "There are two types of cleaving in barley\; the peeling of the husk from the awn end of the grain along its side where the lemma overlaps the palea giving the appearance that the husk is too small to cover the entire grain. The grain splits along the crease, side or back of the grain.", "The split grain can be broken with a thumbnail pressed into the crease, whereas healthy barley grains can not be broken easily."],
    link:
      "https://www.agric.wa.gov.au/barley/barley-production-effect-weather-damage-quality-and-varietal-purity?page=0%2C1",
  },
  {
    title: "Opportunities for canola in future under the conditions of rainfall and high temperatures",
    image:Canola,
    crop: "canola",
    insights:["Higher yields in less well drained portions of the high rainfall zone due to decreased rainfall, less waterlogging and lower disease risk.", "Development of new cultivars to counter the high temperatures and shorter growing season that could be the dominant constraint to canola growth in the future, particularly in the northern regions of the agricultural zone.", "Further improvements to land and crop management, in terms of retaining soil moisture available to crops. (e.g. wider row spacings in dry areas or dry years, improving soil properties such as compaction, pH, fertility, water repellency, structure etc.).", "Possible shifts in important canola growing regions."],
    link:
      "https://researchlibrary.agric.wa.gov.au/cgi/viewcontent.cgi?article=1284&context=rmtr",
  },
  {
    title: "Diagnose the effects of early drought on plants based on appearance",
    image:Canola,
    crop: "canola",
    insights:["Early drought may affect germination and early growth.", "Water stressed seedlings are more severely affected by other constraints and may have induced nutrient deficiencies.", ".Patchy germination that may vary across the paddock according to seeding depth, or soil type, or other factors that affect soil moisture infiltration and storage."],
    link:
      "https://www.agric.wa.gov.au/mycrop/autumn-winter-drought-canola",
  },
  {
    title: "Temperature affects the vegetative growth and reproductive growth of sorghum genotypes",
    image:Sorghum,
    crop: "sorghum",
    insights:["Varietal attributes, such as heat stress tolerance, tillering, and maturity can all have large effects on yield.", "However, this will depend on starting soil water, time of sowing, crop management, and the nature of the season.High temperature conditions affected both vegetative and reproductive growth of the sorghum genotypes.", "High temperature increased development rate (i.e. shorter time to flowering), leaf number, and leaf appearance rate, but had no effect on leaf size.", "However, there was significant reduction in plant height, pollen viability and seed set under high temperature.", "There was significant variability in seed set and pollen viability responses among sorghum genotypes.", "The most tolerant genotypes showed only a small reduction in seed set at 38°C, whereas the most susceptible showed significant reductions at 36°C.  Seed set was highly correlated with pollen viability.", "All treatments were well-watered so this effect of high temperature on seed set is independent of the effect of moisture stress."],
    link:
      "https://grdc.com.au/resources-and-publications/grdc-update-papers/tab-content/grdc-update-papers/2015/07/grain-sorghum-varietal-reactions-to-heat-stress-and-environment",
  },
  {
    title: "Heavy rainfall effect on Grain Sorghum",
    image:Sorghum,
    crop: "sorghum",
    insights:["After such a prolonged dry spell, particularly in the eastern states, the soil moisture in many regions was at record low levels entering 2020.", "Replenishing those soil moisture reserves will be a long process with above-average rainfall required for a prolonged period of time.", "The recent widespread falls have started the process of reducing the significant rainfall and soil moisture deficits accumulated over the last couple of years.", "The rainfall has not been confined to the cropping regions. Drought affected pastoral districts have seen an unbelievable turnaround in pasture growth and feed availability.", "Most graziers were forced to substantially reduce stock numbers during the drought as the cost of maintaining livestock became prohibitive."],
    link:
      "https://www.farmonline.com.au/story/6671295/sorghum-production-forecast-to-be-lowest-in-50-years/",
  },
  {
    title: "Climate change will have both positive and negative effects on cotton production",
    image:Cotton,
    crop: "cotton",
    insights:["Increased CO2 may increase yield in well-watered crops and higher temperatures will extend the length of the growing season.", "However, warmer temperatures also accelerate the rate of crop development and could potentially shorten the time to maturity, which may then impact crop management decisions.", "Higher temperatures also have the potential to cause significant fruit loss, reduce water use efficiencies, lower yields and alter fibre quality.", "Environmental conditions that encourage excessive shading by the leaves may lead to fruit loss throughout the season.", "Consequently, fruit loss may exacerbate excessive vegetative growth and further loss of fruit, due to a lower fruit load to restrict vegetative growth."],
    link:
      "https://www.crdc.com.au/content/cotton-changing-climate-what-research-says",
  },
  {
    title: "Factors affecting cotton growth",
    image:Cotton,
    crop: "cotton",
    insights:["Australia’s cotton growing season lasts approximately six months, depending on the region.", "The season starts between August-November (soil preparation and planting) and ends between March-June (picking).", "The rate of cotton plant growth is largely determined by temperature. Cool temperatures (<15C average daily temperature) and excessively hot temperatures (>36C) can delay crop development.", "About 30 species of insects can attack cotton plants, and if not controlled, can cause serious damage. The main pests in Australia are the Helicoverpa caterpillar, aphids, thrips, mirids, white fly and mealy bugs.", "Cotton can be affected by a range of diseases that can reduce productivity. The six most potential serious diseases (that are not in Australia) are bacterial blight, Texas root rot, cotton leaf curl disease, blue disease and exotic strains of Fusarium wilt and Verticillium wilt.", "Environmental factors can also affect cotton growth, particularly in the early stages, including heat shock, cold shock, sand blasting, hail damage, lightning, drought, and water logging."],
    link:
      "https://cottonaustralia.com.au/the-cotton-plant",
  },
  {
    title: "Drought reduces the odds of rice growing and the variables",
    image:Rice,
    crop: "rice",
    insights:["Drought affects every agricultural industry based here, not just rice from sheepherding, the other mainstay in this dusty land, to the cultivation of wine grapes, the fastest-growing crop here, with that expansion often coming at the expense of rice.", "The drought’s effect on rice has produced the greatest impact on the rest of the world, so far.", "It is one factor contributing to skyrocketing prices, and many scientists believe it is among the earliest signs that a warming planet is starting to affect food production."],
    link:
      "https://www.sciencedirect.com/book/9780128175620/effect-of-high-temperature-on-crop-productivity-and-metabolism-of-macro-molecules#book-description",
  },
  {
    title: "Impact of Increased carbon dioxide levels and higher temperatures on Rice",
    image:Rice,
    crop: "rice",
    insights:["Higher carbon dioxide levels typically increase biomass production, but not necessarily yield.", "Higher temperatures can decrease rice yields as they can make rice flowers sterile, meaning no grain is produced. Higher respiration losses linked to higher temperatures also make rice less productive.", "The different predictions for elevated temperature, carbon dioxide levels, changes in humidity, and the interactions of these factors make forecasting future rice yields under these conditions challenging.", "IRRI research indicates that a rise in nighttime temperature by 1 degree Celsius may reduce rice yields by about 10%."],
    link:
      "http://ricepedia.org/challenges/climate-change",
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
    padding: "40px 40px",
    display: "flex",
    width: "90vh",
    height: "60vh",
    color: "#3e3636",
    flexDirection: "column",
    // justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "5px",
    overflow: "auto",
  },
  images: {
    height: "40vh",
    width: "40vh",
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
      const listItems = displayCard.insights.map((points) =>
        <li>{points}</li>
      );
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
              <br></br>
              <Typography style={{alignSelf:"flex-start"}} variant="h6" fontWeight="fontWeightMedium">
                Key Insights
              </Typography>
              <ul>{listItems}</ul>
              <br></br>
              <img src={displayCard.image} alt="image" className={classes.images}/>
              <br></br>              
              <Link href={displayCard.link} style={{alignSelf:"flex-end"}} target="_blank">
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
