<script setup lang="ts">
defineProps({
  loadingText: {
    type: String,
    default: '别着急，坐和放宽'
  },
})
</script>

<template>
  <div class="fixed inset-0 flex flex-col justify-center items-center bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
    <span class="w-4 h-4 rounded-full bg-yau-fade animate-bounce" />
    <span class="mt-6 block dark:text-white">{{ loadingText }}</span>
  </div>
</template>
