<template>
  <div>
      <ul v-for="(post, i) in posts" :key="i">
        <li>{{ post.fields.title }}</li>
        <ul>
          <img
            :src="post.fields.heroImage.fields.file.url"
            :alt="post.fields.heroImage.fields.title"
            max-width="400"
            max-height="225"/>
          <li>{{ post.fields.body }}</li>
          <li>{{ post.fields.publishDate }}</li>
        </ul>
      </ul>
  </div>
</template>

<script>
import client from '~/plugins/contentful'

export default {
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


