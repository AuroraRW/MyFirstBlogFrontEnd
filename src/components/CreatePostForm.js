import React, { useState } from 'react';
import { createPost } from '../api/postsApi';
import { formatDate } from '../lib/formatDate';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [createdDate, setCreatedDate] = useState(new Date());
  const [errors, setErrors] = useState([]); // State to manage errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    try {
      const newPost = {
        title,
        description,
        body,
        createdDate: formatDate(createdDate.toISOString()) // Format the date before submission
      };
      
      const response = await createPost(newPost);
      
      if (response.status === 201) {
        console.log('Post created successfully:', response.data);
        // Reset the form after successful submission
        setTitle('');
        setDescription('');
        setBody('');
        setCreatedDate(new Date()); // Reset to current date/time
      } else {
        console.error('Unexpected response:', response);
        setErrors(['Unexpected response from the server.']);
      }
    } catch (error) {
      console.error('Error creating post:', error);

      if (error.response) {
        console.error('Server Error:', error.response.data);
        setErrors(error.response.data.errors || ['An error occurred while creating the post.']);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        setErrors(['Network error: Please check your internet connection.']);
      } else {
        console.error('Error:', error.message);
        setErrors([error.message]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Created Date:</label>
        <input
          type="datetime-local"
          value={createdDate.toISOString().slice(0, 16)} // Format the date input field
          onChange={(e) => setCreatedDate(new Date(e.target.value))}
          required
        />
      </div>
      <button type="submit">Create Post</button>
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default CreatePostForm;
