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


export const createPost = async (postData) => {
  try {
    const response = await API.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw error;
  }
}

