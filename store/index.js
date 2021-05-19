import defaultEyeCatch from '~/assets/images/defaultEyeCatch.jpg'
import client from '~/plugins/contentful'

export const state = () => ({
  posts: [],
  categories: []
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
  },

  relatedPosts: state => (category) => {
    return state.posts.filter(post => post.fields.category.sys.id === category.sys.id)
  }
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },

  setCategories(state, payload) {
    state.categories = payload
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
  },

  async getCategories({ commit }) {
    await client.getEntries({
      content_type: 'category',
      order: 'fields.sort'
    }).then(res =>
      commit('setCategories', res.items)
    ).catch(console.error)
  }
}
