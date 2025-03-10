<script setup lang="ts">
const { site } = useAppConfig()
useSeoMeta({
  ogTitle: site.name,
  ogDescription: site.description,
  ogUrl: site.domain,
  ogImage: '/opengraph.jpg',
  twitterTitle: site.name,
  twitterDescription: site.description,
  twitterImage: '/opengraph.jpg',
  twitterCard: 'summary',
  twitterCreator: '@hsinyau_zz',
})

useHead({
  title: site.name,
  titleTemplate: title => title === site.name ? `${site.name} - ${site.description}` : `${title} - ${site.name}`,
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.svg' },
  ],
})

useOpenpanel()
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#808080" />
    <UContainer class="z-50 relative max-w-6xl flex flex-col min-h-[calc(100vh-24px)]">
      <HsinHeader />
      <main class="mt-12 grow">
        <NuxtPage />
      </main>
      <HsinFooter />
      <BackTop />
    </UContainer>
  </UApp>
</template>

<style>
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
