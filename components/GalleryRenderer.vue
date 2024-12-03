<script setup lang="ts">
import type { PhotoRendererMetadata } from 'vue-photo-album'

const props = defineProps<PhotoRendererMetadata>()

const nuxtImgProps = computed(() => {
  const { src, width, height, sizes: imgSize, loading, decoding, title, alt } = props.imageProps
  const sizes = 'xs sm md lg xl xxl 2xl'.split(' ').map(screen => `${screen}:${imgSize}`).join(' ')
  return { src, width, height, sizes, loading, decoding, title, alt }
})
</script>

<template>
  <NuxtImg
    v-bind="nuxtImgProps"
    class="rounded-md"
  />
</template>
