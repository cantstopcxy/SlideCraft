import React from 'react';

const TextComponent = ({ text, style }) => {
  return (
    <textarea
      value={text}
      readOnly
      style={{
        ...style,
        position: 'absolute',
        border: '1px solid lightgrey',
        resize: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default TextComponent;
