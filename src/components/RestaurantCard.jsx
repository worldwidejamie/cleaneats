import React, {useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import RestaurantGrid from "./RestaurantGrid";

RestaurantGrid.propTypes = {
  restaurantName: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  address: PropTypes.string
};

function capitalCase(str) {
  let lowercaseString = str.toLowerCase();
  let splitString = lowercaseString.split(" ");
  for (let i = 0; i < splitString.length; i++) {
    splitString[i] =
        splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1);
  }
  return splitString.join(" ");
}

const modalStyle = {
  position: "absolute",
  marginTop: "25vmin",
  padding: "1.25rem",
  left: "27.5vw",
  right: "auto",
  bottom: "auto",
  height: "auto",
  width: "45vw",
  border: "red solid 1px",
  backgroundColor: "#fff",
};

const cleanDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toDateString();
};



export default function RestaurantCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
      <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
          onClick={handleOpen}

      >
        <CardHeader
            /* eslint-disable-next-line react/prop-types */
            title={capitalCase(props.restaurantName)}
            // title={props.restaurantName}
            /* eslint-disable-next-line react/prop-types */
            subheader={props.restaurantGrade}
        />
        <CardContent>
          <CardMedia
              component="img"
              image="https://images.squarespace-cdn.com/content/v1/600a96cbf8894d79eb1e1b1f/1611317333085-PBPKUT3S28T0CV0IJUL8/_34A7895-min.jpg?format=1500w"
              alt="Beard Papa's restaurant facade"
          />
          <div className="test-date">
            {/* eslint-disable-next-line react/prop-types */}
            Testing Date: {cleanDate(props.testDate)}
          </div>
        </CardContent>
        <Modal
            open={open}
            aria-labelledby="restaurant-modal"
            onClose={handleClose}
            // TODO: add Modal description
            aria-describedby="restaurant-modal-description"
        >
          <Card style={modalStyle}>
            {/* eslint-disable-next-line react/prop-types */}
            <h2>{capitalCase(props.restaurantName)}</h2>
            <span>Latitude: {props.latitude}</span><br/>
            <span>Longitude: {props.longitude}</span><br/>
            <span>Address: {props.address}</span><br/>`
          </Card>
        </Modal>
      </Card>
  );
}
