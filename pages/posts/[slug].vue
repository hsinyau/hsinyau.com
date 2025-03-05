<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').path(route.path).first())

useSeoMeta({
  title: post.value?.title,
  description: post.value?.summary,
  ogTitle: post.value?.title,
  ogDescription: post.value?.summary,
  twitterTitle: post.value?.title,
  twitterDescription: post.value?.summary,
})

const {
  data: postDB,
  refresh,
} = await useAsyncData(`post:${route.params.slug}:db`, () => $fetch(`/api/posts/${route.params.slug}`, { method: 'POST' }), { lazy: true })

function getDetails() {
  const likes = postDB.value?.likes ?? 0
  const views = postDB.value?.views ?? 0

  return {
    likes: `${likes} 点赞`,
    views: `${views} 浏览`,
  }
}

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

const { copy, copied } = useClipboard({
  source: `https://hsinyau.com/posts/${route.params.slug}`,
  copiedDuring: 4000,
})

const { progress } = useReadingProgress()
</script>

<template>
  <main v-if="post" class="flex gap-8">
    <div class="flex-1">
      <div class="mt-2">
        <div class="flex items-end gap-4 flex-wrap">
          <h1 class="font-bold text-3xl text-black dark:text-white">
            {{ post.title }}
          </h1>
        </div>
        <div class="border-l-2 pl-2 mt-2 border-neutral-300 dark:border-neutral-700 flex gap-1 items-center flex-wrap">
          <UIcon name="ph:tag-duotone" size="16" />
          <p class="text-sm">
            {{ post.tag }}
          </p>·
          <UIcon name="ph:calendar-duotone" size="16" />
          <p class="text-sm">
            {{ useDateFormat(post.created, 'YYYY-MM-DD') }}
          </p>·
          <UIcon name="i-ph-heart-duotone" size="16" />
          <p class="text-sm">
            {{ getDetails().likes }}
          </p>·
          <UIcon name="i-ph-eye-duotone" size="16" />
          <p class="text-sm">
            {{ getDetails().views }}
          </p>·
          <UIcon name="ph:cursor-text-duotone" size="16" />
          <p class="text-sm">
            {{ post.meta.readingTime.words }}字
          </p>·
          <UIcon name="ph:timer-duotone" size="16" />
          <p class="text-sm">
            {{ Math.round(post.meta.readingTime.words / 400) }}分钟阅读
          </p>
        </div>
        <div class="mt-4 text-base">
          AI 生成的摘要：{{ post.summary }}
        </div>
        <USeparator
          class="mt-8"
          icon="i-ph-pencil-line-duotone"
        />
        <div class="mt-8 flex gap-8">
          <article class="flex-1 article-content">
            <ContentRenderer :value="post" class="!max-w-none prose dark:prose-invert" />
          </article>
          <aside class="hidden lg:block w-52">
            <div class="sticky top-8">
              <PostToc :toc="post?.body?.toc?.links" />
              <USeparator class="mt-4" />
              <div class="flex items-center gap-2 text-sm mt-4 text-zinc-500">
                阅读进度：{{ progress }}%
              </div>
              <span
                class="flex items-center gap-2 mt-4 group text-sm hover:text-black dark:hover:text-white duration-300 cursor-pointer"
                @click="$router.back()"
              >
                <UIcon
                  class="group-hover:-translate-x-1 transform duration-300"
                  name="i-ph-arrow-circle-left-duotone"
                  size="20"
                />
                返回上页
              </span>
            </div>
          </aside>
        </div>
        <USeparator
          class="my-16"
          icon="i-ph-hands-clapping-duotone"
        />
        <div class="space-y-8">
          <p>
            <strong>感谢您阅读这篇文章！如果您喜欢它，请考虑与您的朋友分享。别忘了点个赞哦！</strong>
          </p>
          <div class="flex gap-4 items-center flex-wrap">
            <UTooltip :text="likeCookie ? '已点赞' : '点赞'" :disabled="!likeCookie" :delay-duration="0">
              <UButton
                :label="`${postDB?.likes} 点赞`"
                :color="likeCookie ? 'error' : 'neutral'"
                icon="i-ph-heart-duotone"
                size="lg"
                :variant="likeCookie ? 'solid' : 'outline'"
                @click.prevent="handleLike()"
              />
            </UTooltip>
            <UButton
              v-if="copied"
              color="success"
              icon="i-ph-copy-simple-duotone"
              label="复制成功"
              size="lg"
              variant="outline"
              @click.prevent="copy()"
            />
            <UButton
              v-else
              color="neutral"
              icon="i-ph-copy-simple-duotone"
              label="复制链接"
              size="lg"
              variant="outline"
              @click.prevent="copy()"
            />
          </div>
        </div>
        <USeparator
          class="my-16"
          icon="i-ph:messenger-logo-duotone"
        />
        <LazyHsinComment />
      </div>
    </div>
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  @apply no-underline;
}
</style>
