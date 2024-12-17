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
  <Transition name="fade">
    <UTooltip text="回到顶部">
      <UButton
        v-show="isShow"
        color="white"
        icon="i-ph-arrow-fat-lines-up-duotone"
        size="md"
        variant="solid"
        class="fixed bottom-8 right-8 focus:outline-none outline-none duration-300 z-[999]"
        @click="scrollToTop"
      />
    </UTooltip>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
