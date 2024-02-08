import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com';
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


export const addPost = async (postData) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, postData);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};