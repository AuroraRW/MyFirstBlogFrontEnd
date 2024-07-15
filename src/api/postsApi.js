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

// // src/api/postsApi.js
// import API from './axiosConfig';

// export const getPosts = async () => {
//   try {
//     const response = await API.get('/posts/');
//     return response.data;
//   } catch (e) {
//     console.error(e);
//     return [];
//   }
// };

// export const getPost = async (postSlug) => {
//   try {
//     const response = await API.get(`/posts/${postSlug}`);
//     return response.data;
//   } catch (e) {
//     console.error(e);
//     return {};
//   }
// };

// export const createPost = async (postData) => {
//   if (!API) {
//     throw new Error('API client is not configured correctly.');
//   }
//   try {
//     const response = await API.post('/posts', postData);
//     return response.data;
//   } catch (e) {
//     console.error('Error in createPost:', e.response ? e.response.data : e.message);
//     throw e;  // rethrow to handle it in the calling function
//   }
// };
