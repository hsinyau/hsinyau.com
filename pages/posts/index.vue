<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () => queryContent('/posts').sort({ created: -1 }).find())
const tags = [...new Set(posts?.value?.map((post) => post.tag))]

// 添加年份显示逻辑
const postsWithYearInfo = computed(() => {
  let prevYear = 0
  return posts.value?.map(post => {
    const currentYear = new Date(post.created).getFullYear()
    const showYear = currentYear !== prevYear
    prevYear = currentYear
    return { post, showYear, year: currentYear }
  })
})

// 添加标签过滤功能
const selectedTag = ref('全部')
const filteredPosts = computed(() => {
  if (selectedTag.value === '全部') {
    return postsWithYearInfo.value
  }
  const filtered = postsWithYearInfo.value?.filter(({ post }) => post.tag === selectedTag.value)
  
  // 重新计算年份显示
  let prevYear = 0
  return filtered?.map(item => {
    const showYear = item.year !== prevYear
    prevYear = item.year
    return { ...item, showYear }
  })
})

const selectTag = (tag: string) => {
  selectedTag.value = tag
}
</script>

<template>
  <div class="mt-8 font-sans">
    <p class="text-neutral-500 dark:text-neutral-400">
      目前共有 {{ tags.length }} 个标签，{{ posts?.length }} 篇博文，再接再厉
    </p>
    <div class="flex flex-row flex-wrap mt-4 dark:text-gray-200">
      <div class="flex-[1_auto] p-1 text-center">
        <span :class="{'border-yau-primary dark:border-yau-primary/50': selectedTag === '全部'}" class="block text-sm px-4 py-2 font-medium cursor-pointer border border-gray-200 dark:border-gray-800 rounded-md hover:bg-[#f0f0f0] dark:hover:bg-[#262626] focus:relative" @click="selectTag('全部')">
          全部
        </span>
      </div>
      <template v-for="tag in tags" :key="tag">
        <div class="flex-[1_auto] p-1 text-center">
          <span :class="{'border-yau-primary dark:border-yau-primary/50': selectedTag === tag}" class="block text-sm px-4 py-2 font-medium cursor-pointer border border-gray-200 dark:border-gray-800 rounded-md hover:bg-[#f0f0f0] dark:hover:bg-[#262626] focus:relative" @click="selectTag(tag)">
            {{ tag }}
          </span>
        </div>
      </template>
    </div>
    <div class="space-y-2 lg:text-lg dark:text-white font-sans">
      <template v-for="{ post, showYear, year } in filteredPosts" :key="post._id">
        <li class="group list-none cursor-pointer">
          <!-- 年份显示组件 -->
          <div v-if="showYear" class="select-none relative h-12 pointer-events-none">
            <span class="text-7xl color-transparent absolute font-bold text-stroke-2 text-stroke-hex-aaa op-10 top-2">
              {{ year }}
            </span>
          </div>
          
          <span class="flex flex-col md:flex-row place-content-between text-neutral-500 dark:text-neutral-400 mb-4 slide-enter-content">
            <NuxtLink :href="post._path" class="bg-line bg-gradient-to-r from-[#fda4af] to-[#edd1d8] dark:from-[#fda4ae80] dark:to-[#edd1d880] bg-[length:0px_10px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px]">
              {{ post.title }}
            </NuxtLink>

            <small class="space-x-2">
              {{ post.created.slice(5, 10) }}
            </small>
          </span>
        </li>
      </template>
    </div>
  </div>
</template>
