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

const { data: projects } = await useAsyncData('projects', async () => {
  return queryCollection('projects').all()
})
</script>

<template>
  <main class="mt-12 space-y-12">
    <HsinTitle
      :title="title"
      :description="description"
    />
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <li v-for="project in projects" :key="project.link" class="border border-zinc-200 shadow-sm rounded-md hover:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-500 duration-300">
        <NuxtLink
          class="text-accent self-start font-normal no-underline relative p-2.5 flex flex-row items-center gap-2 place-items-stretch"
          :title="project.title"
          target="_blank"
          rel="noopener noreferrer"
          :href="project.link"
        >
          <span class="flex justify-center items-center rounded-md">
            <UIcon
              :name="project.icon"
              class="w-16 h-16"
            />
          </span>
          <div class="flex flex-col gap-0.5">
            <div class="flex flex-row gap-3 items-center">
              <p class="font-medium text-base text-primary-txt line-clamp-1">
                {{ project.title }}
              </p>
            </div>
            <p class="text-sm text-secondary-txt line-clamp-2">
              {{ project.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
