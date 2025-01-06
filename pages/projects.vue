<script setup lang="ts">
const { site } = useAppConfig()
const title = '我的项目'
const description = '工作、个人、开源。自己的或参与开发的项目。'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${site.title}`,
  ogDescription: description,
  twitterTitle: `${title} | ${site.title}`,
  twitterDescription: description,
})

const { data: projects } = await useAsyncData('all-projects', () => queryContent('/projects').sort({ order: -1 }).find())
</script>

<template>
  <main class="mt-12 space-y-12">
    <HsinTitle
      :title="title"
      :description="description"
    />
    <div
      v-for="project in projects"
      :key="project.id"
    >
      <div class="select-none relative h-12 pointer-events-none">
        <span class="text-7xl font-sans absolute font-bold opacity-10 dark:opacity-[0.15]" style="-webkit-text-stroke: 1px #777; -webkit-text-fill-color: transparent;">
          {{ project.category }}
        </span>
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="item in project.data" :key="item.link" class="border border-zinc-200 shadow-sm rounded-md hover:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-500 duration-300">
          <NuxtLink
            class="text-accent self-start font-normal no-underline relative p-2.5 flex flex-row items-center gap-2 place-items-stretch"
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
                <p class="font-medium text-base text-primary-txt line-clamp-1">
                  {{ item.title }}
                </p>
              </div>
              <p class="text-sm text-secondary-txt line-clamp-2">
                {{ item.description }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>
