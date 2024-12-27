import axios from 'axios';

export const fetchJoke = async () => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error;
  }
};

export const fetchMemes = async () => {
  try {
    const response = await axios.get('https://memes.tw/wtf/api');
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching memes:', error);
    throw error;
  }
};

export const fetchCatImages = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching cat images:', error);
    throw error;
  }
};

export const fetchDogImages = async () => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random/10');
    console.log('API response:', response.data);
    return response.data; // 回傳完整的 response.data，包含 message 和 status
  } catch (error) {
    console.error('Error fetching dog images:', error);
    throw error;
  }
};