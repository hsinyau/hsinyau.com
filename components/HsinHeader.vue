<script setup lang="ts">
const { menu } = useAppConfig()
</script>

<template>
  <header 
    border="1 gray-200/50 dark:gray-800/80 rounded-2xl"
    bg="white dark:black/50 opacity-50"
    backdrop="filter blur-lg saturate-200"
    flex="~ items-center justify-between"
    text="gray-900 dark:gray-200"
    class="max-w-5xl inset-x-0 top-4 sticky w-full z-40 mx-auto h-[60px] px-4 shadow-sm saturate-100"
  >
    <NuxtLink to="/" class="flex items-center justify-center gap-1">
      <HsinLogo />
    </NuxtLink>
    <div class="flex items-center gap-2">
      <ul class="hidden space-x-2 md:flex">
        <li
          v-for="items in menu" 
          :key="items.key"
          class="relative flex h-[60px] font-bold items-center justify-center group"
        >
          <NuxtLink 
            class="rounded px-3 py-2 text-sm transition-colors hover:text-yau-accent" 
            :to="items.path"
          >
            {{ items.title }}
          </NuxtLink>
          <ul class="absolute top-full z-10 hidden w-24 bg-white dark:bg-zinc-900 rounded-b-md shadow-lg group-hover:block">
            <li 
              v-for="subLink in items.subMenu" 
              :key="subLink.key" 
              class="hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <NuxtLink 
                :href="subLink.path"
                class="block transition-colors text-sm text-gray-700 dark:text-gray-200 text-center px-4 py-2"
              >
                {{ subLink.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
      <div class="shrink-0 bg-[rgba(135,150,165,.075)] mr-2 w-px h-6" />
      <ColorMode />
    </div>
  </header>
</template>
