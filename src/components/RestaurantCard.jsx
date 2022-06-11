import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function capitalCase(str) {
  let lowercaseString = str.toLowerCase();
  let splitString = lowercaseString.split(" ");
  for (let i = 0; i < splitString.length; i++) {
    splitString[i] =
      splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1);
  }
  return splitString.join(" ");
}

const cleanDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toDateString();
};

export default function RestaurantCard(props) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardHeader
        title={capitalCase(props.restaurantName)}
        // title={props.restaurantName}
        subheader={props.restaurantGrade}
      />
      <CardContent>
        <CardMedia
          component="img"
          image="https://images.squarespace-cdn.com/content/v1/600a96cbf8894d79eb1e1b1f/1611317333085-PBPKUT3S28T0CV0IJUL8/_34A7895-min.jpg?format=1500w"
          alt="Beard Papa's restaurant facade"
        />
        <div className="test-date">
          Testing Date: {cleanDate(props.testDate)}
        </div>
      </CardContent>
    </Card>
  );
}
