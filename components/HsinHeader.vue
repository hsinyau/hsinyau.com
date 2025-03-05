<script setup lang="ts">
import { computed } from 'vue'
import { SITE_MENU } from '~/lib/constants'

const router = useRouter()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

async function toggleTheme(event: MouseEvent) {
  // 检查浏览器是否支持 View Transitions API
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = document.startViewTransition(async () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-out',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}

defineShortcuts({
  backspace: () => router.back(),
})
</script>

<template>
  <header class="flex items-center justify-between py-8">
    <NuxtLink
      class="handwriting text-xl sm:text-3xl text-nowrap gap-2 font-bold duration-300 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      to="/"
    >
      Hsinyau
    </NuxtLink>
    <nav class="flex gap-2 items-center justify-end flex-wrap">
      <UTooltip
        v-for="nav in SITE_MENU"
        :key="nav.label"
        :text="nav.label"
        :delay-duration="0"
      >
        <UButton
          :icon="`i-ph:${nav.icon}`"
          :to="nav.to"
          :aria-label="nav.label"
          color="neutral"
          size="sm"
          variant="outline"
        />
      </UTooltip>
      <ClientOnly>
        <UTooltip
          text="主题"
          :delay-duration="0"
        >
          <UButton
            :icon="isDark ? 'i-ph-sun-duotone' : 'i-ph-moon-duotone'"
            color="neutral"
            aria-label="switch theme"
            size="sm"
            variant="outline"
            class="cursor-pointer"
            @click="toggleTheme($event)"
          />
        </UTooltip>
      </ClientOnly>
    </nav>
  </header>
</template>

<style>
.handwriting {
  font-family: 'Dancing Script', cursive;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 999;
}

.dark::view-transition-old(root) {
  z-index: 999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
