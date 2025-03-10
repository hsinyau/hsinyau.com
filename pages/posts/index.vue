<script setup lang="ts">
const { site } = useAppConfig()
const title = '文稿'
const description = '阅读我关于软件开发、设计及生活等方面的想法。'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${site.name}`,
  ogDescription: description,
  twitterTitle: `${title} | ${site.name}`,
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
  <div class="space-y-12">
    <HsinTitle :title :description />
    <PostList v-if="posts" :posts="posts" />
  </div>
</template>
