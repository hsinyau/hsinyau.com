<script lang="ts" setup>
import { useOpenpanel } from './composables/useOpenpanel'

const { site } = useAppConfig()

useSeoMeta({
  ogTitle: site.title,
  ogDescription: site.description,
  ogUrl: site.domain,
  ogImage: '/opengraph.jpg',
  twitterTitle: site.title,
  twitterDescription: site.description,
  twitterImage: '/opengraph.jpg',
  twitterCard: 'summary',
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

useOpenpanel().track('')
</script>

<template>
  <Html lang="zh-CN">
    <Body>
      <NuxtLoadingIndicator color="#808080" />
      <UContainer class="z-50 relative max-w-6xl flex flex-col min-h-[calc(100vh-24px)]">
        <HsinHeader />
        <NuxtPage class="mt-12 grow" />
        <HsinFooter />
      </UContainer>
      <BackTop />
    </Body>
  </Html>
</template>
