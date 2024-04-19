import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const DraggableBox = ({ children, onDragStop, initialPosition, onDelete, onDoubleClick, style }) => {
  const nodeRef = useRef(null);

  const handleRightClick = (event) => {
    event.preventDefault();
    onDelete();
  };

  const handleDoubleClick = () => {
    onDoubleClick();
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onStop={onDragStop}
      defaultPosition={initialPosition}
    >
      <div ref={nodeRef} style={{ position: 'absolute', ...style }} onContextMenu={handleRightClick} onDoubleClick={handleDoubleClick}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableBox;
