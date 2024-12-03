<script setup>
import { PhotoAlbum } from 'vue-photo-album'
import GalleryRenderer from '../GalleryRenderer.vue'

defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div class="article-gallery not-prose">
    <PhotoAlbum
      :photos="photos"
      layout="rows"
      spacing="5"
      :photo-renderer="GalleryRenderer"
    />
  </div>
</template>
