import { useState } from 'react';
import { useRouter } from 'next/router';

export function useCreatePost() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const createPost = async (payload) => {
    setError('');
    if (!payload.title || !payload.body || !payload.id || !payload.slug || !payload.createdDate) {
      setError('All fields are required.');
      return null;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_SERVER_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        // Post created successfully, just redirect to the list page
        router.push('/posts');
        return null;
      }

      if (res.status === 400) {
        const data = await res.json();
        setError(Array.isArray(data?.errors) ? data.errors.join(', ') : 'Validation failed.');
        return null;
      }

      setError(`Unexpected error: ${res.status}`);
      return null;
    } catch (err) {
      console.error(err);
      setError('Network error. Is the API running?');
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return { createPost, submitting, error };
}
