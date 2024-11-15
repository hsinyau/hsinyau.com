<script setup lang="ts">
const {projects} = useAppConfig()
</script>

<template>
  <div class="projects mt-8">
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 slide-enter-content">
          <div v-for="item in projects" :key="item.name" class="card px-4 py-5 min-h-48 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900">
            <NuxtLink :to="item.url" target="_blank" class="space-y-3">
              <div class="flex items-center gap-x-3">
                <div class="w-14 h-14 rounded-full flex items-center justify-center">
                  <img
                    :src="item.icon"
                    :alt="item.name"
                    width="56"
                    height="56"
                  >
                </div>
                <div class="card-header">
                  <h3 class="text-base text-gray-800 dark:text-gray-200 font-semibold mt-1">
                    {{ item.name }}
                  </h3>
                  <div class="flex gap-2 mt-1">
                      <span v-for="tag in item.tags" :key="tag" class="block text-sm text-gray-500 font-medium">
                        {{ tag }}
                      </span>
                  </div>
                </div>
              </div>
              <p class="text-gray-500 sm:text-sm line-clamp-2 min-h-12">
                {{ item.description }}
              </p>
              <div class="text-sm text-gray-500 flex items-center gap-6">
                <span class="flex items-center gap-1 leading-normal">
                  <i class="i-mingcute-time-line"/>
                  {{ item.created.slice(0, 7) }}
                </span>
                <span class="flex items-center gap-1 leading-normal">
                  <i class="i-mingcute-celebrate-line"/>
                  {{ item.status }}
                </span>
                <span class="flex items-center gap-1 leading-normal">
                  <i class="i-mingcute-idcard-line"/>
                  {{ item.owner }}
                </span>
              </div>
            </NuxtLink>
          </div>
    </ul>
  </div>
</template>
