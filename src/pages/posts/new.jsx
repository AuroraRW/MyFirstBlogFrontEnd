import { useState } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Prose } from '@/components/Prose'
import { createPost } from '@/api/posts'

function slugify(s) {
  return (s || '').trim().toLowerCase().split(/\s+/g).join('-')
}

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setErrors([])
    setSubmitting(true)

    const { ok, errors: apiErrors } = await createPost({ title, description })
    setSubmitting(false)

    if (ok) {
      const slug = slugify(title)
      router.push(slug ? `/posts/${slug}` : '/posts')
    } else {
      setErrors(apiErrors)
    }
  }

  return (
    <Container className="mt-16 sm:mt-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-zinc-800 sm:text-4xl mb-6">
          Create a New Post
        </h1>
        <Prose>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-zinc-800">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 block w-full rounded-md border border-zinc-300 px-3 py-2"
                placeholder="Some title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-800">
                Description
              </label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 block w-full rounded-md border border-zinc-300 px-3 py-2"
                placeholder="Some content"
              />
            </div>

            {errors.length > 0 && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create Post'}
            </Button>
          </form>
        </Prose>
      </div>
    </Container>
  )
}
