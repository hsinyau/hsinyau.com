<script setup lang="ts">
const { site } = useAppConfig()
const title = '关于我'
const description = '嗨，欢迎酷酷的你来到这个小小的网站，很高兴能在这里与你相遇。'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${site.name}`,
  ogDescription: description,
  twitterTitle: `${title} | ${site.name}`,
  twitterDescription: description,
})

const { data: about } = await useAsyncData('about', async () => {
  return queryCollection('about').first()
})
</script>

<template>
  <main class="!max-w-none prose dark:prose-invert">
    <div class="relative flex justify-center filter dark:brightness-50 pb-8">
      <div class="flex items-center justify-center">
        <NuxtImg
          provider="cloudflare"
          src="/image/avatar.jpg"
          alt="Avatar"
          width="128"
          height="128"
          class="m-auto rounded-full overflow-hidden w-32 h-32 border-2 border-zinc-200 z-10"
          placeholder
        />
      </div>
    </div>
    <ContentRenderer v-if="about" :value="about" class="!max-w-none prose dark:prose-invert" />
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  @apply no-underline;
}
</style>
