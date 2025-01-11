<script setup lang="ts">
defineProps<{
  posts: any[]
}>()
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <li
      v-for="(post, id) in posts"
      :key="id"
      class=" h-full border p-4 shadow-sm border-zinc-200 rounded-md hover:border-zinc-500 dark:border-zinc-800 dark:hover:border-zinc-500  duration-300"
    >
      <NuxtLink :to="post._path">
        <article class="space-y-2">
          <h2 class="font-bold text-lg duration-300 text-black dark:text-white line-clamp-1">
            {{ post.title }}
          </h2>
          <div class="text-sm text-zinc-500 duration-300 flex items-center gap-1">
            <UIcon name="ph:calendar-duotone" size="16" />
            <p>
              {{ useTimeAgo(post.created, options) }}
            </p>·
            <UIcon name="ph:timer-duotone" size="16" />
            <p>{{ Math.round(post.readingTime.words / 400) }}分钟阅读</p>·
            <UIcon name="ph:tag-duotone" size="16" />
            <p>{{ post.tag }}</p>
          </div>
          <h3 class="line-clamp-2">
            {{ post.summary }}
          </h3>
        </article>
      </NuxtLink>
    </li>
  </ul>
</template>
