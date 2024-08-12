import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getPosts } from "@/api/postsApi"

function Post({ post }) {
  const date = new Date(post.createdDate)

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Card.Title href={`/posts/${post.slug}`} className="text-2xl font-extrabold text-zinc-900">
          {post.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={date}
          className="md:hidden text-sm text-zinc-500"
          decorate
        >
          {formatDate(date)}
        </Card.Eyebrow>
        <Card.Description className="mt-4 text-zinc-700">
          {post.body}
        </Card.Description>
        <Card.Cta className="mt-6 text-blue-600 hover:text-blue-800 font-semibold">
          Read post
        </Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={date}
        className="mt-1 hidden md:block text-sm text-zinc-500"
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
        <div className="md:border-l md:border-zinc-200 md:pl-8">
          <div className="flex max-w-3xl flex-col space-y-12">
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
