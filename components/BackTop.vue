<script setup lang="ts">
import { useScroll } from '@vueuse/core'

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y } = useScroll(window)
const isShow = computed(() => y.value > 200)
</script>

<template>
  <div v-if="isShow">
    <UTooltip text="回到顶部" :delay-duration="0" @click="scrollToTop">
      <UButton
        color="neutral"
        icon="i-ph-arrow-fat-lines-up-duotone"
        size="md"
        variant="outline"
        class="fixed bottom-8 right-8 focus:outline-none outline-none duration-300 z-[999] cursor-pointer"
      />
    </UTooltip>
  </div>
</template>
