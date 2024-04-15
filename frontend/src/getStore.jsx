import api from './api';

const getData = async (token) => {
  try {
    const response = await api.get('/store', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (err) {
    alert(err.response.data.error);
    return null;
  }
};

export default getData;
