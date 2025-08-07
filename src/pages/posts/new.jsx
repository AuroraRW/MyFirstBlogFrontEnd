import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    // Client-side validation
    if (!title.trim()) {
      newErrors.push('Title cannot be blank');
    }

    if (!description.trim()) {
      newErrors.push('You cannot send a message with empty description');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (res.status === 201) {
        const slug = data?.post?.slug || title.toLowerCase().replace(/\s+/g, '-');
        router.push(`/posts/${slug}`);
      } else {
        setErrors(data.errors || ['Something went wrong']);
      }
    } catch (err) {
      console.error(err);
      setErrors(['Server error. Please try again later.']);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
