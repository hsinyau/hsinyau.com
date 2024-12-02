<script setup lang="ts">
const title = '文稿'
const description = '阅读我关于软件开发、设计及生活等方面的想法。'

useSeoMeta({
  title,
  description,
})

const { data: posts } = await useAsyncData('all-posts', () => queryContent('/posts')
  .sort({ created: -1 })
  .without('body')
  .find())
</script>

<template>
  <main class="space-y-12">
    <HsinTitle
      :title
      :description
    />
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink
        v-for="(post, id) in posts"
        :key="id"
        :to="post._path"
      >
        <li
          class=" h-full border p-4 shadow-sm border-neutral-200 rounded-md hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500  duration-300"
        >
          <article class="space-y-2">
            <h1 class="font-bold text-lg duration-300 text-black dark:text-white">
              {{ post.title }}
            </h1>
            <div class="text-sm text-neutral-500 duration-300 flex items-center gap-1">
              <UIcon name="ph:calendar-duotone" size="16" />
              <p>{{ useDateFormat(post.created, 'YYYY-MM-DD').value }} </p>·
              <UIcon name="ph:timer-duotone" size="16" />
              <p>{{ post.readingTime }}12 分钟</p>·
              <UIcon name="ph:tag-duotone" size="16" />
              <p>{{ post.tag }}</p>
            </div>
            <h3 class="line-clamp-2">
              {{ post.summary }}
            </h3>
          </article>
        </li>
      </NuxtLink>
    </ul>
  </main>
</template>
