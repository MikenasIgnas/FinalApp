/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Results } from '../../../globalTypes/newsType';

interface Props {
  results: Results
}

const FinancialNewsCard = (props: Props) => {
  const navigate = useNavigate();

  return (
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
          image={props.results.image_url}
          alt="error"
        />
        <CardContent color="primary.main">
          <Typography gutterBottom variant="h5" component="div">
            {props.results.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.results.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/post/${props.results.id}`)}>Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
export default FinancialNewsCard;
