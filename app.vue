<script lang="ts" setup>
const { site, social } = useAppConfig()

useSeoMeta({
  ogTitle: site.title,
  ogDescription: site.description,
  ogImage: '/opengraph.jpg',
  ogUrl: site.domain,
  twitterTitle: site.title,
  twitterDescription: site.description,
  twitterImage: '/opengraph.jpg',
  twitterCard: 'summary_large_image',
  twitterCreator: social.twitter,
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
  font-family: 'DM Sans', 'Noto Sans SC', sans-serif;
  @apply h-full w-full text-neutral-700 dark:text-neutral-300;
}

.sofia {
  font-family: 'Sofia Sans', sans-serif;
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
</style>
