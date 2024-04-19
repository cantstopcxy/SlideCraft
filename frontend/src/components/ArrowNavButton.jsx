import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ArrowNavButtons ({ numOfSlides, currentSlideId, setCurrentSlideId }) {
  // const [newSlideId, setNewSlideId] = React.useState(1);
  const goToPrevious = () => {
    setCurrentSlideId(prev =>
      prev > 1 ? prev - 1 : prev
      // update current slide id passed to 'EditPresentation'(same as newSlideId)
    );
    // console.log(newSlideId);
  }
  const goToNext = () => {
    setCurrentSlideId(prev =>
      prev < numOfSlides ? prev + 1 : prev
    );
    // console.log(newSlideId);
  }
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

    // remove it after doing one navigation move
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideId, numOfSlides]);
  return (
    <>
      {currentSlideId > 1 && (
        <IconButton
        aria-label="previous slide"
        onClick={() => goToPrevious()}
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
        onClick={() => goToNext()}
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
