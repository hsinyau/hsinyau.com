<script setup lang="ts">
interface GalleryItem {
  id: string
  src: string
  width: number
  height: number
  date: string
}
const { data: posts } = await useAsyncData('posts', () => queryContent('/posts').sort({ created: -1 }).limit(6).find())
const { data, status, error } = await useAsyncData<{ gallery: GalleryItem[] }>('gallery-1', () => $fetch('/api/gallery?page=1'))
const photos = computed(() => data.value?.gallery.slice(0, 5))
</script>

<template>
  <div class="mt-8">
    <HsinHero />
    <div class="flex justify-between items-center mt-8 slide-enter-content">
      <span class="font-bold text-gray-600 dark:text-gray-300 text-lg">
        ✨ 近期博文
      </span>
      <NuxtLink to="/posts" class="lbtn">
        更多
        <i class="i-mingcute-right-line"/>
      </NuxtLink>
    </div>
    <div class="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 slide-enter-content">
      <div v-for="post in posts" :key="post._id" class="card rounded-2xl transition-all flex flex-col items-center group relative">
        <NuxtLink :href="post._path">
          <div class="rounded-t-2xl overflow-hidden flex items-center relative w-full aspect-video">
            <div class="w-full h-full">
              <span class="inline-flex justify-center w-full h-full relative overflow-hidden">
                <img
                  alt="cover"
                  class="object-cover w-full dark:filter dark:brightness-50 group-hover:scale-105 overflow-hidden transition-transform duration-600 ease-in-out"
                  :src="post.cover"
                  width="1920"
                  height="1080"
                >
              </span>
            </div>
          </div>
          <div class="px-3 py-2 sm:px-5 sm:py-4 w-full min-w-0 flex flex-col space-y-2 text-sm">
            <div class="line-clamp-3 text-ellipsis space-y-2">
              <h2 class="font-bold text-base text-gray-600 line-clamp-1 dark:text-gray-300">{{post.title}}</h2>
              <div class="text-zinc-500 line-clamp-3">
                {{post.summary}}
              </div>
            </div>
            <div class="text-zinc-400 flex items-center text-sm h-[26px] truncate">
              <span class="sm:inline-flex items-center justify-center py-[1.5px] mr-2 leading-1">
                <i class="i-mingcute-bookmark-line mr-[2px] text-sm" />
                <span>{{post.tag}}</span>
              </span>
              <span class="sm:inline-flex items-center justify-center mr-2 leading-1">
                <i class="i-mingcute-time-line mr-[2px] text-sm" />
                <span>{{post.created}}</span>
              </span>
              <!-- <span class="sm:inline-flex items-center justify-center mr-2 leading-1">
                <i class="i-mingcute-sandglass-line mr-[2px] text-sm" />
                <span>
                  {post.metadata.readingTime}
                  分钟
                </span>
              </span> -->
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- lastest photos -->
    <div class="mt-8">
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold dark:text-gray-200">
          📸 近期捕获
        </span>
        <NuxtLink to="/gallery" class="lbtn">
          更多
          <i class="i-mingcute-right-line"/>
        </NuxtLink>
      </div>
      <div v-if="status === 'pending'" class="h-24">
        <HsinLoading loading-text="画卷徐展，景致渐明" />
      </div>
      <div v-else-if="error" class="h-24">
        <div class="text-center text-gray-500">云雾蔽日，未达所愿</div>
      </div>
      <div v-else class="flex justify-between items-center overflow-hidden">
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="rounded-xl my-8 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 overflow-hidden group"
          :style="{transform: `rotate(${Math.random() * 20 - 10}deg)`}"
        >
          <img
            :src="photo.src"
            alt="gallery images"
            class="rounded-lg h-20 w-20 md:h-48 md:w-48 flex-shrink-0 object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0"
          >
        </div>
      </div>
    </div>
  </div>
</template>
