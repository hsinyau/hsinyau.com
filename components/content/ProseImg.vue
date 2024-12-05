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

const img = useImage()
</script>

<template>
  <NuxtImg
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :placeholder="img(props.src, { h: 10, f: 'png', blur: 2, q: 50 })"
    class="rounded-lg w-full h-full overflow-hidden duration-300 dark:brightness-75"
    loading="lazy"
  />
</template>
