import api from '../api';
import getData from '../getStore';

export const updateSlideContents = async (token, presentationId, slideId, newContents) => {
  try {
    const detailResponse = await getData(token);
    const content = detailResponse.data.store;

    content[presentationId].slides[slideId].content = newContents;

    const response = await api.put(
      '/store',
      { store: content },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};
