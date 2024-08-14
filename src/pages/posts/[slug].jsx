import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ArticleLayout } from '@/components/ArticleLayout';
import { getPost, getPosts } from '@/api/postsApi';
import { postParameters } from '@/lib/postUtilities';

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = postParameters(posts) || [];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);

  return {
    props: { initialPost: post || {} },
  };
}

const Post = ({ initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [error, setError] = useState(null);
  const { query } = useRouter();
  const { slug } = query;

  useEffect(() => {
    if (slug && !initialPost) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/posts/${slug}`);
          setPost(response.data);
        } catch (error) {
          console.error('Failed to fetch post:', error);
          setError(
            error.response?.data?.message || 'An unknown error occurred.'
          );
        }
      };

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
