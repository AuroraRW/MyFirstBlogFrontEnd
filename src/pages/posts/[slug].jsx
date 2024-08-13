// src/pages/posts/[slug].jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ArticleLayout } from '@/components/ArticleLayout';
import { getPost, getPosts } from "@/api/postsApi";
import { postParameters } from "@/lib/postUtilities";

export async function getStaticPaths() {
  const posts = await getPosts();
  const postParams = posts ? postParameters(posts) : [];

  return {
    paths: postParams,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const currentPost = await getPost(context.params.slug);

  return {
    props: { post: currentPost || {} },
  };
}

const Post = ({ post }) => {
  const [error, setError] = useState(null);
  const [fetchedPost, setFetchedPost] = useState(post);
  const router = useRouter();
  const { slug } = router.query; // Get the dynamic route parameter

  useEffect(() => {
    if (slug && !post) {
      axios.get(`/api/posts/${slug}`) // Fetch the post data using the slug
        .then(response => {
          console.log('API Response:', response.data); // Log the response data
          setFetchedPost(response.data);
        })
        .catch(error => {
          console.error('Error Response:', error); // Log the full error response
          if (error.response) {
            console.error('Error Response Data:', error.response.data); // Log error response data
            const errorMessage = error.response.data.message || 'An unknown error occurred.';
            setError(`Failed to load post: ${errorMessage}`);
          } else {
            setError('Failed to load post: An unknown error occurred.');
          }
        });
    }
  }, [post, slug]);

  if (error) return <p>{error}</p>;
  if (!fetchedPost) return <p>Loading...</p>; // Show loading state while data is being fetched

  const formattedDate = new Date(fetchedPost.createdDate).toLocaleDateString();

  const meta = {
    author: 'Spencer Sharp',
    date: fetchedPost.createdDate,
    title: fetchedPost.title,
    description: fetchedPost.body,
  };

  return (
    <ArticleLayout meta={meta}>
      <div>
        <h1>{fetchedPost.title}</h1>
        <p>{fetchedPost.body}</p>
        <p>Created on: {formattedDate}</p>
      </div>
    </ArticleLayout>
  );
};

export default Post;
