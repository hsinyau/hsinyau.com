<script setup lang="ts">
const { data: home } = await useAsyncData('home', () => queryContent('/').findOne())
const { site } = useAppConfig()

useSeoMeta({
  title: site.title,
  description: site.description,
})
</script>

<template>
  <main class="!max-w-none prose dark:prose-invert">
    <ContentDoc :path="home?.path" />
  </main>
</template>
