import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getPosts, getPost } from "@/api/postsApi"

function Post({ post }) {
  const date = new Date(post.createdDate)

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/posts/${post.slug}`}>
          {post.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={date}
          className="md:hidden"
          decorate
        >
          {formatDate(date)}
        </Card.Eyebrow>
        <Card.Description>{post.body}</Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={date}
        className="mt-1 hidden md:block"
      >
        {formatDate(date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function PostsIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Posts - Spencer Sharp</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((post) => (
              <Post key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: (await getPosts() || []),
    },
  }
}
