import defaultEyeCatch from '~/assets/images/defaultEyeCatch.jpg'
import client from '~/plugins/contentful'

export const state = () => ({
  posts: []
})

export const getters = {
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },

  draftChip: () => (post) => {
    if (!post.fields.publishDate) return 'draftChip'
  },

  setEyeCatch: () => (post) => {
    if (!!post.fields.heroImage && !!post.fields.heroImage.fields) return { url: `https:${post.fields.heroImage.fields.file.url}`, title: post.fields.heroImage.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  }
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }
}

export const actions = {
  async getPosts({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate' // desc
    }).then(res =>
      commit('setPosts', res.items)
    ).catch(console.error)
  }
}
