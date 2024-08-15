import { useState } from 'react';
import { useRouter } from 'next/router';
import { createPost } from '@/api/postsApi';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const postData = {
        title,        
        body 
      };
      await createPost(postData);
      router.push('/posts'); // Redirect to the posts list after successful submission
    } catch (error) {
      setError('Failed to create post');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            Description blog
          </label>
          <input
            type="text"
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
