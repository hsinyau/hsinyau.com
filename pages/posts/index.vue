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

const { data: posts } = await useAsyncData('all-posts', () => queryContent('/posts')
  .sort({ created: -1 })
  .only(['title', 'summary', 'created', '_path', 'tag', 'readingTime'])
  .find())

const { data: weeklys } = await useAsyncData('all-weeklys', () => queryContent('/weekly')
  .sort({ created: -1 })
  .only(['title', 'summary', 'created', '_path', 'tag', 'readingTime'])
  .find())

const allContent = computed(() => [
  ...(posts.value || []),
  ...(weeklys.value || []),
].sort((a, b) => {
  return new Date(b.created).getTime() - new Date(a.created).getTime()
}))
</script>

<template>
  <main class="space-y-12">
    <HsinTitle
      :title
      :description
    />
    <PostList
      :posts="allContent"
    />
  </main>
</template>
