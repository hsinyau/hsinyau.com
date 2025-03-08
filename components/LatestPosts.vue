<script setup lang="ts">
const { data: posts } = await useAsyncData('LatestPosts', async () => {
  const posts = await queryCollection('posts')
    .select('title', 'created', 'summary', 'tag', 'path', 'meta')
    .order('created', 'DESC')
    .limit(6)
    .all()

  return posts
})
</script>

<template>
  <div class="not-prose ">
    <div class="flex justify-between items-center mt-6 mb-4">
      <span class="font-bold text-gray-600 dark:text-gray-300 text-lg"><span class="animate-pulse">✨</span> 近期博文</span>
      <NuxtLink
        class="flex items-center gap-2 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/posts"
      >
        查看更多
        <UIcon
          class="group-hover:translate-x-1 transform duration-300"
          name="i-ph-arrow-right-duotone"
          size="20"
        />
      </NuxtLink>
    </div>
    <PostList v-if="posts" :posts="posts" />
  </div>
</template>
