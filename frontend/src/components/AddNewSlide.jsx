import api from '../api';
// import getData from '../getStore';
const addNewSlide = async (token, presentations, presentationId) => {
  try {
    console.log('Adding a new slide');
    console.log(presentations);
    const slides = presentations[presentationId].slides;
    const keys = Object.keys(slides); // 获取所有键名，这是字符串数组
    const maxKey = Math.max(...keys.map(key => parseInt(key, 10))); // 转换为数字并找到最大值
    const newId = maxKey + 1; // 新的键值
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
  } catch (error) {
    console.error('Failed to add a new slide:', error);
  }
};

export default addNewSlide;
