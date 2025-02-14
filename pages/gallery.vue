<script setup lang="ts">
const { site } = useAppConfig()
const title = '相册'
const description = '最近捕获的画面，来源 VSCO'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${site.title}`,
  ogDescription: description,
  twitterTitle: `${title} | ${site.title}`,
  twitterDescription: description,
})

const { data: gallery } = await useAsyncData('gallery', () => $fetch('/api/photos'), { lazy: true })
</script>

<template>
  <main class="space-y-12 mt-12">
    <HsinTitle
      :title
      :description
    />
    <Gallery
      :photos="gallery"
      layout="columns"
    />
  </main>
</template>
