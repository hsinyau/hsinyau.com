<script setup lang="ts">
import mediumZoom from 'medium-zoom'

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

onMounted(() => {
  const zoom = mediumZoom('.article-image', {
    margin: 36,
    background: '#3f3f46',
  })

  // 监听点击事件,点击背景时关闭
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('medium-zoom-overlay')) {
      zoom.close()
    }
  })
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
    class="article-image rounded-lg w-full h-full overflow-hidden duration-300 dark:brightness-75 cursor-pointer"
    loading="lazy"
  />
</template>
