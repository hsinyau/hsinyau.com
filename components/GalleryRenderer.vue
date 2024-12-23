<script setup lang="ts">
import type { PhotoRendererMetadata } from 'vue-photo-album'

const props = defineProps<PhotoRendererMetadata & {
  photo: {
    description?: string
    date?: number
    location?: string
  }
}>()

const nuxtImgProps = computed(() => {
  const { src, width, height, sizes: imgSize, loading, decoding, title, alt } = props.imageProps
  const { description, date, location } = props.photo
  const sizes = 'xs sm md lg xl xxl 2xl'.split(' ').map(screen => `${screen}:${imgSize}`).join(' ')
  return { src, width, height, sizes, loading, decoding, title, alt, description, date, location }
})

const isCloudflare = computed(() => !nuxtImgProps.value.src?.includes('https://'))
</script>

<template>
  <div class="overflow-hidden cursor-pointer">
    <div class="relative group">
      <NuxtImg
        v-if="isCloudflare"
        provider="cloudflare"
        v-bind="nuxtImgProps"
        loading="lazy"
        placeholder
        class="rounded-md group-hover:scale-105 transition-all duration-500 dark:brightness-75 w-fill h-full object-cover"
      />
      <NuxtImg
        v-else
        v-bind="nuxtImgProps"
        :alt="nuxtImgProps.description"
        loading="lazy"
        placeholder
        class="rounded-md group-hover:scale-105 transition-all duration-500 dark:brightness-75 w-fill h-full object-cover"
      />
      <div v-if="nuxtImgProps.description || nuxtImgProps.date" class="absolute top-0 left-0 w-full h-full overflow-hidden hidden group-hover:flex flex-col justify-end">
        <div v-if="nuxtImgProps.description" class="text-white text-sm bg-zinc-800/60 backdrop-blur-sm p-2 w-full text-center duration-300">
          {{ nuxtImgProps.description }}
        </div>
      </div>
    </div>
  </div>
</template>
