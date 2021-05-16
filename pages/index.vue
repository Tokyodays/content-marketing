<template>
  <div>
      <ul v-for="(post, i) in posts" :key="i">
        <li>{{ post.fields.title }}</li>
        <ul>
          <img
            :src="setEyeCatch(post).url"
            :alt="setEyeCatch(post).title" />
          <li>{{ post.fields.body }}</li>
          <li>{{ post.fields.publishDate }}</li>
          <li>
            <NuxtLink
              :to="linkTo(post)"
            >
              この記事をみる
            </NuxtLink>
          </li>
        </ul>
      </ul>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import { mapGetters } from 'vuex'

export default {  
  computed: {
    ...mapGetters(['setEyeCatch']),
    linkTo: () => (obj) => {
      return { name: 'posts-slug', params: { slug: obj.fields.slug } }
    }
  },
  async asyncData({ env }) {
    let posts = []
    await client.getEntries({
      content_type: env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate'
    }).then(res => (posts = res.items)).catch(console.error)
    return { posts }
  }
}
</script>


