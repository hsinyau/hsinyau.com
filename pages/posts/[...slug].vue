<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(`post:/posts/${route.params.slug}`, () =>
  queryCollection('posts').path(route.path).first())

useSeoMeta({
  title: post.value?.title,
  description: post.value?.summary,
  ogTitle: post.value?.title,
  ogDescription: post.value?.summary,
  twitterTitle: post.value?.title,
  twitterDescription: post.value?.summary,
})

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
            <ContentRenderer v-if="post" :value="post.body" class="!max-w-none prose dark:prose-invert" />
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
                @click="copy()"
              >
                <UIcon
                  class="group-hover:-translate-x-1 transform duration-300"
                  name="i-ph-copy-simple-duotone"
                  size="20"
                />
                {{ copied ? '复制成功' : '复制链接' }}
              </span>
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
          <p class="text-center">
            <strong>感谢您阅读这篇文章！如果您喜欢它，请考虑与您的朋友分享。</strong>
          </p>
          <HsinComment />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@reference "tailwindcss";

.prose a {
  @apply no-underline;
}

.prose :not(h1, h2, h3, h4, h5, h6) a {
  border-bottom: 1px solid rgba(125,125,125,.3);
}

.prose :not(h1, h2, h3, h4, h5, h6) a:hover {
  border-bottom: 1px solid #bbb;
}
</style>
