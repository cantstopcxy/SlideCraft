import api from '../api';
const addNewSlide = async (token, presentations, presentationId, setNumOfSlides) => {
  try {
    console.log('Adding a new slide');
    console.log(presentations);
    const slides = presentations[presentationId].slides;
    const keys = Object.keys(slides);
    const maxKey = Math.max(...keys.map(key => parseInt(key, 10)));
    const newId = maxKey + 1;
    console.log(newId);
    presentations[presentationId].slides[newId] = {
      text: '',
      images: [],
      videos: [],
    };
    console.log(presentations[presentationId].slides);
    const putResponse = await api.put(
      '/store',
      { store: presentations },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
    console.log(putResponse);
    setNumOfSlides(prev => prev + 1);
  } catch (error) {
    console.error('Failed to add a new slide:', error);
  }
};

export default addNewSlide;
