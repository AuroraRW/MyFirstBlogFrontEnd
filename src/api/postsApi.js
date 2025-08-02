import API from './axiosConfig'

export const getPosts = () => {
  try {
    return API.get('/posts/')
      .then((res) => res.data)
  }
  catch (e) {
    console.error(e)
    return []
  }
}

export const getPost = (postSlug) => {
  try {
    return API.get(`/posts/${postSlug}`)
      .then((res) => res.data)
  }
  catch (e) {
    console.error(e)
    return {}
  }
}

export const createPost = async ({ title, description }) => {
  if (!API) {
    throw ['API is not configured correctly.'];
  }

  try {
    const response = await API.post('/posts/', { title, description });
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw error.response.data.errors;
    }
    console.error(error);
    throw ['An unexpected error occurred.'];
  }
};
