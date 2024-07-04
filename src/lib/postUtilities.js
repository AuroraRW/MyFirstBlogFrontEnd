/**
 * Returns an object mapping the post
 * @param posts
 * @returns {*}
 */
export const postParameters = (posts) => {
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
        title: post.title,
        body: post.body,
        createdDate: post.createdDate,
        slug: post.slug
      }
    }
  })
}
