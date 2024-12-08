<script setup lang="ts">
import type { Photos } from '~/types/gallery'
import type { Moments } from '~/types/moments'

const { site } = useAppConfig()
const title = '动态汇集'
const description = '对我的近况感兴趣？快来看看最近做了什么、去了哪里、看到了什么...'

useSeoMeta({
  title,
  description,
})

const tags = [
  {
    label: '动态',
    value: 'moments',
    icon: 'i-ph:confetti-duotone',
    color: 'black',
  },
  {
    label: '画廊',
    value: 'gallery',
    icon: 'i-ph:camera-duotone',
    color: 'black',
  },
  {
    label: '足迹',
    value: 'travel',
    icon: 'i-ph:footprints-duotone',
    color: 'black',
  },
]

const route = useRoute()
const activeTab = ref(0)

// 监听路由参数变化并更新 activeTab
watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    const tabIndex = tags.findIndex(tag => tag.value === newTab)
    if (tabIndex !== -1) {
      activeTab.value = tabIndex
    }
  }
}, { immediate: true })

const { data: moments } = await useFetch<Moments>('/api/collection/moments')
const { data: photos } = await useFetch<Photos>('/api/collection/photos')
const { data: geo } = await useFetch<any>('/api/collection/geo')
const displayData = computed(() => {
  switch (activeTab.value) {
    case 0:
      return moments.value?.moments || []
    case 1:
      return photos.value?.photos || []
    case 2:
      return geo.value?.features || []
    default:
      return moments.value?.moments || []
  }
})

// 监听 activeTab 变化时更新 URL 参数
watch(activeTab, (newValue) => {
  const newTab = tags[newValue].value
  navigateTo({
    query: { ...route.query, tab: newTab },
  }, { replace: true })
})
</script>

<template>
  <main class="space-y-12 mt-12">
    <HsinTitle
      :title
      :description
    />
    <UTabs
      v-model="activeTab"
      :items="tags"
    >
      <template #default="{ item }">
        <span class="truncate">{{ item.label }}</span>
      </template>
    </UTabs>
    <ul v-if="activeTab === 0">
      <li v-for="item in displayData" :key="item.node_id" class="group mb-2 flex flex-col gap-2">
        <div class="flex gap-4">
          <NuxtImg
            provider="cloudflare"
            src="/image/avatar.jpg"
            class="size-[40px] rounded-full ring-2 ring-slate-200 dark:ring-zinc-800"
            placeholder
            loading="lazy"
          />
          <div class="flex flex-col md:items-center items-start self-start md:flex-row md:gap-2">
            <span class="self-start text-lg font-medium md:self-auto">{{ site.author.name }}</span>
            <span class="text-xs opacity-80 md:-translate-y-1 md:self-end">{{ useTimeAgo(Number(item.title) * 1000, options) }}</span>
          </div>
        </div>
        <div class="min-w-0 max-w-full mt-2 pl-4 md:mt-0 md:-translate-y-4 md:pl-14">
          <div class="relative w-full min-w-0">
            <div class="moments-content relative inline-block rounded-xl p-3 text-zinc-800 dark:text-zinc-200 rounded-tl-sm bg-zinc-600/5 dark:bg-zinc-500/20 max-w-full overflow-auto">
              <HsinMarkdown :md="item.body" :cid="item.node_id" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="activeTab === 1">
      <Gallery :photos="displayData" layout="columns" provider="ipx" />
    </div>
    <div v-if="activeTab === 2">
      <div class="flex items-center justify-center mt-4 flex-col space-y-1">
        <HsinMap :geo-data="geo" />
      </div>
    </div>
  </main>
</template>

<style>
/* 一宫格 */
.moments-content blockquote+p:has(img:nth-child(1)) {
  @apply mt-2
}

/* 二宫格 */
.moments-content blockquote+p:has(img:nth-child(2)) {
  @apply grid grid-cols-2 gap-2 mt-2
}

/* 三宫格 */
.moments-content blockquote+p:has(img:nth-child(3)) {
  @apply grid grid-cols-3 gap-2 mt-2
}

/* 四宫格 */
.moments-content blockquote+p:has(img:nth-child(4)) {
  @apply grid grid-cols-2 gap-2 mt-2
}

/* 九宫格 */
.moments-content blockquote+p:has(img:nth-child(9)) {
  @apply grid grid-cols-3 gap-2 mt-2
}

.moments-content blockquote+p img{
  @apply w-full h-full object-cover overflow-hidden aspect-[1/1] filter dark:brightness-50
}
</style>
