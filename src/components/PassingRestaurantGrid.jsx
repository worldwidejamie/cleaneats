import * as React from 'react';
import { styled } from '@mui/material';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Typography } from '@mui/material';

export default function PassingRestaurantGrid() {
	return (
	<Container sx={{mt: 4,}}>
		<Typography variant="h4" component="h2" sx={{px: 2}}>
			These eats are verified clean!
			</Typography>
			<Box sx={{flexGrow: 1, mt: 2, px: 2}}>
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
	</Container>
	)
}