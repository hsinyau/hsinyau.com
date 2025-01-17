<script setup lang="ts">
const { site } = useAppConfig()
const title = '关于我'
const description = '嗨，欢迎酷酷的你来到这个小小的网站，很高兴能在这里与你相遇。'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${site.title}`,
  ogDescription: description,
  twitterTitle: `${title} | ${site.title}`,
  twitterDescription: description,
})
</script>

<template>
  <main class="!max-w-none prose dark:prose-invert">
    <div class="relative flex justify-center filter dark:brightness-50 pb-8">
      <div class="relative w-[134px] h-[134px] bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
        <span class="absolute inset-5 rounded-full bg-white z-1" />
        <NuxtImg
          provider="cloudflare"
          src="/image/avatar.jpg"
          alt="Avatar"
          width="128"
          height="128"
          class="m-auto rounded-full overflow-hidden w-32 h-32 z-10"
          placeholder
        />
      </div>
    </div>
    <ContentDoc path="/about" />
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  @apply no-underline;
}
</style>
