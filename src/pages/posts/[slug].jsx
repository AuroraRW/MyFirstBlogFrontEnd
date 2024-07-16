import { ArticleLayout } from '@/components/ArticleLayout'
import { getPost, getPosts } from '@/api/postsApi'
import { postParameters } from '@/lib/postUtilities'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const posts = await getPosts()

  const postParams = posts ? postParameters(posts) : []

  return {
    paths: postParams,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  try {
    const currentPost = await getPost(context.params.slug)
    if (!currentPost) {
      return {
        notFound: true,
      }
    }
    return {
      props: { post: currentPost },
      revalidate: 1,
    }
  } catch (e) {
    console.error('Error fetching post:', e)
    return {
      notFound: true,
    }
  }
}

export default function Post({ post }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const meta = {
    author: 'Spencer Sharp',
    date: post.createdDate,
    title: post.title,
    description: post.body,
  }

  return <ArticleLayout meta={meta}>{post.body}</ArticleLayout>
}
