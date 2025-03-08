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
</script>

<template>
  <UApp>
    <UContainer class="z-50 relative max-w-6xl flex flex-col min-h-[calc(100vh-24px)]">
      <HsinHeader />
      <main class="mt-12 grow">
        <NuxtPage />
      </main>
      <HsinFooter />
    </UContainer>
  </UApp>
</template>
