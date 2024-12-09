<script setup lang="ts">
const colorMode = useColorMode()

const isDark = ref(colorMode.value === 'dark')

const { menu } = useAppConfig()
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})

async function toggleTheme(event: MouseEvent) {
  // 检查浏览器是否支持 View Transitions API
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
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

const router = useRouter()
defineShortcuts({
  backspace: () => router.back(),
})
</script>

<template>
  <header class="flex items-center justify-between my-8 gap-2">
    <NuxtLink
      class="handwriting text-xl sm:text-3xl text-nowrap gap-2 font-bold duration-300 dark:brightness"
      to="/"
    >
      <HsinLogo width="90" height="31.3" />
    </NuxtLink>
    <nav class="flex gap-2 items-center justify-end flex-wrap">
      <UTooltip
        v-for="nav in menu"
        :key="nav.label"
        :text="nav.label"
      >
        <UButton
          :icon="`i-ph:${nav.icon}`"
          :to="nav.to"
          :aria-label="nav.label"
          color="white"
          size="sm"
          variant="solid"
          :ui="{
            color: {
              white: {
                solid: 'dark:bg-zinc-500/20',
              },
            },
          }"
        />
      </UTooltip>
      <ClientOnly>
        <UTooltip
          text="主题"
        >
          <UButton
            :icon="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            color="white"
            aria-label="switch theme"
            size="sm"
            variant="solid"
            @click="toggleTheme($event)"
          />
        </UTooltip>
      </ClientOnly>
    </nav>
  </header>
</template>

<style>
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
