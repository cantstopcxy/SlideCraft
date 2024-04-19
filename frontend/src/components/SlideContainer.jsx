import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

import { useSlide } from '../SlideContext';
import TextComponent from './editing/TextComponent';
import ImageComponent from './editing/ImageComponent';
import VideoComponent from './editing/VideoComponent';
import CodeComponent from './editing/CodeComponent';
import DraggableBox from './editing/DraggableBox';
import TextEditModal from './editing/TextEditModal';
import CodeEditModal from './editing/CodeEditModal';

function SlideContainer ({ currentSlideId, presentation }) {
  const { contents, deleteContent, updateContent, updatePosition } = useSlide();
  const [isTextModalOpen, setIsTextModalOpen] = React.useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = React.useState(false);
  const [editableContent, setEditableContent] = React.useState(null);

  const defaultBgColor = presentation && presentation.defaultBackgroundColor ? presentation.defaultBackgroundColor : 'white';
  const bgColor = presentation && presentation.slides && presentation.slides[currentSlideId] && presentation.slides[currentSlideId].backgroundColor
    ? presentation.slides[currentSlideId].backgroundColor
    : defaultBgColor;

  const handleDragStop = (contentId, data) => {
    const newPosition = { x: data.x, y: data.y };
    updatePosition(contentId, newPosition);
  };

  const handleDeleteContent = (contentId) => {
    console.log(contentId)
    deleteContent(contentId);
  };

  const handleDoubleClick = (contentId) => {
    const content = contents.find(c => c.id === contentId);
    setEditableContent(content);
    if (content.type === 'text') {
      setIsTextModalOpen(true);
    } else if (content.type === 'code') {
      console.log('clicked')
      setIsCodeModalOpen(true);
    }
  };

  const handleSaveChanges = (updatedContent) => {
    updateContent(updatedContent.id, updatedContent);
    setIsTextModalOpen(false);
    setIsCodeModalOpen(false);
  };

  const handleCloseModals = () => {
    setIsTextModalOpen(false);
    setIsCodeModalOpen(false);
  };

  return (
    <Container sx={{
      flexGrow: 1,
      overflow: 'auto',
      p: 3,
      '@media (max-height: 760px)': {
        maxHeight: '66.67%'
      },
      '@media (max-width: 980px)': {
        maxWidth: '90%',
        maxHeight: '110%'
      },
      '@media (max-Width: 640px)': {
        maxWidth: '80%',
        maxHeight: '110%'
      },
    }}>
      <Paper
        elevation={0}
        sx={{
          mx: 'auto',
          aspectRatio: '3 / 2',
          width: '90%',
          maxHeight: '100%',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: bgColor,
        }}
      >
        {contents.map((content) => {
          let Component;
          switch (content.type) {
            case 'text':
              Component = <TextComponent text={content.content} style={{ ...content.style, height: '100%', width: '100%' }} />;
              break;
            case 'image':
              Component = <ImageComponent src={content.src} alt={content.alt} style={{ height: '100%', width: '100%' }} />;
              break;
            case 'video':
              Component = <VideoComponent src={content.src} autoplay={content.autoplay} />;
              break;
            case 'code':
              Component = <CodeComponent code={content.code} language={content.language} style={{ ...content.style, height: '100%', width: '100%' }} />;
              break;
            default:
              Component = null;
          }
          return (
            <DraggableBox
              key={content.id}
              initialPosition={{ x: content.position.x, y: content.position.y }}
              onDragStop={(e, data) => handleDragStop(content.id, data)}
              onDelete={() => handleDeleteContent(content.id)}
              onDoubleClick={() => handleDoubleClick(content.id)}
              style={content.style}
            >
              {Component}
            </DraggableBox>
          );
        })}

        {/* show slide numbers at bottom left */}
        <Typography
          variant='body1'
          sx={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            width: '50px',
            height: '50px',
            fontSize: '1em',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: bgColor,
          }}
        >
          {currentSlideId}
        </Typography>
      </Paper>
      {isTextModalOpen && <TextEditModal content={editableContent} onClose={handleCloseModals} onSave={handleSaveChanges} />}
      {isCodeModalOpen && <CodeEditModal content={editableContent} onClose={handleCloseModals} onSave={handleSaveChanges} />}
    </Container>
  );
}

export default SlideContainer;
