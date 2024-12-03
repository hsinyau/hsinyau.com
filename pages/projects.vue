<script setup lang="ts">
const title = '我的项目'
const description = '工作、个人、开源。自己的或参与开发的项目。'

useSeoMeta({
  title,
  description,
})

const { data: projects } = await useAsyncData('all-projects', () => queryContent('/projects').sort({ order: -1 }).find())
</script>

<template>
  <main class="mt-12 space-y-12">
    <HsinTitle
      :title="title"
      :description="description"
    />
    <HsinDivider
      v-for="project in projects"
      :key="project.id"
      :title="project.category"
    >
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="item in project.data" :key="item.link" class="border border-neutral-200 shadow-sm rounded-md hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500 duration-300">
          <NuxtLink
            class="text-accent self-start font-normal no-underline relative p-2.5 bg-transparent transition-colors flex flex-row items-center gap-2 place-items-stretch"
            :title="item.title"
            target="_blank"
            rel="noopener noreferrer"
            :href="item.link"
          >
            <span class="flex justify-center items-center rounded-md">
              <UIcon
                :name="item.icon"
                class="w-16 h-16"
              />
            </span>
            <div class="flex flex-col gap-0.5">
              <div class="flex flex-row gap-3 items-center">
                <p class="font-medium text-xs text-primary-txt line-clamp-1">
                  {{ item.title }}
                </p>
              </div>
              <p class="text-2xs text-secondary-txt line-clamp-2">
                {{ item.description }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </HsinDivider>
  </main>
</template>
