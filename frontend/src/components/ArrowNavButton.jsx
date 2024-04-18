import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ArrowNavButtons ({ numOfSlides, setCurrentSlideId }) {
  const [newSlideId, setNewSlideId] = React.useState(1);
  const goToPrevious = () => {
    setNewSlideId(prev => {
      const nextId = prev > 1 ? prev - 1 : prev;
      setCurrentSlideId(nextId); // update current slide id passed to 'EditPresentation'(same as newSlideId)
      return nextId;
    });
    // console.log(newSlideId);
  }
  const goToNext = () => {
    setNewSlideId(prev => {
      const nextId = prev < numOfSlides ? prev + 1 : prev;
      setCurrentSlideId(nextId);
      return nextId;
    });
  }
  React.useEffect(() => {
    console.log(newSlideId);
  }, [newSlideId]);

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
  }, [newSlideId, numOfSlides]);
  return (
    <>
      {newSlideId > 1 && (
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

      {newSlideId < numOfSlides && (
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
