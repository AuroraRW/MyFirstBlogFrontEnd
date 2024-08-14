import ReactDOMServer from 'react-dom/server';
import { Feed } from 'feed';
import { mkdir, writeFile } from 'fs/promises';
import { getPosts } from '../api/postsApi'; // Ensure correct import path

export async function generateRssFeed() {
  try {
    console.log('Fetching posts...');
    const posts = await getPosts();
    console.log('Posts fetched:', posts);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      throw new Error('Site URL is not defined in environment variables.');
    }
    console.log('Site URL:', siteUrl);

    const author = {
      name: 'Spencer Sharp',
      email: 'spencer@planetaria.tech',
    };

    const feed = new Feed({
      title: author.name,
      description: 'Your blog description',
      author,
      id: siteUrl,
      link: siteUrl,
      image: `${siteUrl}/favicon.ico`,
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      feedLinks: {
        rss2: `${siteUrl}/rss/feed.xml`,
        json: `${siteUrl}/rss/feed.json`,
      },
    });

    posts.forEach((post) => {
      const url = `${siteUrl}/posts/${post.slug}`;
      const htmlContent = ReactDOMServer.renderToStaticMarkup(
        <div>{post.body}</div>
      );

      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.body,
        content: htmlContent,
        author: [author],
        contributor: [author],
        date: new Date(post.createdDate),
      });
    });

    const rssDir = './public/rss';
    await mkdir(rssDir, { recursive: true });
    await Promise.all([
      writeFile(`${rssDir}/feed.xml`, feed.rss2(), 'utf8'),
      writeFile(`${rssDir}/feed.json`, feed.json1(), 'utf8'),
    ]);

    console.log('RSS feed generated successfully.');
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    throw error;
  }
}
