import React, {useLayoutEffect, useState} from "react";
import creds from "../../creds.js";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";
import RestaurantCard from "./RestaurantCard";
import Container from "@mui/system/Container";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PropTypes from "prop-types";

RestaurantGrid.propTypes = {
  children: PropTypes.any,
  inspectionResult: PropTypes.string,
};


// TODO: Find out why it's making so many requests to the server.
const getPlaceDetails = async (restaurant) => {
  const getRestaurantID = await axios({
    method: "get",
    url: `/api/maps/api/place/findplacefromtext/json`,
    params: {
      input: restaurant.aka_name,
      inputtype: "textquery",
      key: creds.googleAPIKey,
      locationbias:"point:${restaurant.latitude},${restaurant.longitude}",
    },
  }).then((res) => {
    if (res.data.candidates.length > 0) {
      return res.data.candidates[0].place_id;
    }
  })

  return axios({
    method: "get",
    url: `/api/maps/api/place/details/json`,
    params: {
      place_id: getRestaurantID,
      key: creds.googleAPIKey,
      fields: "url"
    }
  }).then((res) => {
    return res.data.result
  });
}

const getRestaurants = async (latitude, longitude, inspectionResult) => {

  return await axios({
    method: "get",
    url: `/resource/4ijn-s7e5.json`,
    baseURL: "https://data.cityofchicago.org/",
    responseType: "json",
    params: {
      $order: "inspection_date DESC",
      $where: `within_circle(location,  ${longitude}, ${latitude},1000) AND facility_type='Restaurant'`,
      results: inspectionResult,
      $limit: "9",
    },
  })
      .then((res) => {
        return res.data
      });
};


export default function RestaurantGrid(props) {
  const geolocation = useGeolocation({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [inspectionResult, setInspectionResult] = useState(
      props.inspectionResult
  );

  // Get and Set Geolocation
  useLayoutEffect(() => {
    if (geolocation.error) {
      setError(geolocation.error);
    }
    setLatitude(geolocation.latitude);
    // eslint-disable-next-line no-undef
    localStorage.setItem("latitude", geolocation.latitude);
    setLongitude(geolocation.longitude);
    // eslint-disable-next-line no-undef
    localStorage.setItem("longitude", geolocation.longitude);
  }, [latitude, longitude, geolocation]);

  // Get and Set Restaurant Data
  useLayoutEffect(() => {
    let restaurants = [];
    setInspectionResult(props.inspectionResult);
    if (restaurant.length === 0) {
      getRestaurants(latitude, longitude, inspectionResult).then((res) => {
        res.forEach((rest) => {
          getPlaceDetails(rest).then((res) => {
            rest.url = res.url
          })
          restaurants.push(rest)
        })
        setRestaurant(restaurants)
        setIsLoaded(true)
      })
    }
  }, [
    restaurant,
    longitude,
    latitude,
    props.inspectionResult,
    inspectionResult,
    isLoaded
  ]);


  let cardResponse;
  let eatsStatus;
  let statusIcon;

  if (inspectionResult === "Pass") {
    eatsStatus = "clean";
    statusIcon = <GppGoodIcon htmlColor="green"/>;
  } else {
    eatsStatus = "not clean";
    statusIcon = <GppBadIcon htmlColor="red"/>;
  }

  if (error) {
    cardResponse = <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    cardResponse = (
        <Grid item sm={6} md={4} key={restaurant.inspection_id}>
          <Card
              sx={{
                height: "auto",
                width: "25vw",
                padding: "1rem",
              }}
          >
            <Skeleton variant="text"></Skeleton>
            <Skeleton variant="text"></Skeleton>
            <Skeleton variant="text"></Skeleton>
            <Skeleton variant="rect">
              <CardMedia
                  component="img"
                  image="https://images.squarespace-cdn.com/content/v1/600a96cbf8894d79eb1e1b1f/1611317333085-PBPKUT3S28T0CV0IJUL8/_34A7895-min.jpg?format=1500w"
              />
            </Skeleton>
          </Card>
          {/*{console.log(props)}*/}
        </Grid>
    );
  } else {
    cardResponse = restaurant.map((restaurant) => (
        <Grid item sm={6} md={4} key={restaurant.inspection_id}>
          <RestaurantCard
              restaurant={restaurant}
              restaurantName={
                restaurant.aka_name ? restaurant.aka_name : restaurant.dba_name
              }
              restaurantGrade={restaurant.results}
              testDate={restaurant.inspection_date}
              address={restaurant.address}
              latitude={restaurant.latitude}
              longitude={restaurant.longitude}
          />
        </Grid>
    ));
  }
  return (
      <Container sx={{mt: 4}}>
        <Typography variant="h4" component="h2" sx={{px: 2}}>
          These eats are {eatsStatus} {statusIcon}
        </Typography>
        <Box sx={{flexGrow: 1, mt: 2, px: 2}}>
          <Grid container spacing={2}>
            {cardResponse}
          </Grid>
        </Box>
      </Container>
  );
}
