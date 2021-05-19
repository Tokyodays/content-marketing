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
          <li><span :is="draftChip(post)" /></li>
          <li>category:{{ post.fields.category.fields.name }}</li>
          <li>
            <NuxtLink
              :to="linkTo('posts', post)"
            >
              この記事をみる
            </NuxtLink>
          </li>
        </ul>
      </ul>
  </div>
</template>

<script>
import draftChip from '~/components/atoms/draftChip_atoms'
import { mapState, mapGetters } from 'vuex'

export default {  
  components: {
    draftChip
  },
  computed: {
    ...mapState(['posts']), 
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
  }
}
</script>


