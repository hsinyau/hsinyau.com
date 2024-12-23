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
      :photo-renderer="GalleryRenderer"
      spacing="5"
    />
  </div>
</template>
