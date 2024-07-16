import { useState } from 'react'
import { useRouter } from 'next/router'
import { createPost } from '@/api/postsApi'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState([])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    try {
      const newPost = { title, body }
      const data = await createPost(newPost)
      console.log('Post creation response data:', data)
      console.log('New post slug:', data.slug)

      if (data.slug) {
        router.push(`/posts/${data.slug}`)
      } else {
        router.push('/posts')
      }
    } catch (error) {
      console.error('New post error:', error)
      setErrors([...errors, error.message])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
          Create a new post
        </h1>
      </header>
      <div className="mt-16 sm:mt-20">
        <form onSubmit={handleSubmit} className="flex w-1/2 flex-col">
          <div className="mb-4 flex flex-col">
            <label htmlFor="title" className="mb-2 text-2xl font-bold">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-md border-2 border-black p-2"
            />
          </div>
          <div className="mb-8 flex flex-col">
            <label htmlFor="body" className="mb-2 text-2xl font-bold">
              Description
            </label>
            <input
              id="body"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="rounded-md border-2 border-black p-2"
            />
          </div>
          {errors.length > 0 && (
            <ul className="mb-4 text-red-500">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <Button
            className="w-full text-3xl"
            type="submit"
            disabled={isLoading}
          >
            Create Post
          </Button>
        </form>
      </div>
    </Container>
  )
}
