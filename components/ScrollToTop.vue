<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  const scrollTop = window.pageYOffset
  if (scrollTop > 300)
    isVisible.value = true
  else 
    isVisible.value = false
}

const scrollToTop = () => {
  window.scrollTo({ 
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="font-lg cursor-pointer fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] right-4 z-[9] flex flex-col transition-transform duration-300 ease-in-out">
    <button
      v-if="isVisible"
      v-motion
      class="flex items-center justify-center h-10 w-10 text-lg md:text-base outline-accent hover:opacity-100 focus:opacity-100 focus:outline-none rounded-xl border border-zinc-400/20 backdrop-blur-lg dark:border-zinc-500/30 dark:text-zinc-200 bg-slate-50/80 shadow-lg dark:bg-neutral-900/80 transition-all duration-500 ease-in-out"
      :initial="{ y: 100, opacity: 0 }"
      :enter="{ 
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6
        }
      }"
      :exit="{ 
        y: 100,
        opacity: 0,
        transition: {
          duration: 0.6
        }
      }"
      :tap="{ scale: 1 }"
      @click="scrollToTop"
    >
      <i class="i-mingcute-align-arrow-up-fill"/>
    </button>
  </div>
</template>
