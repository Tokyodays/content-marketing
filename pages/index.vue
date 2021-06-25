<template>
  <div>
    <template v-for="(post) in posts">
      <div class="mb-10">
      <NuxtLink :to="linkTo('posts', post)">
      <div class="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
          <div id="header" class="flex"> 
            <img :alt="setEyeCatch(post).title" class="w-1/4 rounded-md border-2 border-gray-300" :src="setEyeCatch(post).url" />
            <div id="body" class="flex flex-col ml-5">
                <h4 id="name" class="text-xl font-semibold mb-2">{{ post.fields.title }}</h4>
                <p id="job" class="text-gray-800 mt-2">{{ post.fields.publishDate }}</p>
                <div class="flex mt-5">
                  <img alt="avatar" class="w-6 rounded-full border-2 border-gray-300" src="https://picsum.photos/seed/picsum/200" />
                  <p class="ml-3">{{ post.fields.author.fields.name }}</p>
                </div>
            </div>
          </div>
      </div>
      </NuxtLink>
      </div>
    </template>

  
      <!-- <ul>
        <li></li>
        <ul>
          <img
            
             />
          <li></li>
          <li><span :is="draftChip(post)" /></li>
          <li><NuxtLink
              :to="linkTo('categories', post.fields.category)"
            >
category:{{ post.fields.category.fields.name }}
</NuxtLink>
</li>
<li>
    <template v-if="post.fields.tags">
      <NuxtLink
        v-for="(tag) in post.fields.tags"
        :key="tag.sys.id"
        :to="linkTo('tags', tag)"
      >
        {{ tag.fields.name }}
      </NuxtLink>
    </template>
</li>
          <li>
            
              この記事をみる
            
          </li>
        </ul>
      </ul> -->
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


