// src/pages/posts/new.jsx
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SimpleLayout } from '@/components/SimpleLayout';
import PostForm from '@/components/PostForm';

const createPost = async (postData) => {
  const API_URL = 'http://localhost:5000/posts';
  try {
    const response = await axios.post(API_URL, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    console.error('Error in createPost:', e.response ? e.response.data : e.message);
    throw e;  // rethrow to handle it in the calling function
  }
};

export default function NewPostPage() {
  const [errors, setErrors] = useState(null);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    console.log('Form data submitted:', formData);
    try {
      const response = await createPost(formData);
      console.log('Post created:', response);

      const post = response.post;
      if (post && post.slug) {
        console.log('created:', post.slug); 
        router.push(`/posts/${post.slug}`);
      } else {
        throw new Error('Post slug is missing in the response');
      }
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ message: 'Something went wrong. Please try again.' }]);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create New Post - Spencer Sharp</title>
        <meta
          name="description"
          content="Create a new post for the blog."
        />
      </Head>
      <SimpleLayout
        title="Create a New Post"
        intro="Fill in the details below to create a new post."
      >
        <PostForm onSubmit={handleSubmit} errors={errors} />
      </SimpleLayout>
    </>
  );
}
