import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
// import api from '../api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SlideCards = ({ presentations }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  console.log(presentations);
  if (!presentations || Object.keys(presentations).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {Object.entries(presentations).map(([id, presentation]) => (
        <Card key={id} sx={{
          minWidth: 100,
          maxWidth: 345,
          flexGrow: 1,
          flexBasis: 'calc(50% - 20px)',
          height: 'auto',
          aspectRatio: '2 / 1',
          display: 'flex',
          flexDirection: 'column',
          [theme.breakpoints.down(830)]: {
            '& .MuiCardContent-root': {
              height: '150% !important',
            }
          }
        }}>
          <CardMedia
            component="img"
            sx={{ height: 86.25, objectFit: 'cover', backgroundColor: presentation.thumbnail ? 'transparent' : 'grey' }}
            image={presentation.thumbnail} // Assuming placeholder.jpg is a grey square
            // alt={presentation.title}
            />
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant='h5' component='div'>
              {presentation.title}
            </Typography>
            {presentation.description && (
              <Typography variant='body2' color='text.secondary'>
                {presentation.description}
              </Typography>
            )}
            <Typography variant='body2' color='text.secondary'>
              Number of Slides: {Math.max(...Object.keys(presentation.slides).map(key => parseInt(key, 10)))}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate(`/edit/${id}/1`)}>Edit</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default SlideCards;
