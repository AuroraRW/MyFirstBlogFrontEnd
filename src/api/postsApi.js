// src/api/postsApi.js

const apiUrl = process.env.DOTNET_SERVER_URL || 'http://localhost:5000';

export const getPosts = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/posts`);
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Error fetching posts: ${response.status} ${response.statusText} - ${errorDetails}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (slug) => {
  try {
    const response = await fetch(`${apiUrl}/api/posts/${slug}`);
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Error fetching post: ${response.status} ${response.statusText} - ${errorDetails}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await fetch(`${apiUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Error creating post: ${response.status} ${response.statusText} - ${errorDetails}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
