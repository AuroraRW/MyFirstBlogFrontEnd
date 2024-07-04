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
