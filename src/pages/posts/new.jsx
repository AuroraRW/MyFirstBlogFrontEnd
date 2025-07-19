import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createPost } from '@/api/postsApi';

function NewPostPage() {
  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // State to manage feedback
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [createdPost, setCreatedPost] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    setErrors([]);
    setSuccessMessage(null);
    setCreatedPost(null);
    setIsLoading(true); 

    try {
      // (1) When Create Post button is clicked, post the form to the above API endpoint.
      const responseData = await createPost(title, description);

      // (2) If the post is successful, redirect to the new post.
      setSuccessMessage('Post created successfully!');
      setCreatedPost(responseData.post); 

      router.push(`/posts/${responseData.post.id}`);

      // Clear form fields after successful submission
      setTitle('');
      setDescription('');

    } catch (error) {
      // (3) If the post is not successful, display the errors on the form.
      if (error.errors && Array.isArray(error.errors)) {
        setErrors(error.errors);
      } else {
        // Fallback for unexpected error structures or network issues
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">New Blog Post</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Blog title"
            required 
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Blog content"
          ></textarea>
        </div>

        {/* Display error messages if the errors array is not empty */}
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <ul className="mt-2 list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Display success message and details of the created post if successful */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong> {successMessage}
            {createdPost && (
              <div className="mt-2 text-sm">
                <p><strong>Post ID:</strong> {createdPost.id}</p>
                <p><strong>Title:</strong> {createdPost.title}</p>
                <p><strong>Description:</strong> {createdPost.description}</p>
              </div>
            )}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Post...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPostPage;
