import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createPost } from '../api/postsApi';
 
const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = { title, description, body };
      const response = await createPost(newPost);
      console.log('Post created successfully:', response);
 
      // Redirect to the posts page or the newly created post's page
      router.push('/posts'); // or use `router.push(`/posts/${response.data.slug}`) if your API returns a slug
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
 
  return (
<form onSubmit={handleSubmit} style={styles.form}>
<div style={styles.formGroup}>
<label style={styles.label}>Title:</label>
<input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
</div>
<div style={styles.formGroup}>
<label style={styles.label}>Description:</label>
<input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.input}
        />
</div>
<div style={styles.formGroup}>
<label style={styles.label}>Body:</label>
<textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={styles.textarea}
        />
</div>
<button type="submit" style={styles.button}>Create Post</button>
</form>
  );
};
 
const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
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
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
 
export default CreatePostForm;