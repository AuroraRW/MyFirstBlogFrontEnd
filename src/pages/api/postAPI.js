import API from './axiosConfig';

export const getPosts = async () => { // Made async
  try {
    const response = await API.get('/posts/'); // Await the API call
    return response.data;
  } catch (e) {
    console.error('Error fetching posts:', e);
    return [];
  }
};

export const getPost = async (postSlug) => { // Also made async for consistency
  try {
    const response = await API.get(`/posts/${postSlug}`); // Await the API call
    return response.data;
  } catch (e) {
    console.error(`Error fetching post with slug ${postSlug}:`, e);
    return {};
  }
};1

export const createPost = async (title, description) => {
  try {
    const response = await API.post('/posts/', { title, description });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error during post creation:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('Network Error during post creation:', error.request);
      throw { errors: ["No response from server. Please check your network connection or ensure the backend is running."] };
    } else {
      console.error('Unexpected Error during post creation:', error.message);
      throw { errors: ["An unexpected error occurred while trying to create the post."] };
    }
  }
};