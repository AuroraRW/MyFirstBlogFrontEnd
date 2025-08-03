import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const response = await axios.post('http://localhost:8000/posts/', {
        title,
        description,
      });

      const { title: newTitle } = response.data.post;
      navigate(`/posts/${encodeURIComponent(newTitle)}`);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['Unexpected error occurred']);
      }
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
      )}
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
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default NewPost;