// src/components/PostForm.jsx
import React, { useState } from 'react';
import { Button } from '@/components/Button';

export default function PostForm({ onSubmit, errors }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {errors && errors.length > 0 && (
        <div className="mb-4">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500 text-xs italic">
              {error.message}
            </p>
          ))}
        </div>
      )}
      <div className="mt-8 text-left">
        <Button type="submit" variant="secondary">
          Create Post
        </Button>
      </div>
    </form>
  );
}
