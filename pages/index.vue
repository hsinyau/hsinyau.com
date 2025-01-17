<script setup lang="ts">
const { site } = useAppConfig()

useSeoMeta({
  title: site.title,
  description: site.description,
})
</script>

<template>
  <main class="!max-w-none">
    <HsinHero />
    <LatestPosts />
    <HsinPhotos />
  </main>
</template>
