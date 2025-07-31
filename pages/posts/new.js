import React, { useState } from 'react';

function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const response = await fetch('http://localhost:5000/posts', { // Adjust port/url to match your backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();

    if (response.status === 201) {
      // Redirect to the new post (assuming route to view post)
      window.location.href = `/posts/${encodeURIComponent(data.post.title)}`;
    } else if (response.status === 400) {
      setErrors(data.errors);
    } else {
      setErrors(['Unknown error occurred']);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label><br />
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default NewPost;
