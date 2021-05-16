<template>
  <div>
    <template v-if="currentPost">
      {{ currentPost.fields.title }}
      <img
        :src="setEyeCatch(currentPost).url"
        :alt="setEyeCatch(currentPost).url"
      />
      {{ currentPost.fields.publishDate }}<br>
      {{ currentPost.fields.body }}
    </template>

    <template v-else>
      お探しの記事は見つかりませんでした。
    </template>

    <div>
      <NuxtLink
        to="/"
      >
        <span>ホームへ戻る</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['setEyeCatch'])
  },
  async asyncData({ env, params }) {
    let currentPost = null
    await client.getEntries({
      content_type: env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': params.slug
    }).then(res => (currentPost = res.items[0])).catch(console.error)

    return { currentPost }
  }
}
</script>