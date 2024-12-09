<script lang="ts" setup>
const { site } = useAppConfig()

useSeoMeta({
  ogTitle: site.title,
  ogDescription: site.description,
  ogImage: '/opengraph.jpg',
  ogUrl: site.domain,
  twitterTitle: site.title,
  twitterDescription: site.description,
  twitterImage: '/opengraph.jpg',
  twitterCard: 'summary_large_image',
  twitterCreator: site.twitter,
})

useHead({
  title: site.title,
  titleTemplate: title => title === site.title ? `${site.title} - ${site.description}` : `${title} - ${site.title}`,
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.svg' },
  ],
})
</script>

<template>
  <Html lang="zh-CN">
    <Body>
      <NuxtLoadingIndicator color="#808080" />
      <UContainer class="z-50 relative max-w-5xl min-h-[100dvh] flex flex-col">
        <HsinHeader />
        <NuxtPage class="mt-12 grow" />
        <HsinFooter />
      </UContainer>
      <BackTop />
    </Body>
  </Html>
</template>

<style>
body {
  font-family: 'Noto Sans SC', sans-serif;
  @apply h-full w-full text-neutral-700 dark:text-neutral-300;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

* {
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  scrollbar-width: 6px;
  scrollbar-color: transparent;
}

::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.7);
  opacity: 1;
  display: block !important
}

::-webkit-scrollbar-thumb:active {
  background: rgba(128, 128, 128, 0.9);
  border-radius: 3px;
}
</style>
