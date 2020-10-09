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
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  layout: fixed;
  padding: 2%;
  flex-wrap:wrap;
  align-items:center;
  @media only screen and (max-width: 710px) {
    flex-direction:column;
  }

`;

const CardVertical = styled.div`
  display: flex;
  height: 25%;
  margin-bottom: 10px;
  flex-direction: column;
  width: 50%;
  align-items:center;
  @media only screen and (max-width: 710px) {
    width:100%;
  }

`;
const CardHorizontal = styled.div`
  display: flex;
  width:100%;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content:center;
`;
const CardColum = styled.div`
  display: flex;
  width : 100%;
  margin-bottom: 10px;
  flex-direction: row;
`;
const Arti = styled(Card)`
  display: flex;
  width: 500px;
  margin: 5px;
  background: #ffffff;
`;

const Title = styled(Typography)`
  display: flex;
  margin: 5px;
  font-weight: 500;
  height: 50px;
`;

const CardContentWrapper = styled(CardContent)`
  width: 100%;
`;

const CardActionWrapper = styled(CardActions)`
  position: relative;
  width: 100%;
`;

const AffectedCropsWrapper = styled.div`
  position: absolute;
  right: 10px;
`;

// const Summary = styled(Typography)`
//   display: flex;
//   margin: 5px;
//   height: 50px;
//   overflow: auto;
// `;

const cards = [
  {
    title: "Wheat yields are influenced by climate change",
    image: "article-1",
    imageTitle: "Wheat",
    crop: "wheat",
    insights: ["Rainfall distribution is likely to have a greater effect on crop yield than absolute reductions, with crop yields being more sensitive to reduced rainfall during May or August (germination and flowering, respectively) than June and July (months of highest rainfall).", "Yields are projected to decline in drier eastern and northern areas and remain largely unchanged or increase in wetter western and southern areas.", "Increased atmospheric carbon dioxide concentration offsets a small percentage of the negative effects of decreased rainfall and increased temperatures.", "Higher temperatures, and to a lesser extent declining rainfall, will hasten development times and reduce the flowering period.", "Plant available water capacity of soils becomes increasingly important to yield potential: yield declines are greater on clay soils than sands in eastern areas.", "Production risks associated with climate variability in drier, marginal areas are projected to increase."],
    link:
      "https://www.agric.wa.gov.au/climate-change/how-wheat-yields-are-influenced-climate-change-western-australia",
  },
  {
    title: "Research quantifies effects of increased temperatures on Australian wheat yields",
    image: "article-2",
    imageTitle: "Wheat",
    crop: "wheat",
    insights: ["Heat events during reproductive and grain-filling phases can heavily impact on yield.", "These events are generally not classified as stressful but can lead to problems like phenological development, shortened growth stages and increased evaporative demand.", "This results in decreased transpiration efficiency and increased drought stress.", "Heat shock and heat stress can cause problems like photosynthetic apparatus of plants, pollen and developing embryo mortality, and scorched leaves.", "Frost accounts for 10% loss in the yield of wheat, with another 10 percent due to the indirect costs related to late sowing.", "Australian wheatbelt might experience a loss in their yield by 15 percent by 2050 owing to the effects of heat stress."],
    link:
      "https://qaafi.uq.edu.au/article/2019/06/research-quantifies-effects-increased-temperatures-australian-wheat-yields",
  },
  {
    title: "The effect of rainfall on Barley",
    image: "article-3",
    imageTitle: "Barley",
    crop: "barley",
    insights: ["The expectation is that greater yields will be associated with lower water stress due to higher rainfall and lower VPD.", "For the series analysed (2009-2013), the findings confirm that for wheat, barley and canola; high yields were associated with significantly higher rainfall particularly in the South and West.", "There was little or no association between yield and rainfall in the pulses. High ET was significantly and consistently associated with lower yields in wheat, barley and canola in the South and West and chickpea in the West but did not define high and low yielding environments in the North."],
    link: "https://www.sciencedirect.com/science/article/pii/S016819231730326X",
  },
  {
    title: "Higher rainfall serious threat to Barley",
    image: "article-4",
    imageTitle: "Barley",
    crop: "barley",
    insights: ["The sprouting of grain while still in the head is caused by rain or damp conditions during the ripening stage of the crop.", "There are two types of cleaving in barley; the peeling of the husk from the awn end of the grain along its side where the lemma overlaps the palea giving the appearance that the husk is too small to cover the entire grain. The grain splits along the crease, side or back of the grain.", "The split grain can be broken with a thumbnail pressed into the crease, whereas healthy barley grains can not be broken easily."],
    link:
      "https://www.agric.wa.gov.au/barley/barley-production-effect-weather-damage-quality-and-varietal-purity?page=0%2C1",
  },
  {
    title: "Opportunities for canola in future under the conditions of rainfall and high temperatures",
    image: "article-5",
    imageTitle: "Canola",
    crop: "canola",
    insights: ["Higher yields in less well drained portions of the high rainfall zone due to decreased rainfall, less waterlogging and lower disease risk.", "Development of new cultivars to counter the high temperatures and shorter growing season that could be the dominant constraint to canola growth in the future, particularly in the northern regions of the agricultural zone.", "Further improvements to land and crop management, in terms of retaining soil moisture available to crops. (e.g. wider row spacings in dry areas or dry years, improving soil properties such as compaction, pH, fertility, water repellency, structure etc.).", "Possible shifts in important canola growing regions."],
    link:
      "https://researchlibrary.agric.wa.gov.au/cgi/viewcontent.cgi?article=1284&context=rmtr",
  },
  {
    title: "Diagnose the effects of early drought on plants based on appearance",
    image: "article-6",
    imageTitle: "Canola",
    crop: "canola",
    insights: ["Early drought may affect germination and early growth.", "Water stressed seedlings are more severely affected by other constraints and may have induced nutrient deficiencies.", ".Patchy germination that may vary across the paddock according to seeding depth, or soil type, or other factors that affect soil moisture infiltration and storage."],
    link:
      "https://www.agric.wa.gov.au/mycrop/autumn-winter-drought-canola",
  },
  {
    title: "Temperature affects the vegetative growth and reproductive growth of sorghum genotypes",
    image: "article-7",
    imageTitle: "Sorghum",
    crop: "sorghum",
    insights: ["Varietal attributes, such as heat stress tolerance, tillering, and maturity can all have large effects on yield.", "However, this will depend on starting soil water, time of sowing, crop management, and the nature of the season.High temperature conditions affected both vegetative and reproductive growth of the sorghum genotypes.", "High temperature increased development rate (i.e. shorter time to flowering), leaf number, and leaf appearance rate, but had no effect on leaf size.", "However, there was significant reduction in plant height, pollen viability and seed set under high temperature.", "There was significant variability in seed set and pollen viability responses among sorghum genotypes.", "The most tolerant genotypes showed only a small reduction in seed set at 38°C, whereas the most susceptible showed significant reductions at 36°C.  Seed set was highly correlated with pollen viability.", "All treatments were well-watered so this effect of high temperature on seed set is independent of the effect of moisture stress."],
    link:
      "https://grdc.com.au/resources-and-publications/grdc-update-papers/tab-content/grdc-update-papers/2015/07/grain-sorghum-varietal-reactions-to-heat-stress-and-environment",
  },
  {
    title: "Heavy rainfall effect on Grain Sorghum",
    image: "article-8",
    imageTitle: "Sorghum",
    crop: "sorghum",
    insights: ["After such a prolonged dry spell, particularly in the eastern states, the soil moisture in many regions was at record low levels entering 2020.", "Replenishing those soil moisture reserves will be a long process with above-average rainfall required for a prolonged period of time.", "The recent widespread falls have started the process of reducing the significant rainfall and soil moisture deficits accumulated over the last couple of years.", "The rainfall has not been confined to the cropping regions. Drought affected pastoral districts have seen an unbelievable turnaround in pasture growth and feed availability.", "Most graziers were forced to substantially reduce stock numbers during the drought as the cost of maintaining livestock became prohibitive."],
    link:
      "https://www.farmonline.com.au/story/6671295/sorghum-production-forecast-to-be-lowest-in-50-years/",
  },
  {
    title: "Climate change will have both positive and negative effects on cotton production",
    image: "article-9",
    imageTitle: "Cotton",
    crop: "cotton",
    insights: ["Increased CO2 may increase yield in well-watered crops and higher temperatures will extend the length of the growing season.", "However, warmer temperatures also accelerate the rate of crop development and could potentially shorten the time to maturity, which may then impact crop management decisions.", "Higher temperatures also have the potential to cause significant fruit loss, reduce water use efficiencies, lower yields and alter fibre quality.", "Environmental conditions that encourage excessive shading by the leaves may lead to fruit loss throughout the season.", "Consequently, fruit loss may exacerbate excessive vegetative growth and further loss of fruit, due to a lower fruit load to restrict vegetative growth."],
    link:
      "https://www.crdc.com.au/content/cotton-changing-climate-what-research-says",
  },
  {
    title: "Factors affecting cotton growth",
    image: "article-10",
    imageTitle: "Cotton",
    crop: "cotton",
    insights: ["Australia’s cotton growing season lasts approximately six months, depending on the region.", "The season starts between August-November (soil preparation and planting) and ends between March-June (picking).", "The rate of cotton plant growth is largely determined by temperature. Cool temperatures (<15C average daily temperature) and excessively hot temperatures (>36C) can delay crop development.", "About 30 species of insects can attack cotton plants, and if not controlled, can cause serious damage. The main pests in Australia are the Helicoverpa caterpillar, aphids, thrips, mirids, white fly and mealy bugs.", "Cotton can be affected by a range of diseases that can reduce productivity. The six most potential serious diseases (that are not in Australia) are bacterial blight, Texas root rot, cotton leaf curl disease, blue disease and exotic strains of Fusarium wilt and Verticillium wilt.", "Environmental factors can also affect cotton growth, particularly in the early stages, including heat shock, cold shock, sand blasting, hail damage, lightning, drought, and water logging."],
    link:
      "https://cottonaustralia.com.au/the-cotton-plant",
  },
  {
    title: "Drought reduces the odds of rice growing and the variables",
    image: "article-11",
    imageTitle: "Rice",
    crop: "rice",
    insights: ["Drought affects every agricultural industry based here, not just rice from sheepherding, the other mainstay in this dusty land, to the cultivation of wine grapes, the fastest-growing crop here, with that expansion often coming at the expense of rice.", "The drought’s effect on rice has produced the greatest impact on the rest of the world, so far.", "It is one factor contributing to skyrocketing prices, and many scientists believe it is among the earliest signs that a warming planet is starting to affect food production."],
    link:
      "https://www.sciencedirect.com/book/9780128175620/effect-of-high-temperature-on-crop-productivity-and-metabolism-of-macro-molecules#book-description",
  },
  {
    title: "Impact of Increased carbon dioxide levels and higher temperatures on Rice",
    image: "article-12",
    imageTitle: "Rice",
    crop: "rice",
    insights: ["Higher carbon dioxide levels typically increase biomass production, but not necessarily yield.", "Higher temperatures can decrease rice yields as they can make rice flowers sterile, meaning no grain is produced. Higher respiration losses linked to higher temperatures also make rice less productive.", "The different predictions for elevated temperature, carbon dioxide levels, changes in humidity, and the interactions of these factors make forecasting future rice yields under these conditions challenging.", "IRRI research indicates that a rise in nighttime temperature by 1 degree Celsius may reduce rice yields by about 10%."],
    link:
      "http://ricepedia.org/challenges/climate-change",
  }
];

const DisplayCategory = (color, name) => {
  const Category = styled(Typography)`
    display: flex;
    width: 500px;
    // margin: 5px;
    margin-top: 5px;
    margin-bottom:5px;
    font-weight: 1200;
   
    color: #5d5d5a;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-bottom: 5px solid ${color};
    @media only screen and (max-width: 1000px) {
      width:100%
     };
  `;
  return (
    <Category>
      <Typography variant="h6"> {name}</Typography>
    </Category>
  );
};

const DisplaySeason = (name) => {
  const Category = styled(Typography)`
    display: flex;
    width: 100%;
    margin: 5px;
    margin-top: 5px;
    font-weight: 1200;
    color: #5d5d5a;
    text-align: center;
    align-items: center;
    justify-content: center;

  `;
  return (
    <Category>
      <Typography variant="h4" color="secondary"> {name}</Typography>
    </Category>
  );
};
const DisplayType = (color, name) => {
  const Category = styled(Typography)`
    display: flex;
    height: 150px;
    // margin: 5px;
    margin-top: 5px;
    font-weight: 1200;
    color: #5d5d5a;
    border-left: 5px solid ${color};
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
      
      let url = process.env.PUBLIC_URL + "/article_images/" + displayCard.image + ".jpg";

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
          <Fade in={open} style={{ outline: 'none' }}>
            <Paper className={classes.paper}>
              <Typography variant="h6" fontWeight="fontWeightMedium">
                <EcoIcon color="primary" iconSize="large" />
                {displayCard.title}
              </Typography>
              <br></br>
              <img src={url} alt={displayCard.imageTitle} className={classes.images}/>
              <br></br> 
              <Typography style={{alignSelf:"flex-start"}} variant="h6" fontWeight="fontWeightMedium">
                Key Insights
              </Typography>
              <ul>{listItems}</ul>
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
      let url = process.env.PUBLIC_URL + "/" + card.crop + ".png";
      
      uis.push(
        <React.Fragment>
          <Arti>
            <CardContentWrapper>
              <Title color="secondary" variant="subtitle2'" style={{fontSize: "14px"}}>
                {card.title}
              </Title>
              <CardActionWrapper>
                <LinkButton size="small" onClick={() => handleOpen(card)}>
                  Learn More
                </LinkButton>
                <AffectedCropsWrapper>
                  <Typography
                    color="secondary"
                    variant="body2"
                    style={{ marginRight: "5px" }}
                  >
                  
                    <img
                      src={url}
                      style={{ objectFit: "contain", height: "40px", width: "35px" }}
                      alt={card.crop}
                      title={card.imageTitle}
                    />
                    {card.imageTitle}
                  </Typography>
                </AffectedCropsWrapper>
              </CardActionWrapper>
            </CardContentWrapper>
          </Arti>
          {/* <Divider style={{ color: { categoryColor } }} variant="middle" /> */}
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
        <CardVertical>
          {/* { <Category >Winter Crops</Category> } */}
          {DisplaySeason("Winter Crops")}
          {DisplayCategory("#17b978", "")}
          <CardHorizontal>
          {DisplayType("#f469a9", "")}
          {mapCards(cards.slice(0, 1), "#f469a9")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#f469a9", "")}
          {mapCards(cards.slice(1, 2), "#f469a9")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#88bef5", "")}
          {mapCards(cards.slice(2, 3), "#88bef5")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#88bef5", "")}
          {mapCards(cards.slice(3, 4), "#88bef5")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#ba53de", "")}
          {mapCards(cards.slice(4, 5), "#ba53de")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#ba53de", "")}
          {mapCards(cards.slice(5, 6), "#ba53de")}
          </CardHorizontal>
        </CardVertical>
        <CardVertical>
          {/* <Category>Crop Yield and Production</Category> */}
          {DisplaySeason("Summer Crops")}
          {DisplayCategory("#17b978", "")}
          <CardHorizontal>
          {DisplayType("#fcb1b1", "")}
          {mapCards(cards.slice(6, 7), "#fcb1b1")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#fcb1b1", "")}
          {mapCards(cards.slice(7, 8), "#fcb1b1")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#ed733f", "")}
          {mapCards(cards.slice(8, 9), "#ed733f")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#ed733f", "")}
          {mapCards(cards.slice(9, 10), "#ed733f")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#4b89ac", "")}
          {mapCards(cards.slice(10, 11), "#4b89ac")}
          </CardHorizontal>
          <CardHorizontal>
          {DisplayType("#4b89ac", "")}
          {mapCards(cards.slice(11, 12), "#4b89ac")}
          </CardHorizontal>
        </CardVertical>
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
