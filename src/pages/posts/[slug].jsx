// src/pages/posts/[slug].jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ArticleLayout } from '@/components/ArticleLayout';
import { getPost, getPosts } from "@/api/postsApi";
import { postParameters } from "@/lib/postUtilities";

export async function getStaticPaths() {
  try {
    const posts = await getPosts();
    const postParams = posts ? postParameters(posts) : [];

    return {
      paths: postParams,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const currentPost = await getPost(params.slug);
    return {
      props: { post: currentPost || null },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: { post: null },
    };
  }
}

const Post = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${slug}`);
        setPost(data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An unknown error occurred.';
        setError(`Failed to load post: ${errorMessage}`);
      }
    };

    if (slug && !initialPost) {
      fetchPost();
    }
  }, [slug, initialPost]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  const formattedDate = new Date(post.createdDate).toLocaleDateString();

  const meta = {
    author: 'Spencer Sharp',
    date: post.createdDate,
    title: post.title,
    description: post.body,
  };

  return (
    <ArticleLayout meta={meta}>
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>Created on: {formattedDate}</p>
      </div>
    </ArticleLayout>
  );
};

export default Post;
