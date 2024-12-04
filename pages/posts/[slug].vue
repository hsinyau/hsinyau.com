<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(`post:${route.params.slug}`, () => queryContent(`/posts/${route.params.slug}`).findOne())
const {
  data: postDB,
  refresh,
} = await useAsyncData(`post:${route.params.slug}:db`, () => $fetch(`/api/posts/${route.params.slug}`, { method: 'POST' }))

const { copy, copied } = useClipboard({
  source: `https://hsinyau.com/posts/${route.params.slug}`,
  copiedDuring: 4000,
})

useSeoMeta({
  title: post.value?.title,
  description: post.value?.summary,
  ogTitle: post.value?.title,
  ogDescription: post.value?.summary,
  ogImage: '/opengraph.jpg',
  twitterTitle: post.value?.title,
  twitterDescription: post.value?.summary,
})

const likeCookie = useCookie<boolean>(`post:like:${route.params.slug}`, {
  maxAge: 7200,
})

async function handleLike() {
  if (likeCookie.value)
    return
  await $fetch(`/api/posts/like/${route.params.slug}`, { method: 'PUT' })
  await refresh()
  likeCookie.value = true
}
</script>

<template>
  <main v-if="post">
    <div class="flex">
      <NuxtLink
        class="flex items-center gap-2 mb-8 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/posts"
      >
        <UIcon
          class="group-hover:-translate-x-1 transform duration-300"
          name="i-ph-arrow-left-duotone"
          size="20"
        />
        返回上页
      </NuxtLink>
    </div>
    <div class="mt-2">
      <div class="flex items-end gap-4 flex-wrap">
        <h1 class="font-bold text-3xl text-black dark:text-white">
          {{ post.title }}
        </h1>
      </div>
      <div class="border-l-2 pl-2 mt-2 border-gray-300 dark:border-gray-700 rounded-sm flex gap-1 items-center">
        <UIcon name="i-ph-heart-duotone" size="16" />
        <p class="text-sm">
          {{ `${postDB?.likes ?? 0} 赞` }}
        </p>·
        <UIcon name="i-ph-eye-duotone" size="16" />
        <p class="text-sm">
          {{ `${postDB?.views ?? 0} 浏览` }}
        </p>·
        <UIcon name="ph:calendar-duotone" size="16" />
        <p class="text-sm">
          {{ useTimeAgo(post.created, options) }}
        </p>·
        <UIcon name="ph:timer-duotone" size="16" />
        <p class="text-sm">
          {{ Math.round(post.readingTime.words / 400) }}分钟阅读
        </p>
      </div>
      <div class="mt-4 text-base">
        AI 生成的摘要：{{ post.summary }}
      </div>
    </div>
    <UDivider
      class="mt-8"
      icon="i-ph-pencil-line-duotone"
    />
    <article class="mt-8">
      <ContentRenderer :value="post">
        <ContentRendererMarkdown
          :value="post"
          class="!max-w-none prose dark:prose-invert"
        />
      </ContentRenderer>
      <UDivider
        class="my-16"
        icon="i-ph-hands-clapping-duotone"
      />
      <div class="space-y-8">
        <p>
          <strong>感谢您阅读这篇文章！如果您喜欢它，请考虑与您的朋友分享。别忘了点个赞哦！</strong>
        </p>
        <div class="flex gap-4 items-center flex-wrap">
          <UButton
            :label="`${postDB?.likes || '0'} 赞`"
            :color="likeCookie ? 'red' : 'white'"
            icon="i-ph-heart-duotone"
            size="lg"
            variant="solid"
            @click.prevent="handleLike()"
          />
          <UButton
            v-if="copied"
            color="green"
            icon="i-ph-check-square-duotone"
            label="复制成功"
            size="lg"
            variant="outline"
            @click.prevent="copy()"
          />
          <UButton
            v-else
            color="white"
            icon="i-ph-square-duotone"
            label="复制链接"
            size="lg"
            variant="solid"
            @click.prevent="copy()"
          />
        </div>
      </div>
    </article>
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  @apply no-underline;
}
</style>
