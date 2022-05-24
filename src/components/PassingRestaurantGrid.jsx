import * as React from "react";
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
import GppGoodIcon from "@mui/icons-material/GppGood";

export default function PassingRestaurantGrid(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [restaurant, setRestaurant] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://data.cityofchicago.org/resource/4ijn-s7e5.json?results=Pass&$limit=6"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRestaurant(result);
        },
        (error) => {
          setIsLoaded(true);
          setRestaurant(error);
        }
      );
  }, []);

  let cardResponse;
  if (error) {
    cardResponse = <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    cardResponse = <div>Loading...</div>;
  } else {
    cardResponse = restaurant.map((restaurant) => (
      <Grid item sm={6} md={4}>
        <RestaurantCard
          key={restaurant.restaurant_id}
          restaurant={restaurant}
          restaurantName={restaurant.aka_name}
          restaurantGrade={restaurant.results}
          testDate={restaurant.inspection_date}
        />
      </Grid>
    ));
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" sx={{ px: 2 }}>
        These eats are verified clean! <GppGoodIcon htmlColor="green" />
      </Typography>
      <Box sx={{ flexGrow: 1, mt: 2, px: 2 }}>
        <Grid container spacing={2}>
          {cardResponse}
        </Grid>
      </Box>
    </Container>
  );
}
