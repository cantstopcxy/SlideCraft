import getData from '../getStore';
import api from '../api';

const createPresentation = async (event, token, title, handleClose, addNewPresentation) => {
  event.preventDefault();
  try {
    // get backend data to identify the sequence number of the current presentation
    const detailResponse = await getData(token);
    if (!detailResponse || !detailResponse.data || !detailResponse.data.store) {
      console.error('No store data available');
      return;
    }
    const content = detailResponse.data.store;
    console.log(content);
    const keys = Object.keys(content);
    const currentKeyId = keys.length + 1;
    console.log(currentKeyId);
    content[currentKeyId] = {
      title, // use the title from the state
      slides: {
        1: {
          text: '',
          images: [],
          videos: [],
        },
      },
    };
    // // create an object with the title and the first page
    // content[currentKeyId] = {
    //   title, // use the title from the state
    //   slides: [
    //     {
    //       title: '',
    //       text: '',
    //       images: [],
    //       videos: [],
    //     },
    //   ], // initiate an empty array for key-values storing slides info
    //   // modify it when necessary editing the content in slides
    // };
    // update with putting the data into store
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
    console.log(response);
    addNewPresentation(content);
    handleClose();
  } catch (err) {
    console.error(err);
  }
};

export default createPresentation;
