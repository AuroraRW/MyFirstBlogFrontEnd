import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([]) // ✅ Removed TypeScript type

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors([])

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })

    const data = await res.json()

    if (res.ok) {
      const postId = data.post?.id || data.post?.slug || 'new' // adjust to match your backend
      router.push(`/posts/${postId}`)
    } else {
      setErrors(data.errors || ['Something went wrong'])
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.length > 0 && (
          <ul className="text-red-600">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}
