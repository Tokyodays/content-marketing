<template>
  <div>
    <h1>{{ tag.fields.name }}</h1>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
export default {
	async asyncData({ params, error, store, env }) {
    const tag = await client.getEntries({
      content_type: 'tag',
      'fields.slug': params.slug
    }).then(res => res.items[0]).catch(console.error)
    if (tag) {
      return { tag }
    } else {
      error({ statusCode: 400 })
    }
  }
}
</script>