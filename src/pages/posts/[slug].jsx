import { ArticleLayout } from '@/components/ArticleLayout'
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
    date: post.createdDate,
    title: post.title,
    description: post.body,
  }

  return (
    <ArticleLayout meta={meta}>
      {post.body}
    </ArticleLayout>
  )
}
