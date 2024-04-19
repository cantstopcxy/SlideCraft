import getData from '../getStore';

export async function fetchSlideContents (token, presentationId, slideId) {
  try {
    const response = await getData(token);
    const content = response.data.store;
    return content[presentationId].slides[slideId].content;
  } catch (err) {
    console.error(err);
  }
}
