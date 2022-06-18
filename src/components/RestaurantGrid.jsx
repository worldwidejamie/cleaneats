import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";
import RestaurantCard from "./RestaurantCard";
import Container from "@mui/system/Container";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

export default function RestaurantGrid(props) {
  const geolocation = useGeolocation({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [hasCoords, setHasCoords] = useState(false);
  const [apiURL, setApiURL] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [inspectionResults, setInspectionResults] = useState([]);
  useLayoutEffect(() => {
    if (geolocation.error) {
      setError(geolocation.error);
    }
    setLatitude(geolocation.latitude);
    localStorage.setItem("latitude", geolocation.latitude);
    setLongitude(geolocation.longitude);
    localStorage.setItem("longitude", geolocation.longitude);
    setHasCoords(true);
  });

  useEffect(() => {
    setInspectionResults(props.inspectionResult);
    const getAPIUrl = async () => {
      setApiURL(
        `https://data.cityofchicago.org/resource/4ijn-s7e5.json?$order=inspection_date DESC&$where=within_circle(location,  ${longitude}, ${latitude},1000)&results=${inspectionResults}&$limit=12`
      );
    };
    // getAPIUrl();
  }, [latitude, longitude]);

  useEffect(() => {
    const getRestaurants = async () => {
      // const apiResponse = axios.get(apiURL).then((res) => {
      //   setRestaurant(res.data);
      // });
    };
    if (apiURL) {
      getRestaurants();
    }
    if (restaurant.length > 0) {
      setIsLoaded(true);
    }
  }, [apiURL, restaurant]);
  let cardResponse;
  const skeletonCard = (
    <Skeleton>
      <Card></Card>
    </Skeleton>
  );
  const skeletonCardArray = Array(3).fill(skeletonCard);
  let eatsStatus;
  let statusIcon;
  if (inspectionResults === "Pass") {
    eatsStatus = "clean";
    statusIcon = <GppGoodIcon htmlColor="green" />;
  } else {
    eatsStatus = "not clean";
    statusIcon = <GppBadIcon htmlColor="red" />;
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
        />
      </Grid>
    ));
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" sx={{ px: 2 }}>
        These eats are {eatsStatus} {statusIcon}
      </Typography>
      <Box sx={{ flexGrow: 1, mt: 2, px: 2 }}>
        <Grid container spacing={2}>
          {cardResponse}
        </Grid>
      </Box>
    </Container>
  );
}
