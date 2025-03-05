<script setup lang="ts">
import { SITE_NAME } from '~/lib/constants'

const title = '动态'
const description = '对我的近况感兴趣？快来看看最近做了什么、去了哪里、看到了什么...'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${SITE_NAME}`,
  ogDescription: description,
  twitterTitle: `${title} | ${SITE_NAME}`,
  twitterDescription: description,
})

const { data: timeline } = await useAsyncData('timeline', async () => {
  const [mastodon, bluesky, qzone] = await Promise.all([
    $fetch('/api/social/mastodon'),
    $fetch('/api/social/bluesky'),
    $fetch('/api/social/qzone'),
  ])

  return { mastodon, bluesky, qzone }
})

const sortedFeed = [
  ...((timeline.value?.bluesky || []) as any[]),
  ...((timeline.value?.mastodon || []) as any[]),
  ...((timeline.value?.qzone || []) as any[]),
].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
)
</script>

<template>
  <main class="space-y-12 mt-12">
    <HsinTitle
      :title
      :description
      :other="{
        title: '画廊',
        link: 'https://photo.hsinyau.com',
      }"
    />
    <ul v-if="timeline">
      <template v-if="sortedFeed.length">
        <li v-for="item in sortedFeed" :key="item.node_id" class="group flex flex-col gap-2">
          <div class="flex gap-4">
            <NuxtImg
              provider="cloudflare"
              src="/image/avatar.jpg"
              class="size-[40px] rounded-full ring-2 ring-slate-200 dark:ring-zinc-800"
              placeholder
              loading="lazy"
            />
            <div class="flex flex-col md:items-center items-start self-start md:flex-row md:gap-2">
              <span class="self-start text-lg font-medium md:self-auto">Hsinyau</span>
              <div class="text-xs opacity-80 md:-translate-y-1 md:self-end">
                <span>{{ useTimeAgo(item.createdAt, options) }}</span>
                <span>
                  · 来源 {{ item.network }}
                </span>
              </div>
            </div>
          </div>
          <div class="min-w-0 max-w-full mt-2 pl-4 md:mt-0 md:-translate-y-4 md:pl-14">
            <div class="relative w-full min-w-0">
              <div class="moments-content relative inline-block rounded-xl p-3 text-zinc-800 dark:text-zinc-200 rounded-tl-sm bg-neutral-600/5 dark:bg-neutral-500/20 max-w-full overflow-auto">
                <span v-html="item.html" />
                <span v-if="item.media" class="moments-images">
                  <NuxtImg
                    v-for="img in item.media" :key="img.url"
                    :src="img.url"
                    :width="img.width"
                    :height="img.height"
                    :alt="img.alt || undefined"
                    class="w-full h-full object-cover overflow-hidden aspect-[1/1] filter dark:brightness-50"
                    placeholder
                    loading="lazy"
                  />
                </span>
              </div>
            </div>
          </div>
        </li>
      </template>
      <li v-else class="text-gray-500">
        暂时没有动态内容
      </li>
    </ul>
  </main>
</template>

<style>
@reference "tailwindcss";

/* 一宫格 */
.moments-images:has(img:nth-child(1)) {
  @apply mt-4
}

/* 二宫格 */
.moments-images:has(img:nth-child(2)) {
  @apply grid grid-cols-2 gap-2 mt-2
}

/* 三宫格 */
.moments-images:has(img:nth-child(3)) {
  @apply grid grid-cols-3 gap-2 mt-2
}

/* 四宫格 */
.moments-images:has(img:nth-child(4)) {
  @apply grid grid-cols-2 gap-2 mt-2
}

/* 九宫格 */
.moments-images:has(img:nth-child(9)) {
  @apply grid grid-cols-3 gap-2 mt-2
}

.moments-images img{
  @apply w-full h-full object-cover overflow-hidden aspect-[1/1] filter dark:brightness-50
}
</style>
