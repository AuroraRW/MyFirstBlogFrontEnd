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
    const res = await API.post('/posts/', postData)
    return res.data
  } catch (e) {
    console.error('Failed to create post:', e)
    throw e
  }
}
