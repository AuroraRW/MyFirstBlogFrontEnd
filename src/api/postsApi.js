import API from './axiosConfig'

export const getPosts = async () => {
  console.log('Posting to URL:', API.defaults.baseURL)
  try {
    const res = await API.get('/posts/')
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getPost = async (postSlug) => {
  console.log('Posting to URL:', API.defaults.baseURL)
  try {
    const res = await API.get(`/posts/${postSlug}`)
    return res.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
// Added to handle post creation
export const createPost = async (post) => {
console.log("Posting to:", API.defaults.baseURL + '/posts')

  console.log('Creating post:', post)
  try {
    const res = await API.post('/posts', post)
    return res.data
  } catch (e) {
    console.error('Error creating post:', e)
    throw e
  }
}
