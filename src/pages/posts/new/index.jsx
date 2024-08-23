import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function NewPost() {
  const router = useRouter()

  // State for form fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // State for errors
  const [errors, setErrors] = useState([])

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Prepare the post data
    const postData = { title, description }

    try {
      // Call backend API to create post
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json()

      // Handle success
      if (response.ok) {
        // Redirect to the new post
        router.push(`/posts/${data.post.slug}`)
      } else {
        // Set validation errors if any
        setErrors(data.errors || [])
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <>
      <Head>
        <title>Create New Post</title>
      </Head>

      <div className="max-w-2xl mx-auto mt-12">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

        {/* Display validation errors, if any */}
        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-100 text-red-700">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              rows="5"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Post
            </button>

            {/* Optional cancel button */}
            <Link href="/posts">
              <id className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                Cancel
              </id>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
