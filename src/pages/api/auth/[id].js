import { useRouter } from 'next/router'

export default function PostPage({ post }) {
  const router = useRouter()

  if (!post) return <p>Post not found.</p>

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p>{post.description}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await fetch(`http://localhost:5000/posts/${id}`)

  if (!res.ok) {
    return { notFound: true }
  }

  const data = await res.json()

  return {
    props: {
      post: data.post || null,
    },
  }
}
