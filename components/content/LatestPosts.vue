<script setup lang="ts">
const { data: posts } = await useAsyncData('latest-posts', () => queryContent('/posts')
  .sort({ created: -1 })
  .without('body')
  .limit(6)
  .find())
</script>

<template>
  <div class="not-prose ">
    <div class="flex justify-between items-center mt-6 mb-4">
      <span class="font-bold text-gray-600 dark:text-gray-300 text-lg"><span class="animate-pulse">✨</span> 近期博文</span>
      <NuxtLink
        to="/posts"
        class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"
      >
        更多
        <UIcon name="ph:paper-plane-right-duotone" size="12" />
      </NuxtLink>
    </div>
    <PostList :posts="posts || []" />
  </div>
</template>
