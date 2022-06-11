import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";
import RestaurantCard from "./RestaurantCard";
import { styled } from "@mui/material";
import Container from "@mui/system/Container";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import GppBadIcon from "@mui/icons-material/GppBad";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

export default function FailingRestaurantGrid(props) {
  const geolocation = useGeolocation({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [hasCoords, setHasCoords] = useState(false);
  const [apiURL, setApiURL] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

  useLayoutEffect(() => {
    if (geolocation.error) {
      setError(geolocation.error);
    }
    setLatitude(geolocation.latitude);
    setLongitude(geolocation.longitude);
    setHasCoords(true);
  });

  useEffect(() => {
    const getAPIUrl = async () => {
      setApiURL(
        `https://data.cityofchicago.org/resource/4ijn-s7e5.json?$order=inspection_date DESC&$where=within_circle(location,  ${longitude}, ${latitude},1000)&results=Fail&$limit=12`
      );
    };
    getAPIUrl();
  }, [latitude, longitude]);

  useEffect(() => {
    const getRestaurants = async () => {
      const apiResponse = axios.get(apiURL).then((res) => {
        setIsLoaded(true);
        setRestaurant(res.data);
      });
    };
    if (apiURL) {
      getRestaurants();
    }
  }, [apiURL]);

  let cardResponse;
  if (error) {
    cardResponse = <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    cardResponse = <div>Loading...</div>;
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
        />
      </Grid>
    ));
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" sx={{ px: 2 }}>
        These eats are dirty! <GppBadIcon htmlColor="red" />
      </Typography>
      <Box sx={{ flexGrow: 1, mt: 2, px: 2 }}>
        <Grid container spacing={2}>
          {cardResponse}
        </Grid>
      </Box>
    </Container>
  );
}
