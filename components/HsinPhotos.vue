<script setup lang="ts">
const { data: photos } = await useAsyncData<any>('photos', () => $fetch('/api/photos'), { lazy: true })
</script>

<template>
  <div class="not-prose">
    <div class="flex justify-between items-center mt-6 mb-4">
      <span class="font-bold text-gray-600 dark:text-gray-300 text-lg"><span class="animate-pulse">✨</span>最近捕获</span>
      <NuxtLink
        class="flex items-center gap-2 group text-sm hover:text-black dark:hover:text-white duration-300"
        href="https://photos.hsinyau.com"
        target="_blank"
      >
        查看更多
        <UIcon
          class="group-hover:translate-x-1 transform duration-300"
          name="i-ph-arrow-right-duotone"
          size="20"
        />
      </NuxtLink>
    </div>

    <div v-if="photos" class="grid grid-cols-2 md:flex gap-3 overflow-hidden">
      <div
        v-for="item in photos.slice(0, 4)"
        :key="item.id"
        class="rounded-xl md:w-1/4 aspect-[1/1] relative bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 overflow-hidden group"
      >
        <NuxtImg
          :src="item.src"
          :alt="item.description"
          :width="item.width"
          :height="item.height"
          format="webp"
          quality="80"
          placeholder
          class="rounded-lg w-full h-full object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-500 dark:brightness-75"
          loading="lazy"
        />
        <div v-if="item.description" class="absolute bottom-0 left-0 w-full overflow-hidden">
          <div class="text-white text-sm rounded-b-xl bg-zinc-800/60 backdrop-blur-sm w-full p-2 text-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
