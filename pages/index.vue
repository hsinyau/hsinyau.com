<script setup lang="ts">
const { site } = useAppConfig()
useSeoMeta({
  title: site.name,
  description: site.description,
})
</script>

<template>
  <div class="home">
    <HsinHero />
    <LatestPosts />
    <HsinPhotos />
  </div>
</template>
