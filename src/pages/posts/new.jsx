import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import { createPost } from '@/api/postsApi'

export default function CreatePostPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    console.log('Creating post:', { title, body })
    try {
      const newPost = await createPost({ title, body })
      if (newPost?.slug) {
        await router.push(`/posts/${newPost.slug}`)
      } else {
        throw new Error('No slug returned from API')
      }
    } catch (err) {
      console.error(err)
      setError("Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Create Post - Spencer Sharp</title>
        <meta name="description" content="Write and publish a new post." />
      </Head>

      <SimpleLayout
        title="Create a new post"
        intro="Use the form below to write and publish a new post."
      >
        <div className="max-w-7xl mx-auto px-6 space-y-6 w-full">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-zinc-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-zinc-700">Body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 h-60 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 min-w-[140px]"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Create Post'}
              </button>
            </form>
          </Card>
        </div>
      </SimpleLayout>
    </>
  )
}
