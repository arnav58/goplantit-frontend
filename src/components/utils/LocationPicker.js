import React, { Fragment, useState, useEffect } from "react";

import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
//http helpers
import axios from "axios";
import Geocode from "react-geocode";


const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      color: theme.palette.primary.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      color: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      color: theme.palette.primary.main,
    },
    "&.uiOutlinedInput-input": {
      display: "flex",
    },

    height: "45px",
  },
}));

const LocationPicker = (props) => {
  ///the state changes from dashboard components to pass the change in this component back
  //up to parent component
  const {displayLocation, setDisplayLocation, setCookie, setCoordinates} = props


 // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBbkrDU1ytf5g4Q95CjLtPB2Q0RcvDP8tQ");
 
// set response language. Defaults to english.
Geocode.setLanguage("en");
 
// set response region. Its optional.
// return only australian cities
// Geocode.setRegion("au");
 
// Enable or disable logs. Its optional.
Geocode.enableDebug();


  const classes = useStyles();
  // const [location, setlocation] = useState("");

  const [locationData, setLocationData] = useState([]);
  
  const getLocations = async () => {
    let baseUrl = process.env.BASEURL?process.env.BASEURL:"https://goplantitbackend.herokuapp.com/api";
    //get hardcoded locations from the nodejs endpoints
    let res = await axios.get(baseUrl + "/misc/location");
    setLocationData(res.data);
  };

//   const getCoordination =()=>{
    
//     Geocode.fromlocation(location+", Australia").then(
//         response => {
//           const { lat, lng } = response.results[0].geometry.location;
//           console.log(lat, lng);
//         },
//         error => {
//           console.error(error);
//         }
//       );
      
//   }

  return (
    <Fragment>
      <Autocomplete
        classes={classes}
        id="combo-box-demo"
        value={displayLocation}
        disableClearable
        options={locationData}
        getOptionLabel={(option) => option.suburb+", "+option.postcode}
        style={{ width: 220 }}
        forcePopupIcon={false}
        onChange={(event, newValue) => {
          if (newValue) {
            setCookie("location", newValue)
            setDisplayLocation(newValue)
            // setTimeout(()=>console.log("Setting location and get coordination"), 100)

            ///map the address for request
            let requestAddress = `${newValue.suburb}, ${newValue.state} ${newValue.postcode},  Australia`
            console.log("start sending google maps")
            console.log(requestAddress)
            Geocode.fromAddress(requestAddress).then(
                response => {
                  const { lat, lng } = response.results[0].geometry.location;
                  setCookie("latLng", {lat,lng});
                  setCoordinates({lat,lng})
                }
              ).catch(err =>console.log(err));
            
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your Area"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              let newValue = event.target.value;

              if (locationData.length < 1 && newValue && newValue.length > 2) {
                console.log("Getting locations");
                getLocations();
              }
              // if (newValue) {
              //   setlocation(newValue);
              // }
            }}
            InputLabelProps={{
              style: {
                width: "100%",
                color: "#17B978",
                top: "-6px",
              },
            }}
          />
        )}
      />
    </Fragment>
  );
};

export default LocationPicker;
