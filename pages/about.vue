<script setup lang="ts">
const { data: about } = await useAsyncData('home', () => queryContent('/about').findOne())
</script>

<template>
  <main class="!max-w-none prose dark:prose-invert">
    <div class="relative flex justify-center filter dark:brightness-50 pb-8">
      <div class="relative w-36 h-36 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
        <span class="absolute inset-5 rounded-full bg-white z-1" />
        <NuxtImg
          provider="cloudflare"
          src="/image/avatar.jpg"
          alt="Avatar"
          width="128"
          height="128"
          class="m-auto rounded-full overflow-hidden w-32 h-32 z-10"
        />
      </div>
    </div>
    <ContentDoc :path="about?.path" />
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  @apply no-underline;
}
</style>
