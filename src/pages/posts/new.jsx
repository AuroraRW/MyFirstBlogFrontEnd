import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server returned an error:", errorText);

        try {
          const errorData = JSON.parse(errorText);
          setErrors(errorData.errors || ["Unexpected error occurred"]);
        } catch (parseError) {
          setErrors([errorText]);
        }
        return;
      }

      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } catch (error) {
      console.error("Network error or issue with fetch:", error);
      setErrors(["Failed to create post. Please try again later."]);
    }
  };

  return (
    <div className="max-w-md  mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>
      {errors.length > 0 && (
        <ul className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter the title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter the description"
            rows="4"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}