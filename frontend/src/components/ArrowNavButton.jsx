import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate, useParams } from 'react-router-dom';

function ArrowNavButtons ({ numOfSlides }) {
  const navigate = useNavigate();
  const { presentationId, slideId } = useParams(); // Get current slideId and presentationId from URL
  const currentSlideId = parseInt(slideId); // Ensure it's an integer

  const goToPrevious = () => {
    if (currentSlideId > 1) {
      const previousSlideId = currentSlideId - 1;
      navigate(`/edit/${presentationId}/${previousSlideId}`);
    }
  };

  const goToNext = () => {
    if (currentSlideId < numOfSlides) {
      const nextSlideId = currentSlideId + 1;
      navigate(`/edit/${presentationId}/${nextSlideId}`);
    }
  };

  React.useEffect(() => {
    console.log(currentSlideId);
  }, [currentSlideId]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      goToNext();
    }
  };

  // add event handlers for keyboard navigation
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideId, numOfSlides]);

  return (
    <>
      {currentSlideId > 1 && (
        <IconButton
          aria-label="previous slide"
          onClick={goToPrevious}
          sx={{
            bgcolor: '#ACACAD',
            color: 'white',
            borderRadius: '50%',
            position: 'absolute',
            bottom: 16,
            right: 64,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}

      {currentSlideId < numOfSlides && (
        <IconButton
          aria-label="next slide"
          onClick={goToNext}
          sx={{
            bgcolor: '#ACACAD',
            color: 'white',
            borderRadius: '50%',
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </>
  );
}

export default ArrowNavButtons;
