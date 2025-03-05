<script setup lang="ts">
import { SITE_DESCRIPTION, SITE_NAME } from '~/lib/constants'

useSeoMeta({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
})
</script>

<template>
  <main class="!max-w-none">
    <HsinHero />
    <LatestPosts />
    <HsinPhotos />
  </main>
</template>
