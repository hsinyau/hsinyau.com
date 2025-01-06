<script setup lang="ts">
withDefaults(
  defineProps<{ title?: string }>(),
  {
    title: 'title',
  },
)
</script>

<template>
  <div class="w-full h-full" style="background: url(https://file.hsinyau.com/image/og-background.jpg);">
    <div class="flex justify-center items-center h-[418px] text-5xl">
      <p class="px-20 text-white">
        {{ title }}
      </p>
    </div>
  </div>
</template>
