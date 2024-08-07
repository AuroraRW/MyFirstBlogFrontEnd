import JSON_CLIENT from '@/api/axiosConfig';

export const getPosts = async () => {
  try {
    const response = await JSON_CLIENT.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};

export const getPost = async (slug) => {
  try {
    const response = await JSON_CLIENT.get(`/posts/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};
