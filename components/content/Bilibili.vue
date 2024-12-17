<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    require: true,
  },
})
</script>

<template>
  <div class="flex justify-center my-4">
    <div class="relative h-0 w-full" style="padding-bottom: 50%;">
      <iframe
        :src="src"
        scrolling="no"
        frameborder="no"
        auto
        class="absolute inset-0 size-full rounded-md border-0"
      />
    </div>
  </div>
</template>
