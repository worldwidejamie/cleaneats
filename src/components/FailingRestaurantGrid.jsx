import * as React from "react";
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

export default function FailingRestaurantGrid() {
	return (
	<Box sx={{flexGrow: 1, mt: 4, px: 2}}>
		<Grid container spacing={2}>
			<Grid item sm={6} md={4}>
				<Card>
					<CardHeader
						title="Delicious Foods"
						subheader="Passing"
					/>
					<CardContent>
						<CardMedia
							component="img"
							image="https://images.squarespace-cdn.com/content/v1/600a96cbf8894d79eb1e1b1f/1611317333085-PBPKUT3S28T0CV0IJUL8/_34A7895-min.jpg?format=1500w"
							alt="Beard Papa's restaurant facade"
						/>
					</CardContent>
				</Card>
			</Grid>
			<Grid item sm={6} md={4}>
				<Card>
					<CardHeader
						title="Delicious Foods"
						subheader="Passing"
					/>
					<CardContent>
						<CardMedia
							component="img"
							image="https://images.squarespace-cdn.com/content/v1/600a96cbf8894d79eb1e1b1f/1611317333085-PBPKUT3S28T0CV0IJUL8/_34A7895-min.jpg?format=1500w"
							alt="Beard Papa's restaurant facade"
						/>
					</CardContent>
				</Card>
			</Grid>
			<Grid item sm={6} md={4}>
				<Card>
					<CardHeader
						title="Delicious Foods"
						subheader="Passing"
					/>
					<CardContent>
						<CardMedia
							component="img"
							image="https://images.squarespace-cdn.com/content/v1/600a96cbf8894d79eb1e1b1f/1611317333085-PBPKUT3S28T0CV0IJUL8/_34A7895-min.jpg?format=1500w"
							alt="Beard Papa's restaurant facade"
						/>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	</Box>
	)
}