<script setup lang="ts">
import type { PhotoRendererMetadata } from 'vue-photo-album'

const props = defineProps<PhotoRendererMetadata>()

const nuxtImgProps = computed(() => {
  const { src, width, height, sizes: imgSize, loading, decoding, title, alt } = props.imageProps
  const sizes = 'xs sm md lg xl xxl 2xl'.split(' ').map(screen => `${screen}:${imgSize}`).join(' ')
  return { src, width, height, sizes, loading, decoding, title, alt }
})

const isCloudflare = computed(() => !nuxtImgProps.value.src?.includes('https://'))
</script>

<template>
  <div class="overflow-hidden cursor-pointer">
    <NuxtImg
      v-if="isCloudflare"
      provider="cloudflare"
      v-bind="nuxtImgProps"
      loading="lazy"
      placeholder
      class="rounded-md hover:scale-105 transition-all duration-500 dark:brightness-75 w-fill h-full object-cover"
    />
    <img
      v-else
      v-bind="nuxtImgProps"
      loading="lazy"
      placeholder="blur"
      alt="not from cloudflare"
      class="rounded-md hover:scale-105 transition-all duration-500 dark:brightness-75"
    >
  </div>
</template>
