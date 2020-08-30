import React from "react";
import serviceTemplate from '../../layout/serviceTemplate'
import styled from "styled-components";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

const ComponentWrapper = styled.section`

  width: 100%;
  display:flex;
  

`
const Arti = styled(Card)`
display: flex;
 width: 260px;
 height:53px;
 margin:5px;
background: #FFFFFF;

`
const Category = styled(Typography)`
display: flex;
font-size: 15px;
margin:5px;
margin-Top:5px;
font-weight: 1200;
color:#A64942;
text-align: center;
justify-content:center;
//border: 3px solid #17b978;
`

const Title = styled(Typography)`
display: flex;
font-size: 11px;
margin:5px;
font-weight: 500;
color :#A64942
;

`
const Summary = styled(Typography)`
display: flex;
font-size: 9px;
margin:5px;
color:#A64942
;
`
const LinkButton = styled(Button)`
display: flex;
font-size: 9px;
//margin:5px;
color:#6202EE;
`

const DisplayArticleComponent = () => {
  return (
    <ComponentWrapper>
     
    
    <GridList cols={6} >
  
   <Category>Plant Grow</Category>
   
            <Arti>
                <CardContent>
                <Title >
                Effect on plant growth and development
                </Title>
                <Summary >
                According to USDA Agriculture Researcher, Dr. Jerry, Pollination is one of the most sensitive phenological stages to temperature extremes across all species, especially in wheat ...
                </Summary>
                <CardActions>
                <LinkButton size="small" href="https://www.sciencedirect.com/science/article/pii/S2212094715300116#:~:text=The%20effects%20of%20increased%20temperature,fill%20the%20grain%20or%20fruit.">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>
            <Arti>
                <CardContent>
                <Title >
                Does Weather Affect Plant Growth?
                </Title>
                <Summary >
                Experts’ team led by Mary H. Dyer at Colorado State University explains that this process increases with rise in temperature ...
                </Summary>
                <CardActions>
                <LinkButton size="small" href="https://www.gardeningknowhow.com/plant-problems/environmental/temperature-on-plants.htm">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>

            <Arti>
                <CardContent>
                <Title >
                Higher temperatures affect some plants' growth and yields 
                </Title>
                <Summary >
                Higher day and night temperatures affect the growth and yields of some crop plants. Mainly, caused due to gaseous emissions from human activities that ...
                </Summary>
                <CardActions>
                <LinkButton size="small" href="http://www.fao.org/3/w5183e08.htm">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>
            <Arti>
                <CardContent>
                <Title >
                Extreme heat stress and increased soil temperature 
                </Title>
                <Summary >
                Extreme Heat stress can be an important risk and/or limitation to plant growth and development. Effect of both heat and water stress on the yield of many crops, including corn and soybean ...
                </Summary>
                <CardActions>
                <LinkButton  size="small" href="https://cropwatch.unl.edu/2016/impacts-extreme-heat-stress-and-increased-soil-temperature-plant-growth-and-development">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>
            <Category>Crop Yield and Production</Category>
            <Arti>
  
                <CardContent>
                <Title >
                How climate change impact Australia?
                </Title>
                <Summary >
                Climate change is making weather patterns more extreme and unpredictable, with serious consequences for Australia’s agricultural production...
                </Summary>
                <CardActions>
                <LinkButton size="small" href="https://www.climatecouncil.org.au/uploads/7579c324216d1e76e8a50095aac45d66.pdf">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>
            <Arti>
                <CardContent>
                <Title >
                Climate Change and Food Security
                </Title>
                <Summary >
                Climate change is emerging as a key threat to global and national food security in the coming decades. Jinny Collet from Global Food and Water Crises Research Programme predicts ...
                </Summary>
                <CardActions>
                <LinkButton size="small" href="https://www.futuredirections.org.au/wp-content/uploads/2014/06/Climate_Change_and_Australian_Food_Security.pdf">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>
            <Arti>
                <CardContent>
                <Title >
                Economic damages to agriculture 
                </Title>
                <Summary >
                Higher temperatures affect crop production by increasing heat exposure and increasing water stress through greater evapotranspiration demand ...
                </Summary>
                <CardActions>
                <LinkButton  size="small" href="https://www.canr.msu.edu/afre/uploads/files/AFRE_Seminar_Papers/Hendricks_Paper.pdf">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>
            <Arti>
                <CardContent>
                <Title >
                Climate impacts on agriculture and food supply
                </Title>
                <Summary >
                Increases in temperature and carbon dioxide (CO2) can increase some crop yields in some places. But to realize these benefits, nutrient levels, soil moisture ... 
                </Summary>
                <CardActions>
                <LinkButton  size="small" href="https://19january2017snapshot.epa.gov/climate-impacts/climate-impacts-agriculture-and-food-supply_.html">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>
            <Category>Crop Compatibility</Category>
            <Arti>
                <CardContent>
                <Title >
                Extreme temperature impacts in South Australia
                </Title>
                <Summary >
                Temperature has impact on agricultural production. Scientists predict that there will be a number of extreme weather trends in southern Australia ...
                </Summary>
                <CardActions>
                <LinkButton size="small" href="https://www.environment.sa.gov.au/files/sharedassets/public/science/kb-fact-climate-change-erosion.pdf">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>


  
       

           
            
            <Arti>
                <CardContent>
                <Title >
                Drought caused winter crop slashed 
                </Title>
                <Summary >
                The latest report to be released on Tuesday by the Australian Bureau of Agricultural and Resource Economics and Sciences (ABARES) predicts total winter crop production ...
                </Summary>
                <CardActions>
                <LinkButton size="small" href="https://www.smh.com.au/business/the-economy/winter-crop-forecasts-slashed-as-armageddon-drought-bites-20191202-p53g2p.html">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>


      
       
            
            
            <Arti>
                <CardContent>
                <Title >
                Rising temperatures reduce crop yields
                </Title>
                <Summary >
                In drought weather, the life cycle of most grains is shortened, accelerating aging and shortening the length of the growing season. Major cereal crops can only tolerate a narrow temperature range ...
                </Summary>
                <CardActions>
                <LinkButton  size="small" href="https://www.nature.com/articles/436174b">Learn More</LinkButton>
                </CardActions>
                </CardContent>
                
            </Arti>

       
            
            
            <Arti>
                <CardContent>
                <Title >
                Crop productivity and metabolism of macro molecules at high temperatures
                </Title>
                <Summary >
                As temperature impacts the number of base growth days ...
                </Summary>
                <CardActions>
                <LinkButton  size="small" href="https://www.sciencedirect.com/book/9780128175620/effect-of-high-temperature-on-crop-productivity-and-metabolism-of-macro-molecules#book-description">Learn More</LinkButton>
                </CardActions>
                </CardContent>
               
            </Arti>


       
    </GridList>

  </ComponentWrapper> 
  );
};


const Effects = () => {

  // let props = {title:"Know Your Effects"}
  return(
    
    <React.Fragment>
    {/* {serviceTemplate(props)} */}
    {serviceTemplate({
      title: "Know Your Effects",
 
      childComponent: DisplayArticleComponent(),
    })}
     </React.Fragment>
  );

};

export default Effects;
