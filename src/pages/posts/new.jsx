// src/pages/posts/new.jsx
import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import { SimpleLayout } from '@/components/SimpleLayout';
import PostForm from '@/components/PostForm';
import { ArticleLayout } from '@/components/ArticleLayout';

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
    throw e;
  }
};

export default function NewPostPage() {
  const [errors, setErrors] = useState(null);
  const [createdPost, setCreatedPost] = useState(null);

  const handleSubmit = async (formData) => {
    const validationErrors = [];

    if (!formData.title) {
      validationErrors.push({ message: "Title is required" });
    }

    if (!formData.description) {
      validationErrors.push({ message: "Description is required" });
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      console.log("Validation Errors:", validationErrors);
      return;
    }

    try {
      const response = await createPost(formData);
      console.log('Post created:', response);
      setCreatedPost(response.post);  // Store the created post in state
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ message: 'Something went wrong. Please try again.' }]);
      }
    }
  };

  if (createdPost) {
    const meta = {
      author: 'Spencer Sharp',
      date: createdPost.createdDate,
      title: createdPost.title,
      description: createdPost.body,
    };

    return (
      <ArticleLayout meta={meta}>
        {createdPost.body}
      </ArticleLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Create New Post - Spencer Sharp</title>
        <meta name="description" content="Create a new post for the blog." />
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
