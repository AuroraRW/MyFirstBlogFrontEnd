import { ArticleLayout } from '@/components/ArticleLayout'
import { getPost, getPosts } from "@/api/postsApi"
import { postParameters } from "@/lib/postUtilities"

export async function getStaticPaths() {
  const posts = await getPosts();
  const postParams = posts ? postParameters(posts) : [];

  return {
    paths: postParams,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const currentPost = await getPost(context.params.slug);

  if (!currentPost || !currentPost.slug) {
    return { notFound: true };
  }

  return {
    props: { post: currentPost },
  };
}

export default function Post({ post }) {
  const meta = {
    author: post.author || 'Admin',
    date: post.createdDate,
    title: post.title,
    description: post.body,
  };

  return (
    <ArticleLayout meta={meta}>
      <div className="prose">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </ArticleLayout>
  );
}
