<script setup lang="ts">
const { site } = useAppConfig()
const title = '文稿'
const description = '阅读我关于软件开发、设计及生活等方面的想法。'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${site.title}`,
  ogDescription: description,
  twitterTitle: `${title} | ${site.title}`,
  twitterDescription: description,
})

const { data: posts } = await useAsyncData('allPosts', async () => {
  const posts = await queryCollection('posts')
    .select('title', 'created', 'summary', 'tag', 'path', 'meta')
    .order('created', 'DESC')
    .all()

  return posts
})
</script>

<template>
  <main class="space-y-12">
    <HsinTitle
      :title
      :description
    />
    <PostList :posts />
  </main>
</template>
