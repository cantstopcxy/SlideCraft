import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteSlide from '../components/DeleteSlide';

import EditTitle from '../components/EditTitle';
import EditSideBar from '../components/EditSideBar';
import SlideContainer from '../components/SlideContainer';
import getData from '../getStore';
import addNewSlide from '../components/AddNewSlide';
import ArrowNavButtons from '../components/ArrowNavButton';
import BGColor from '../components/BGColor';

// page for editing presentations -> path for edit page needs unique presentation id
function EditPresentation ({ token }) {
  const { presentationId, slideId } = useParams();
  const [presentation, setPresentation] = React.useState(null);
  const [presentations, setPresentations] = React.useState([]);
  const [numOfSlides, setNumOfSlides] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const navigate = useNavigate();

  const fetchPresentation = async () => {
    try {
      const response = await getData(token);
      if (response && response.data && response.data.store) {
        setPresentations(response.data.store);
        // make sure id is string
        const presentationData = response.data.store[presentationId];
        if (presentationData) {
          setPresentation(presentationData);
          setTitle(presentationData.title);
          const keys = Object.keys(presentationData.slides);
          const maxKey = Math.max(...keys.map(key => parseInt(key, 10)));
          setNumOfSlides(maxKey);
        } else {
          console.error('Presentation not found:', presentationId);
        }
      }
    } catch (error) {
      console.error('Failed to fetch presentation:', error);
    }
  };

  React.useEffect(() => {
    fetchPresentation();
  }, [presentationId, token, numOfSlides]);

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };
  React.useEffect(() => {
    setTitle(title);
  }, [title]);

  // console.log(presentation);
  // console.log(numOfSlides);
  const iconSize = '1em';
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <EditSideBar token={token} presentationId={presentationId} />

      {/* main editing view */}
      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Preview button */}
        <IconButton
          aria-label='preview'
          sx={{
            bgcolor: '#ACACAD',
            color: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: 16,
            left: 16,
          }}
          onClick={() => navigate(`/preview/${presentationId}/${slideId}`)}
        >
          Preview
        </IconButton>

        {/* title editing */}
        <Box
        sx={{
          position: 'absolute',
          top: 30,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant='h4'>{title}</Typography>
          <EditTitle size='small' presentationId={presentationId} presentation={presentation} title={title} updateTitle={updateTitle} token={token}></EditTitle>
        </Box>
        {/* Home button */}
        <IconButton
          aria-label='home'
          onClick={() => navigate('/dashboard')}
          sx={{
            bgcolor: '#ACACAD',
            color: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <HomeIcon />
        </IconButton>

        {/* Add slide button */}
        <IconButton
          aria-label='new slide'
          sx={{
            bgcolor: '#ACACAD',
            color: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            right: 16,
            transform: 'translateY(-50%)',
          }}
          onClick={() => addNewSlide(token, presentations, presentationId, setNumOfSlides)}
        >
          <AddOutlinedIcon/>
        </IconButton>
        <DeleteSlide presentationId={presentationId} currentSlideId={slideId} iconSize={iconSize} token={token} numOfSlides={numOfSlides} setNumOfSlides={setNumOfSlides}
          // sx defined in DeleteSlide.jsx
        />
        {numOfSlides > 1 && (
          <ArrowNavButtons numOfSlides={numOfSlides} />
        )
        }
        <BGColor token={token} presentations={presentations} setPresentations={setPresentations} presentationId={presentationId} presentation={presentation} currentSlideId={slideId} setPresentation={setPresentation}/>

        {/* slide editing container */}
        <SlideContainer currentSlideId={slideId} presentation={presentation} />
      </Box>
    </Box>
  );
}

export default EditPresentation;
