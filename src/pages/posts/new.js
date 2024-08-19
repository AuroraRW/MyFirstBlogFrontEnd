import React, { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../../api/axiosConfig';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]); // Clear previous errors

    // Basic validation
    if (!title || !body) {
      setErrors(['Title and body are required fields.']);
      return;
    }

    try {
      const response = await API.post('/posts/new', { title, description, body });
      if (response.status === 201) {
        // Extract necessary data from the response
        const post = response.data.post;
        // Redirect to the newly created post's page using its slug
        router.push(`/posts/${post.slug}`);
      }
    } catch (error) {
      console.error('Error response:', error.response); // Log the full error response
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['An unknown error occurred.']);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create New Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="body" style={styles.label}>
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Create Post
        </button>
        {errors.length > 0 && (
          <ul style={styles.errorList}>
            {errors.map((error, index) => (
              <li key={index} style={styles.errorItem}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#1a1a2e',
    minHeight: '100vh',
  },
  header: {
    fontSize: '2.5em',
    color: '#e94560',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    padding: '25px',
    backgroundColor: '#16213e',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1.1em',
    borderRadius: '5px',
    border: '1px solid #4e4e50',
    backgroundColor: '#0f3460',
    color: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '1.1em',
    borderRadius: '5px',
    border: '1px solid #4e4e50',
    backgroundColor: '#0f3460',
    color: '#fff',
    minHeight: '120px',
  },
  button: {
    width: '100%',
    padding: '12px 20px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#e94560',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#f0515f',
  },
  errorList: {
    marginTop: '20px',
    listStyleType: 'none',
    padding: '0',
    color: '#ff6b6b',
  },
  errorItem: {
    marginBottom: '8px',
  },
};

export default NewPost;
