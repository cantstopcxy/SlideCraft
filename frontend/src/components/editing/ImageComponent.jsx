import React from 'react';

const ImageComponent = ({ src, alt, style }) => {
  return (
    <div
      aria-label={alt}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
    />
  );
};

export default ImageComponent;
