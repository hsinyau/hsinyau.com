<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})
</script>

<template>
  <NuxtImg
    provider="cloudflare"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    placeholder
    class="rounded-lg w-full h-full overflow-hidden duration-300 dark:brightness-75 cursor-pointer"
    loading="lazy"
  />
</template>
