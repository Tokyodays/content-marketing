import defaultEyeCatch from '~/assets/images/defaultEyeCatch.jpg'

export const getters = {

  draftChip: () => (post) => {
    if (!post.fields.publishDate) return 'draftChip'
  },

  setEyeCatch: () => (post) => {
    if (!!post.fields.heroImage && !!post.fields.heroImage.fields) return { url: `https:${post.fields.heroImage.fields.file.url}`, title: post.fields.heroImage.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  }
}