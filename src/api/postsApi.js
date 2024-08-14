const apiUrl = process.env.DOTNET_SERVER_URL || 'http://localhost:5000';

// Helper function for API requests
const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = `${apiUrl}${endpoint}`;
    console.log(`Fetching URL: ${url}`);
    console.log('Options:', options);

    const response = await fetch(url, options);

    if (!response.ok) {
      let errorDetails = 'No error details available.';
      try {
        // Try to parse the error details from the response body
        errorDetails = await response.text();
      } catch (err) {
        // If parsing fails, keep the default message
        console.error('Error details parsing failed:', err);
      }
      throw new Error(`Error ${options.method || 'GET'} ${endpoint}: ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    try {
      // Try to parse the JSON response
      return await response.json();
    } catch (err) {
      // If JSON parsing fails, fall back to plain text
      console.warn('Response is not JSON, returning text:', err);
      return response.text();
    }
  } catch (error) {
    console.error(`Error during ${options.method || 'GET'} request to ${endpoint}:`, error);
    throw error;
  }
};

// Fetch all posts
export const getPosts = () => fetchApi('/api/posts');

// Fetch a single post by slug
export const getPost = (slug) => fetchApi(`/api/posts/${slug}`);

// Create a new post
export const createPost = (post) => fetchApi('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(post),
});
