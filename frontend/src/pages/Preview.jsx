import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import TextComponent from '../components/editing/TextComponent';
import ImageComponent from '../components/editing/ImageComponent';
import VideoComponent from '../components/editing/VideoComponent';
import CodeComponent from '../components/editing/CodeComponent';
import getData from '../getStore';

const PreviewPage = ({ token }) => {
  const navigate = useNavigate();
  const { presentationId } = useParams();

  const [slides, setSlides] = useState({});
  const [currentSlideId, setCurrentSlideId] = useState(null);

  useEffect(() => {
    const fetchPresentationSlides = async () => {
      try {
        const response = await getData(token);
        const presentationData = response.data.store[presentationId];
        if (presentationData) {
          setSlides(presentationData.slides);
          setCurrentSlideId(Object.keys(presentationData.slides)[0]);
        } else {
          console.error('Presentation not found:', presentationId);
        }
      } catch (err) {
        console.error('Failed to fetch presentation:', err);
      }
    };

    fetchPresentationSlides();
  }, [token, presentationId]);

  const goToPreviousSlide = () => {
    const slideKeys = Object.keys(slides);
    const currentIndex = slideKeys.indexOf(currentSlideId);
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const newSlideId = slideKeys[newIndex];
      setCurrentSlideId(newSlideId);
      navigate(`/preview/${presentationId}/${newSlideId}`);
    }
  };

  const goToNextSlide = () => {
    const slideKeys = Object.keys(slides);
    const currentIndex = slideKeys.indexOf(currentSlideId);
    if (currentIndex < slideKeys.length - 1) {
      const newIndex = currentIndex + 1;
      const newSlideId = slideKeys[newIndex];
      setCurrentSlideId(newSlideId);
      navigate(`/preview/${presentationId}/${newSlideId}`);
    }
  };

  console.log(slides)

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box width="100%" height="100%" border="none" boxShadow="none" px='10px'>
        <div style={{ position: 'relative', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {Array.isArray(slides[currentSlideId]) && slides[currentSlideId].map((content, index) => {
            let Component;
            switch (content.type) {
              case 'text':
                Component = <TextComponent key={index} text={content.content} style={{ ...content.style, height: '100%', width: '100%' }} />;
                break;
              case 'image':
                Component = <ImageComponent key={index} src={content.src} alt={content.alt} style={{ height: '100%', width: '100%' }} />;
                break;
              case 'video':
                Component = <VideoComponent key={index} src={content.src} autoplay={content.autoplay} />;
                break;
              case 'code':
                Component = <CodeComponent key={index} code={content.code} language={content.language} style={{ ...content.style, height: '100%', width: '100%' }} />;
                break;
              default:
                Component = null;
            }
            return (
              <div key={index}>
                {Component}
              </div>
            );
          })}

          <IconButton style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }} onClick={goToPreviousSlide}>
            <ArrowBackIcon />
          </IconButton>

          <IconButton style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }} onClick={goToNextSlide}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default PreviewPage;
