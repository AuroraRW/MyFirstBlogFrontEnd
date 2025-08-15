// pages/posts/new.jsx
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect, useMemo, useState } from 'react'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { createPost } from '@/api/postsApi'
import { useCreatePost } from '@/hooks/useCreatePost';

// util to make a slug from a title
function toSlug(s) {
  return (s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// convert Date -> "YYYY-MM-DDTHH:mm" for datetime-local input
function toLocalDatetimeInputValue(date) {
  const pad = (n) => String(n).padStart(2, '0')
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const hh = pad(date.getHours())
  const mm = pad(date.getMinutes())
  return `${y}-${m}-${d}T${hh}:${mm}`
}

export default function NewPost() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [body, setBody] = useState('')
  const [createDate, setCreateDate] = useState(toLocalDatetimeInputValue(new Date()))
 
  useEffect(() => {
    try {
      const uuid = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0
            const v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
          })
      setId(uuid)
    } catch {
      setId(`${Date.now()}-${Math.random().toString(16).slice(2)}`)
    }
  }, [])

  const [slugTouched, setSlugTouched] = useState(false)
  useEffect(() => {
    if (!slugTouched) setSlug(toSlug(title))
  }, [title, slugTouched])

  const isValid = useMemo(() => {
    return title.trim() && (slug || toSlug(title)) && body.trim() && id && createDate
  }, [title, slug, body, id, createDate])

  function toIsoFromLocal(datetimeLocal) {
    const d = new Date(datetimeLocal)
    return d.toISOString()
  }
const { createPost, submitting, error } = useCreatePost();
const onSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    id,
    title: title.trim(),
    slug: slug.trim() || toSlug(title),
    body: body.trim(),
    createdDate: toIsoFromLocal(createDate),
  };

  await createPost(payload);
};

  if (isLoading) {
    return (
      <SimpleLayout title="Create a new post" intro="">
        <p>Loading…</p>
      </SimpleLayout>
    )
  }

  return (
    <>
      <Head>
        <title>New Post</title>
        <meta name="description" content="Create a new blog post." />
      </Head>

      <SimpleLayout
        title="Create a new post"
        intro="Fill out the details below, then publish your masterpiece."
      >
        <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
          <Card>
            <Card.Title>Create Post</Card.Title>
            <div className="mt-6 grid grid-cols-1 gap-6">
              {/* ID (UUID) */}
              <div>
                <label className="block text-sm font-medium text-zinc-700">Id (UUID)</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2"
                  required
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Auto-generated. You can replace with your own UUID if needed.
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2"
                  placeholder="Understanding C# class"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-zinc-700">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugTouched(true) }}
                  onBlur={() => setSlug(toSlug(slug))}
                  className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2"
                  placeholder="understanding-csharp-class"
                  required
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Auto-derives from the title; you can edit it.
                </p>
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium text-zinc-700">Body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2"
                  rows={8}
                  placeholder="In this post, we explore the concept of class in C#."
                  required
                />
              </div>

              {/* CreateDate */}
              <div>
                <label className="block text-sm font-medium text-zinc-700">Create Date</label>
                <input
                  type="datetime-local"
                  value={createDate}
                  onChange={(e) => setCreateDate(e.target.value)}
                  className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting || !isValid}
                  className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {submitting ? 'Creating…' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/posts')}
                  className="rounded border border-zinc-300 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          </Card>
        </form>
      </SimpleLayout>
    </>
  )
}
