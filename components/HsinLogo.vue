<script lang="ts" setup>
defineProps({
  width: {
    type: [String, Number],
    default: 73.9,
  },
  height: {
    type: [String, Number],
    default: 25.7,
  },
})
</script>

<template>
  <img src="/logo.svg" :width="width" :height="height" class="dark:brightness-0 dark:invert hover:brightness-100 duration-300">
</template>
