export default async ({ store }) => {
  if (!store.state.posts) await store.dispatch('getPosts')
}