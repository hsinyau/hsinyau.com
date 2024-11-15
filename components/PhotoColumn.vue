<script setup lang="ts">
import type { PhotoRendererMetadata } from 'vue-photo-album'

defineProps<PhotoRendererMetadata>()
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="filter brightness-75 cursor-pointer hover:scale-105 hover:brightness-100 transition-all duration-500">
      <slot />
    </div>
  </div>
</template>
