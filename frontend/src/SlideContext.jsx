import React, { createContext, useEffect, useContext, useState } from 'react';
import { updateSlideContents } from './components/UpdateSlideContents';
import { fetchSlideContents } from './components/fetchSlideContents';

const SlideContext = createContext();

export const useSlide = () => useContext(SlideContext);

export const SlideProvider = ({ children, presentationId, slideId, token }) => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchSlideContents(token, presentationId, slideId)
      .then(data => {
        setContents(data || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching slide contents:', error);
        setIsLoading(false);
      });
  }, [presentationId, slideId, token]);

  useEffect(() => {
    if (!isLoading) {
      const syncContents = async () => {
        await updateSlideContents(token, presentationId, slideId, contents);
      };
      syncContents();
    }
  }, [contents, presentationId, slideId, token, isLoading]);

  const addContent = (newContent) => {
    setContents(currentContents => [...currentContents, newContent]);
  };

  const deleteContent = (contentId) => {
    setContents(currentContents => {
      const filteredContents = currentContents.filter(content => content.id !== contentId);
      return filteredContents;
    });
  };

  const updateContent = (contentId, newProps) => {
    setContents(currentContents =>
      currentContents.map(content =>
        content.id === contentId ? { ...content, ...newProps } : content
      )
    );
  };

  const updatePosition = (contentId, newPosition) => {
    setContents(currentContents =>
      currentContents.map(content =>
        content.id === contentId ? { ...content, position: newPosition } : content
      )
    );
  }

  return (
    <SlideContext.Provider value={{ contents, addContent, deleteContent, updateContent, updatePosition }}>
      {children}
    </SlideContext.Provider>
  );
};
