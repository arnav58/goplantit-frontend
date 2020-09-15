import React, { Fragment, useState, useEffect } from "react";

import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
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

const LocationPicker = () => {
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
  const [address, setAddress] = useState("");
  const [addressData, setAddressData] = useState([]);
  const getLocations = async () => {
    let baseUrl = "http://localhost:5000/api";
    //get hardcoded locations from the nodejs endpoints
    let res = await axios.get(baseUrl + "/misc/location");
    setAddressData(res.data);
  };

//   const getCoordination =()=>{
    
//     Geocode.fromAddress(address+", Australia").then(
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
        value={address["suburb"]}
        options={addressData}
        getOptionLabel={(option) => option.suburb+", "+option.postcode}
        style={{ width: 165 }}
        onChange={(event, newValue) => {
            console.log('selected')
          if (newValue) {
            setAddress(newValue);
            // setTimeout(()=>console.log("Setting address and get coordination"), 100)
            console.log("start sending google maps")
            Geocode.fromAddress(address+", Australia").then(
                response => {
                  const { lat, lng } = response.results[0].geometry.location;
                  console.log(lat, lng);
                }
              ).catch(err =>console.log(err));
            
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your Area"
            variant="outlined"
            onChange={(event) => {
              let newValue = event.target.value;

              if (addressData.length < 1 && newValue && newValue.length > 2) {
                console.log("Getting locations");
                getLocations();
              }
              // if (newValue) {
              //   setAddress(newValue);
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
