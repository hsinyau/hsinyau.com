<script setup lang="ts">
const { uses } = useAppConfig()
</script>

<template>
    <div class="mt-8">
        <div v-for="item in uses" :key="item.category" class="uses-class-item slide-enter-content">
          <div class="flex items-center gap-2 my-4 leading-none">
            <span class="text-xl text-gray-800 dark:text-white">
              {{ item.category }}
              -
            </span>
            <span class="text-zinc-500">{{ item.category_desc }}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="i in item.items" :key="i.link" class="card border overflow-hidden min-h-50 relative rounded-xl border-gray-200 dark:border-zinc-800 group">
              <div class="w-full h-[200px] relative bg-[#f7f7f9] dark:bg-[#21232a] flex justify-center">
                <img
                    class="h-full w-auto group-hover:scale-105 overflow-hidden transition-transform duration-600 ease-in-out"
                    :alt="i.title"
                    :src="i.image"
                    width={200}
                    height={200}
                  >
                </div>
                <div class="mt-3 pt-2 pb-4 px-4 dark:text-white">
                  <div class="text-lg font-bold leading-none whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer w-fit mb-2">
                    {{i.title}}
                  </div>
                  <div class="text-xs leading-none whitespace-nowrap overflow-hidden text-ellipsis mb-3">
                    {{i.model}}
                  </div>
                  <div class="mt-1 mb-2 leading-5 h-15 overflow-hidden text-sm line-clamp-3">
                    {{i.desc}}
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>
