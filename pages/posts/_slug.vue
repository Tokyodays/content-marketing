<template>
  <div class="container mx-auto px-4">
    <template v-if="currentPost">
      {{ currentPost.fields.title }}
      <img
        :src="setEyeCatch(currentPost).url"
        :alt="setEyeCatch(currentPost).title"
      />
      {{ currentPost.fields.publishDate }}<br>
      <div v-html="$md.render(currentPost.fields.body )"></div>
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
  async asyncData({ store, params, error }) {
    const currentPost = await store.state.posts.find(post => post.fields.slug === params.slug)

    if (currentPost) {
      return { currentPost }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>