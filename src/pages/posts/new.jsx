import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPost } from '@/api/postsApi'

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors([])

    try {
      const data = await createPost({ title, description })
      router.push(`/posts/${data.post.slug}`)
    } catch (err) {
      const responseErrors = err.response?.data?.errors || ['Something went wrong. Please try again.']
      setErrors(responseErrors)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>New Post</title>
      </Head>
      <SimpleLayout
        title="Create a New Post"
        intro="Fill in the details below to publish a new blog post."
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">

          {errors.length > 0 && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4">
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter post description"
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>

        </form>
      </SimpleLayout>
    </>
  )
}
