<script setup>
import { PhotoAlbum } from 'vue-photo-album'
import GalleryRenderer from '../GalleryRenderer.vue'

defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => [],
  },
  layout: {
    type: String,
    default: 'rows',
  },
  columns: {
    type: Number,
    default: 3,
  },
})
</script>

<template>
  <div class="article-gallery not-prose">
    <PhotoAlbum
      :photos="photos"
      :layout="layout"
      :columns="columns"
      spacing="5"
      :photo-renderer="GalleryRenderer"
    />
  </div>
</template>
