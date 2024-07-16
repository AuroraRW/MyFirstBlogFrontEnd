import API from './axiosConfig'

export const getPosts = () => {
  try {
    return API.get('/posts/').then((res) => res.data)
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getPost = (postSlug) => {
  try {
    return API.get(`/posts/${postSlug}`).then((res) => res.data)
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const createPost = async (post) => {
  try {
    console.log('Creating post:', post)
    const response = await API.post('/posts', post)
    console.log('Post created:', response.data)
    //await new Promise((resolve) => setTimeout(resolve, 1000))
    return response.data.post
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message)
    throw error
  }
}
