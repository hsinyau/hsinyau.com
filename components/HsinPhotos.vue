<script setup lang="ts">
const { data: photos, status, error } = await useAsyncData<any>('photos', () => $fetch('/api/collection/photos'), { lazy: true })
</script>

<template>
  <div v-if="photos" class="not-prose">
    <div class="flex justify-between items-center mt-6 mb-4">
      <span class="font-bold text-gray-600 dark:text-gray-300 text-lg"><span class="animate-pulse">✨</span>最近捕获</span>
      <NuxtLink
        class="flex items-center gap-2 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/collection?tab=gallery"
      >
        查看更多
        <UIcon
          class="group-hover:translate-x-1 transform duration-300"
          name="i-ph-arrow-right-duotone"
          size="20"
        />
      </NuxtLink>
    </div>
    <div v-if="status === 'pending'" class="h-24 flex items-center justify-center">
      <p class="text-sm text-gray-500">
        画卷徐展，景致渐明
      </p>
    </div>

    <div v-else-if="error" class="h-24 flex items-center justify-center">
      <p class="text-sm text-red-500">
        云雾蔽日，未达所愿
      </p>
    </div>

    <div v-else class="flex justify-between gap-3 overflow-hidden">
      <div
        v-for="item in photos?.photos?.slice(0, 4)"
        :key="item.id"
        class="rounded-xl w-1/4 h-1/4 aspect-[1/1] relative  bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 overflow-hidden group"
      >
        <NuxtImg
          :src="item.src"
          :alt="item.description"
          placeholder
          class="rounded-lg w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-all duration-500"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
