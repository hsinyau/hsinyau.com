<script setup lang="ts">
const title = '文稿'
const description = '阅读我关于软件开发、设计及生活等方面的想法。'

useSeoMeta({
  title,
  description,
})

const { data: posts } = await useAsyncData('all-posts', () => queryContent('/posts')
  .sort({ created: -1 })
  .only(['title', 'summary', 'created', '_path', 'tag', 'readingTime'])
  .find())
</script>

<template>
  <main class="space-y-12">
    <HsinTitle
      :title
      :description
    />
    <PostList
      :posts="posts || []"
    />
  </main>
</template>
