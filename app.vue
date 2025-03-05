<script lang="ts" setup>
import { useOpenpanel } from './composables/useOpenpanel'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './lib/constants'

useSeoMeta({
  ogTitle: SITE_NAME,
  ogDescription: SITE_DESCRIPTION,
  ogUrl: SITE_URL,
  ogImage: '/opengraph.jpg',
  twitterTitle: SITE_NAME,
  twitterDescription: SITE_DESCRIPTION,
  twitterImage: '/opengraph.jpg',
  twitterCard: 'summary',
  twitterCreator: '@hsinyau_zz',
})

useHead({
  title: SITE_NAME,
  titleTemplate: title => title === SITE_NAME ? `${SITE_NAME} - ${SITE_DESCRIPTION}` : `${title} - ${SITE_NAME}`,
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.svg' },
  ],
})

useOpenpanel().track('')
</script>

<template>
  <UApp>
    <Html lang="zh-CN">
      <Body>
        <NuxtLoadingIndicator color="#808080" />
        <UContainer class="z-50 relative max-w-6xl flex flex-col min-h-[calc(100vh-24px)]">
          <HsinHeader />
          <NuxtPage class="mt-12 grow" />
          <HsinFooter />
          <BackTop />
        </UContainer>
      </Body>
    </Html>
  </UApp>
</template>
