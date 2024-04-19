import React from 'react';
import ReactPlayer from 'react-player';

const VideoComponent = ({ src, style, autoplay }) => {
  return (
    <div style={{ ...style }}>
      <ReactPlayer url={src} playing={autoplay} width='100%' />
    </div>
  );
};

export default VideoComponent;
