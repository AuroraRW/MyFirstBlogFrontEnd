import { useState } from 'react';
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
      if (error.response && error.response.data && error.response.data.errors) {
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
          <label htmlFor="title" style={styles.label}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description:</label>
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
          <label htmlFor="body" style={styles.label}>Body:</label>
          <textarea
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>Create Post</button>
        {errors.length > 0 && (
          <ul style={styles.errorList}>
            {errors.map((error, index) => (
              <li key={index} style={styles.errorItem}>{error}</li>
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
    padding: '50px',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  header: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px',
  },
  button: {
    width: '100%',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorList: {
    marginTop: '20px',
    listStyleType: 'none',
    padding: '0',
    color: 'red',
  },
  errorItem: {
    marginBottom: '5px',
  },
};

export default NewPost;
