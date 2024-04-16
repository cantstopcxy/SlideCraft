import api from '../api';
import getData from '../getStore';

const changeTitle = async (
  event,
  token,
  presentationId,
  newTitle,
  updateTitle,
  handleClose
) => {
  event.preventDefault();
  try {
    const response = await getData(token);
    if (!response || !response.data || !response.data.store) {
      console.error('No store data available');
      return;
    }
    const content = response.data.store[presentationId];
    content.title = newTitle;
    const putResponse = await api.put(
      '/store',
      { store: response.data.store },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    console.log(putResponse);
    updateTitle(newTitle);
    handleClose();
  } catch (err) {
    console.error(err);
  }
};

export default changeTitle;
