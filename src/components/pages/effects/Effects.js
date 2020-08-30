import React from "react";
import serviceTemplate from "../../layout/serviceTemplate";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import GridList from "@material-ui/core/GridList";

const ComponentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
 
`;

const CardRow = styled.div`
display: flex;

`
const Arti = styled(Card)`
  display: flex;
  width: 200px;
  margin: 5px;
  background: #ffffff;
`;
const Category = styled(Typography)`
  display: flex;
  font-size: 15px;
  width: 200px;
  margin: 5px;
  margin-top: 5px;
  font-weight: 1200;
  color: #a64942;
  text-align: center;
  justify-content: center;
`;

const Title = styled(Typography)`
  display: flex;
  font-size: 11px;
  margin: 5px;
  font-weight: 500;
`;
const Summary = styled(Typography)`
  display: flex;
  font-size: 9px;
  margin: 5px;
`;
const LinkButton = styled(Button)`
  display: flex;
  font-size: 9px;
  //margin:5px;
  color: #6202ee;
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
    summary:" Experts’ team led by Mary H. Dyer at Colorado State University explains that this process increases with rise in temperature ...",
    link:"https://www.gardeningknowhow.com/plant-problems/environmental/temperature-on-plants.htm",
  },
  {
    title: "Higher temperatures affect some plants' growth and yields",
    summary:
      " Higher day and night temperatures affect the growth and yields of some crop plants. Mainly, caused due to gaseous emissions from human activities that ...",
    link:
      "http://www.fao.org/3/w5183e08.htm",
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
    title: "Crop productivity and metabolism of macro molecules at high temperatures",
    summary:
      " As temperature impacts the number of base growth days ...",
    link:
      "https://www.sciencedirect.com/book/9780128175620/effect-of-high-temperature-on-crop-productivity-and-metabolism-of-macro-molecules#book-description",
  },
  {
    title: " Rising temperatures reduce crop yields",
    summary:
      "  In drought weather, the life cycle of most grains is shortened, accelerating aging and shortening the length of the growing season. Major cereal crops can only tolerate a narrow temperature range ...",
    link:
      "https://www.nature.com/articles/436174b",
  },
  
];

const mapCards =(cards)=>{
    let uis=[]
    cards.map(card=>{
       uis.push(<Arti>
        <CardContent>
          <Title color="secondary">{card.title}</Title>
          <Summary color="secondary">
           {card.summary}
          </Summary>
          <CardActions>
            <LinkButton
              size="small"
              href={card.link}
            >
              Learn More
            </LinkButton>
          </CardActions>
        </CardContent>
      </Arti>
       )
       return null
    })
    return uis
    
}

const DisplayArticleComponent = () => {
  return (
    <ComponentWrapper>
      {/* <GridList cols={5}> */}
      <CardRow>
        <Category>Plant Grow</Category>
        {mapCards(cards.slice(0,4))}
      </CardRow>
      <CardRow>
        <Category>Crop Yield and Production</Category>
        {mapCards(cards.slice(4,8))}
      </CardRow>
      <CardRow>
        <Category>Crop Compatibility</Category>
        {mapCards(cards.slice(8,12))}
      </CardRow>


      {/* </GridList> */}
    </ComponentWrapper>
  );
};

const Effects = () => {

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
