/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Articles } from '../../../globalTypes/newsType';

interface Props {
  articles: Articles
}

const CardComponent = (props: Props) => (
  <Box
    sx={{
        width: '100%', alignItems: 'center', paddingTop: '40px',
    }}
  >
    <Card elevation={10} sx={{ maxWidth: 700, m: 'auto' }}>
      <CardMedia
        component="img"
        height="140"
        sx={{ padding: '1em 1em 0 1em', objectFit: 'cover' }}
        image={props.articles.urlToImage}
        alt="error"
      />
      <CardContent color="primary.main">
        <Typography gutterBottom variant="h5" component="div">
          {props.articles.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.articles.description}
        </Typography>
      </CardContent>

    </Card>
  </Box>
  );
export default CardComponent;
