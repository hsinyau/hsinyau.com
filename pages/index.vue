<script setup lang="ts">
const { site } = useAppConfig()
useSeoMeta({
  title: site.name,
  description: site.description,
})
</script>

<template>
  <HsinHero />
  <LatestPosts />
  <HsinPhotos />
</template>
