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
const Summary = styled(Typography)`
  display: flex;
  margin: 5px;
  height: 50px;
  overflow: auto;
`;

const cards = [
  {
    title: "Effect on plant growth and development",
    summary:
      " According to USDA Agriculture Researcher, Dr. Jerry, Pollination is one of the most sensitive phenological stages to temperature extremes across all species, especially in wheat ...",
    link:
      "https://www.sciencedirect.com/science/article/pii/S2212094715300116#:~:text=The%20effects%20of%20increased%20temperature,fill%20the%20grain%20or%20fruit.",
  },
  {
    title: "Does Weather Affect Plant Growth?",
    summary:
      " Experts’ team led by Mary H. Dyer at Colorado State University explains that this process increases with rise in temperature ...",
    link:
      "https://www.gardeningknowhow.com/plant-problems/environmental/temperature-on-plants.htm",
  },
  {
    title: "Higher temperatures affect some plants' growth and yields",
    summary:
      " Higher day and night temperatures affect the growth and yields of some crop plants. Mainly, caused due to gaseous emissions from human activities that ...",
    link: "http://www.fao.org/3/w5183e08.htm",
  },
  {
    title: "Extreme heat stress and increased soil temperature",
    summary:
      " Extreme Heat stress can be an important risk and/or limitation to plant growth and development. Effect of both heat and water stress on the yield of many crops, including corn and soybean ...",
    link:
      "https://cropwatch.unl.edu/2016/impacts-extreme-heat-stress-and-increased-soil-temperature-plant-growth-and-development",
  },
  {
    title: "How climate change impact Australia?",
    summary:
      " Climate change is making weather patterns more extreme and unpredictable, with serious consequences for Australia’s agricultural production...",
    link:
      "https://www.climatecouncil.org.au/uploads/7579c324216d1e76e8a50095aac45d66.pdf",
  },
  {
    title: "Climate Change and Food Security",
    summary:
      " Climate change is emerging as a key threat to global and national food security in the coming decades. Jinny Collet from Global Food and Water Crises Research Programme predicts ...",
    link:
      "https://www.futuredirections.org.au/wp-content/uploads/2014/06/Climate_Change_and_Australian_Food_Security.pdf",
  },
  {
    title: "Economic damages to agriculture ",
    summary:
      "  Higher temperatures affect crop production by increasing heat exposure and increasing water stress through greater evapotranspiration demand ... ",
    link:
      "https://www.canr.msu.edu/afre/uploads/files/AFRE_Seminar_Papers/Hendricks_Paper.pdf",
  },
  {
    title: "Climate impacts on agriculture and food supply",
    summary:
      "  Increases in temperature and carbon dioxide (CO2) can increase some crop yields in some places. But to realize these benefits, nutrient levels, soil moisture ... ",
    link:
      "https://19january2017snapshot.epa.gov/climate-impacts/climate-impacts-agriculture-and-food-supply_.html",
  },
  {
    title: "Extreme temperature impacts in South Australia",
    summary:
      " Temperature has impact on agricultural production. Scientists predict that there will be a number of extreme weather trends in southern Australia ...",
    link:
      "https://www.environment.sa.gov.au/files/sharedassets/public/science/kb-fact-climate-change-erosion.pdf",
  },
  {
    title: "Drought caused winter crop slashed ",
    summary:
      " The latest report to be released on Tuesday by the Australian Bureau of Agricultural and Resource Economics and Sciences (ABARES) predicts total winter crop production ...",
    link:
      "https://www.smh.com.au/business/the-economy/winter-crop-forecasts-slashed-as-armageddon-drought-bites-20191202-p53g2p.html",
  },
  {
    title: "Crop productivity and metabolism at high temperatures",
    summary: " As temperature impacts the number of base growth days ...",
    link:
      "https://www.sciencedirect.com/book/9780128175620/effect-of-high-temperature-on-crop-productivity-and-metabolism-of-macro-molecules#book-description",
  },
  {
    title: " Rising temperatures reduce crop yields",
    summary:
      "  In drought weather, the life cycle of most grains is shortened, accelerating aging and shortening the length of the growing season. Major cereal crops can only tolerate a narrow temperature range ...",
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
    width: "50vh",
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
      //margin:5px;
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
