import React from "react";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {api} from './ImageApi';


import CircularProgress from '@material-ui/core/CircularProgress';

import styled from "styled-components";

// Class to perform Image Operations
// export default class ImageOps extends React.Component {
    
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         image_object: null,
    //         image_object_details: {},
    //     }
    // }

    

    

    // render() {

const DisplayButtonComponent = () => {
    
    const PageButton = styled(Button)`
      width: 150px;
      height: 30px;
      color: white;
    `
    const Spacer = styled.div`
      height: ${(props) => (props.height ? props.height : "10px")};
      width: ${(props) => (props.width ? props.width : "10px")};
    `;

    const cropDiseaseMap = {
        Wheat: {
          "stemrust": {
            desc: ["Remove all infected parts and destroy them.", "Clean away all debris in between plants to prevent rust from spreading.", "Avoid splashing water onto the leaves, as this can help spread rust."],
            link: "https://grdc.com.au/__data/assets/pdf_file/0020/142625/grdc_tips_and_tactics_stem_rust_web.pdf.pdf",
          },
          "fusariumheadblight": {
            desc: ["Fusarium head blight is a seed-borne disease. Grading of seed, preferably on a gravity table, will improve germination and emergence.", "Prevent crown rot first.", "Vary sowing times and varieties to minimise the risk of the entire crop flowering when weather is favourable for infection."],
            link: "https://grdc.com.au/resources-and-publications/groundcover/ground-cover-issue-32/fusarium-head-blight-in-cereals",
          },
          "yellowrust": {
            desc: ["Yellow rust is easier to control than brown rust with fungicides.", "it is advised to spray the crop with Propiconazole (Tilt) 25 EC @ 0.1 % (1 ml / litre) using power sprayer or tractor mounted boom sprayers"],
            link: "https://www.agric.wa.gov.au/grains-research-development/managing-stripe-rust-and-leaf-rust-wheat-western-australia",
          },
        },
        Barley: {
            "powderymildew": {
                desc: [`Combine one tablespoon baking soda and one-half teaspoon of liquid, non-detergent soap with one gallon of water, and spray the mixture liberally on the plants.`,
                `The mouthwash you may use on a daily basis for killing the germs in your mouth can also be effective at killing powdery mildew spores.`],
                link: "https://www.growingagreenerworld.com/controlling-or-eliminating-powdery-mildew/",
              },
              "fusariumheadblight": {
                desc: [`Do not sow winter cereals into summer crop paddocks until all summer residues have broken down.`,
                       `In addition avoid sowing winter cereals adjacent to those paddocks`],
                link: "https://www.agric.wa.gov.au/mycrop/diagnosing-fusarium-head-blight-cereals#:~:text=There%20is%20no%20treatment%20available,cereals%20adjacent%20to%20those%20paddocks",
              },
        },
        Canola: {
            "rootdamping": {
                desc: [`Use sterilized pots or trays with good drainage and use clean, new potting soil to prevent damping off.`,
                `Since Root Damping is a soilborne disease, do not reuse growing medium from infected plants.`,
                `Remove diseased plants and plant residues from the growing area.`],
                link: "https://www.agric.wa.gov.au/mycrop/diagnosing-damping-canola",
              },
              "downymildew": {
                desc: [`Remove and destroy all infected parts of the plant as soon as symptoms are seen, including any foliage on the ground.`,
                `As downy mildew like moist conditions, avoid dense planting and control weeds, to provide good air circulation around the plants.`],
                link: "https://www.agric.wa.gov.au/mycrop/diagnosing-downy-mildew-canola#:~:text=Downy%20mildew%20does%20not%20usually,crops%20can%20reduce%20disease%20severity.",
              },
        },
        Sorghum: {
            "anthracnose": {
                desc: [`Symptoms can be reduced significantly with a yearly program of fungicide applications. Three applications are needed each spring: the first when the buds are about to break, the second 2 weeks after the first, and the third when the leaves are about one half mature size.`,
                `Adding a spray in autumn, after leaf fall, will greatly increase control.`,
                `Application of balanced fertilizers and watering during dry periods will help the tree to recover strength after severe infections.`],
                link: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/anthracnose",
              },
              "turcicumleafblight": {
                desc: [`Integration of resistant varieties, good cultural and use of recommended fungicidesand biopesticides are necessary for the management of TLB.`,
                `Crop rotation of 1 to 2 years or deep burying of infested maize residues before maize hybrids wereplanted reduces over wintering of the fungus and decreases disease pressure.`,
                `Timely removal of over wintering infected crop residue will reduce the amount of available inoculums at the onset of the subsequent growing season.`],
                link: "https://www.researchgate.net/publication/309541038_Turcicum_leaf_blight-sustainable_management_of_a_re-emerging_maize_disease",
              },
        },
        Cotton: {
            "verticilliumwilt": {
                desc: [`Verticillium wilt is most severe during extended wet or overcast weather, waterlogging and in late maturing crops.`,
                `ushing the last irrigation to add further yield to the crop can allow the crop to be exposed to cooler weather which is ideal for Verticillium.`,
                `Most of the inoculum in furrow irrigated fields is found in the top 10cm of the permanent bed soil profile; this may increase the risk of disease in plants with a shallow root system.`,
                `Raking and burning is not a viable management option for reducing inoculum levels in soil. Instead it moves the pathogen around the field in the small trash material left behind. In fields where Verticillium wilt is present, the incorporation of trash as soon as possible after harvest is recommended to increase plant and trash breakdown.`],
                link: "https://www.cottoninfo.com.au/sites/default/files/documents/Vert%20update%20%28short%29%20-%20August%202016%20v3.pdf",
              },
              "bacterialblight": {
                desc: [`Classic symptoms of Bacterial blight including angular water-soaked lesions on the leaves, bracts and bolls and "black arm" on the petioles. Report any Bacterial blight symptoms on previously resistant cotton varieties.`,
                `Check your farm frequently for the presence of new pests and unusual symptoms. Make sure you are familiar with common cotton pests so you can tell if you see something different.`],
                link: "https://www.farmbiosecurity.com.au/wp-content/uploads/2019/03/Bacterial-blight-FS.pdf",
              },
        },
        Rice: {
            "riceblast": {
                desc: [`Symptoms can be either lesions or spots. Their shape, colour and size vary depending on varietal resistance, environmental conditions and the age of the lesions.`,
                `The disease is known to occur in Western Australia. However, it is a notifiable disease within the New South Wales Rice Pest and Disease Exclusion Zone (RPDEZ). This disease is not a notifiable pest outside the exclusion zone.`,
                `Rice blast is the most important disease of rice worldwide. Under favourable conditions, the disease can results in total crop failure.`],
                link: "https://www.agric.wa.gov.au/rice/rice-blast-disease",
              },
              "sheathblight": {
                desc: [`The early symptoms of sheath blight include oval circles on leaves just above the water line. They are usually pale, beige to pale green, with a darker border. Look for these lesions at the junction of the rice plant leaf and the sheath. The lesions can joint together as the disease progresses, moving up the plant.`,
                `Treating sheath blight of rice is possible using an integrated pest management approach. The first step in rice sheath blight control is to select resistant varieties of rice.`,
                `In addition, you should use sound cultural practices in terms of spacing rice plants (15 to 20 plants/per square foot) and planting times. Early planting and excess nitrogen applications are to be avoided. Foliar fungicide applications also work well as rice sheath blight control.`],
                link: "https://www.gardeningknowhow.com/edible/grains/rice/what-is-rice-sheath-blight.htm",
              },
        },
        Default: {
          suggestions: `
                Sorry, unable to detect the disease. Please upload more clear picture / Please check our Suggested Crops.
          `,
        },
    }

    const [image_object, setImageObject] = React.useState();
    const [image_object_details, setImage_object_details] = React.useState({});

    const [loading, setLoading] = React.useState(false);

    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const [state, setState] = React.useState({});

    // Upload Image and store as internal file
    const updateImageObject = (e) => {
        const file  = e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        // console.log(reader);
        reader.onload = () => {
            // setState({image_object: reader.result, image_object_details: {}});
            // console.log(reader.result);   
            setImageObject(reader.result);
            setImage_object_details({});
             
        };
        // console.log(image_object); 

        if(loading)
            setLoading(false);

    }


    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

    const handleButtonClick = () => {
        if (!loading) {
          setSuccess(false);
          setLoading(true);

        setState(() => {
    
            api("detect_image_objects", {
                // type,
                data: image_object
            }).then((response) => {
                
                const filtered_data = response[0];
                const image_details = image_object_details;  
                // console.log(filtered_data);                  
                
                if(filtered_data !== undefined){
                    image_details["disease"] = filtered_data.className;
                    image_details["probability"] = filtered_data.probability;
                    
                    setState({image_object_details: image_details });
                    setImage_object_details(image_details);
                    console.log(image_object_details)
                    setSuccess(true);
                    setLoading(false);
                }
            });
        });            

        }
      };
    

    return (
        <Container maxWidth="md" >
                <Grid container justify="center" spacing={3}>
                    <Typography variant="h4" color="secondary" component="h5">
                        Intelligent Disease Analyser
                    </Typography>
                </Grid>
                <Spacer height="25px"/><br></br>
                <Grid container justify="center" spacing={3}>
                    <Typography color="secondary">
                        Steps to follow:
                    </Typography>
                </Grid>
                <br></br>
                <Grid container justify="center" spacing={3}>
                    <Typography color="secondary">
                        1. Upload the infected crop area picture by clicking on <b>UPLOAD IMAGE</b> button.
                    </Typography>
                </Grid>                        
                <br></br>
                <Grid container justify="center" spacing={3}>
                    <Typography color="secondary">
                        2. Click on <b>ANALYSE</b> to predict and generate suggestions.
                    </Typography>
                </Grid>
                <br></br>
                <br></br>
                <Grid container justify="center" spacing={3}>
                    <Typography color="secondary" style={{fontSize: "14px",}}>
                        <ul>
                        <b>Supported Crop Diseases:</b>
                            <li>
                            <b>Wheat</b> (Fusarium head blight, Stem rust, Yellow rust), <b>Barley</b> (Fusarium head blight, Powdery mildew, Stem rust)
                            </li>
                            <li>
                            <b>Canola</b> (Downy mildew, Root Damping), <b>Sorghum</b> (Anthracnose, Turcicum leaf blight)
                            </li>
                            <li>
                            <b>Cotton</b> (Bacterial blight, Verticillium wilt) and <b>Rice</b> (Rice blast, Sheath blight)
                            </li>
                        </ul>
                    </Typography>
                </Grid>
                <br></br>
                <Grid container justify="center" spacing={3}>
                    <Typography color="secondary" variant="caption">
                        * Please wait for 5 to 10 seconds to generate accurate results.
                    </Typography>
                </Grid>
                    <br></br>
            <br></br>
            <Grid container justify="center" spacing={3}>
                {image_object && 
                    <img src={image_object} alt="" height="100vh"/>
                }
            </Grid>
                    <br></br>
                    <br></br>
                    <Grid container justify="center" spacing={3}>
                        <PageButton
                          variant="contained"
                          color="primary"
                          component="label"
                          >
                            Upload Image
                            <input accept="image/*" onChange={(e) =>  updateImageObject(e)} type="file" style={{ display: 'none' }} />
                        </PageButton>
                    </Grid>
            <br></br>
            <br></br>
                <Grid container justify="center" spacing={3}>
                    <Grid item >
                        {image_object && <Button onClick={handleButtonClick} variant="contained" color="primary">
                            Analyse 
                        </Button>}
                    </Grid>
                </Grid>
                <br></br><br></br>
                {/* {console.log(loading)} */}
                    {image_object_details.disease && image_object_details.probability >= 0.85 &&
                            <>
                                    <Typography color="secondary">
                                        Your crop is predicted as {image_object_details.disease.split(",")[0]} suffering from {image_object_details.disease.split(",")[1]} disease.
                                    </Typography>
                                    <br></br>
                                    <Typography color="secondary">
                                        Useful Suggestions:
                                        {cropDiseaseMap[image_object_details.disease.split(",")[0]][image_object_details.disease.split(",")[1].replace(/\s+/g, '').toLowerCase()].desc.map((points) =>
                                          <li>{points}</li>
                                        )}
                                    </Typography>
                                    <br></br>
                                    <Typography color="secondary">
                                        <a href={cropDiseaseMap[image_object_details.disease.split(",")[0]][image_object_details.disease.split(",")[1].replace(/\s+/g, '').toLowerCase()].link} target="new">Know more...</a>
                                    </Typography>
                            </>
                    }
                    {image_object_details.probability < 0.85 &&
                            <>
                                    <Typography color="secondary">
                                        {cropDiseaseMap.Default.suggestions}
                                    </Typography>
                            </>
                    }
                    {image_object && !image_object_details.disease && loading &&
                        <Grid container justify="center" spacing={3}>
                            <CircularProgress
                                color="secondary"
                            />
                        </Grid>
                    }
    </Container>
            );
          };


    //     return (

    //         <DisplayButtonComponent />

            
    //     )
    // }
// }

export default DisplayButtonComponent;

