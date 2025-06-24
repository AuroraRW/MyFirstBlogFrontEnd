import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (res.status === 201) {
        // Redirect to post detail page (use title for now)
        router.push(`/posts/${title}`);
      } else {
        setErrors(data.errors || ['Something went wrong']);
      }
    } catch (err) {
      setErrors(['Failed to connect to server']);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Description:</label><br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Create Post</button>
      </form>

      {errors.length > 0 && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <h3>Errors:</h3>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
