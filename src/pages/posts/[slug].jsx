import { ArticleLayout } from '@/components/ArticleLayout'
import Link from 'next/link'  // Import Link from Next.js
import { getPost, getPosts } from "@/api/postsApi"
import { postParameters } from "@/lib/postUtilities"

export async function getStaticPaths() {
  const posts = await getPosts()

  const postParams = posts ? postParameters(posts) : []

  return {
    paths: postParams,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const currentPost = await getPost(context.params.slug)

  return {
    props: { post: currentPost || {} },
  }
}

export default function Post({ post }) {

  const meta = {
    author: 'Spencer Sharp',
    title: post.title,
    description: post.body,
  }

  return (
    <ArticleLayout meta={meta}>
      {/* Render the post content */}
      <div className="post-body">
        {post.body}
      </div>

      {/* Add a "Create New Post" button */}
      <div className="mt-8">
        <Link href="/posts/new">
          <a className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Create New Post
          </a>
        </Link>
      </div>
    </ArticleLayout>
  )
}
