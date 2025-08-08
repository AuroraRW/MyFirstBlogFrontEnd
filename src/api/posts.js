import API from './axiosConfig'

export const createPost = async ({ title, description }) => {
  if (!API) throw new Error('API not configured. Set DOTNET_SERVER_URL in .env.local')

  try {
    const res = await API.post('/posts', { title, description })
    return { ok: true, data: res.data } // { post: { title, description } }
  } catch (err) {
    const errors = err?.response?.data?.errors ?? ['Unexpected error']
    return { ok: false, errors }
  }
}
