/*import API from './axiosConfig'

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
  console.log("Calling:", `${process.env.NEXT_PUBLIC_API_URL}/posts/${postSlug}`);
  try {
    return API.get(`/posts/${postSlug}`)
      .then((res) => res.data)
  }
  catch (e) {
    console.error(e)
    return {}
  }
}
*/

import API from './axiosConfig'

export const getPosts = async () => {
  try {
    const res = await API.get('/posts/')
    return res.data
  } catch (e) {
    console.error('Error fetching posts:', e)
    return []
  }
}

export const getPost = async (postSlug) => {
  console.log("Calling:", `${process.env.NEXT_PUBLIC_API_URL}/posts/${postSlug}`);
  try {
    const res = await API.get(`/posts/${postSlug}`)
    return res.data
  } catch (e) {
    console.error('Error fetching post:', e)
    return {}
  }
}
