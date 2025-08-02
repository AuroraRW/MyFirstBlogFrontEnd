import { useState } from 'react';
import { useRouter } from 'next/router';
import { createPost } from '../../api/postsApi';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const result = await createPost({ title, description });
      const slug = result.post.slug;
      router.push(`/posts/${slug}`);
    } catch (err) {
      setErrors(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>

      {errors.length > 0 && (
        <ul className="bg-red-100 text-red-800 px-4 py-2 mb-4 rounded">
          {errors.map((err, idx) => (
            <li key={idx}>• {err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
