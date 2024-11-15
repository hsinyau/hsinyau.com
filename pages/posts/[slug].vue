<script setup>
const { site } = useAppConfig()
</script>

<template>
  <article class="mt-8">
    <ContentDoc class="prose w-full lg:w-3xl dark:prose-invert dark:text-white">
      <template #default="{ doc }">
        <article>
          <div
            class="font-sans w-full h-64 mt-4 <md:w-full rounded-xl relative overflow-hidden bg-no-repeat bg-center delay-4000 ease-in-out group">
            <img :src="doc.cover" alt="Cover" class="w-full h-full object-cover transition-transform duration-3000">
            <div class="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            <span class="absolute bottom-0 left-0 w-full px-4">
              <h1 class="mb-4 text-xl mx-auto font-bold text-black">{{ doc.title }}</h1>
              <span class="flex gap-2 items-center text-[14px] mb-2 text-black">
                <span class="inline-flex items-center space-x-0.5">
                  <i class="i-mingcute-time-line mt-0.25" />
                  <time class="font-medium">{{ doc.created.slice(0, 10) }}</time>
                </span>
                <span class="flex items-center space-x-0.5 flex-shrink-0 px-2">
                  <i class="i-mingcute-eye-line mt-0.25" />
                  <span class="waline-pageview-count " :data-path="doc.slug">999</span>
                </span>
                <span class="flex items-center space-x-0.5 flex-shrink-0">
                  <i class="i-mingcute-balloon-2-line mt-0.25" />
                  <span class="font-medium">{{ doc.tag }}</span>
                </span>
              </span>
            </span>
          </div>
          <div class="card space-y-2 my-4 rounded-xl p-4 dark:text-gray-300">
            <div class="flex items-center text-gray-500 text-sm mb-1">
              <i class="i-mingcute-bling-line mr-2" />AI 生成的摘要
            </div>
            <p class="text-base-content/85 !m-0 text-sm leading-loose">
              {{ doc.summary }}
            </p>
          </div>
          <ContentRenderer :value="doc" />
          <div class="card relative z-10 w-full p-4 mt-4 mb-2 overflow-hidden rounded-2xl">
            <svg width="144" height="144" class="svg-inline--fa fa-creative-commons fa-w-16 overflow-hidden absolute -right-6 -top-2 text-11xl text-gray-200 dark:text-gray-700 z-0" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="creative-commons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path fill="currentColor" d="M245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93-22.13 0-33.22 14.61-33.22 43.84 0 23.57 9.21 43.84 33.22 43.84 14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98-22.6 0-73.96-10.32-73.96-77.05 0-58.69 43-77.06 72.63-77.06 30.72-.01 52.7 11.95 65.99 35.86zm143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93-22.14 0-33.22 14.61-33.22 43.84 0 23.55 9.23 43.84 33.22 43.84 14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98-22.69 0-73.96-9.87-73.96-77.05 0-58.67 42.97-77.06 72.63-77.06 30.71-.01 52.58 11.95 65.56 35.86zM247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248 129.93 0 248.44-100.87 248.44-248 0-137.87-106.62-248-248.44-248zm.87 450.81c-112.54 0-203.7-93.04-203.7-202.81 0-105.42 85.43-203.27 203.72-203.27 112.53 0 202.82 89.46 202.82 203.26-.01 121.69-99.68 202.82-202.84 202.82z"/>
            </svg>
            <header class="z-10 relative">
              <p class="line-clamp-1 font-semibold dark:text-light-900">{{ doc.title }}</p>
              <a :href="`${site.domain}/posts/${doc.slug}`">
                <p class="text-sm text-true-gray-400 line-clamp-1">
                  {{ site.domain }}
                  /posts/
                  {{ doc.slug }}
                </p>
              </a>
            </header>
            <nav class="flex flex-row mt-4 z-10 relative">
              <div class="mr-4">
                <p class="text-xs line-clamp-1 text-true-gray-600">作者</p>
                <p class="md:text-sm text-xs line-clamp-1">
                  <a href="/" class="dark:text-true-gray-400">{{ site.author }}</a>
                </p>
              </div>
              <div class="mr-4">
                <p class="text-xs line-clamp-1 text-true-gray-600">发布于</p>
                <p class="md:text-sm text-xs line-clamp-1 dark:text-true-gray-400">
                  <time dateTime={doc.created}>{{ doc.created.slice(0, 10) }}</time>
                </p>
              </div>
              <div class="mr-4">
                <p class="text-xs line-clamp-1 text-true-gray-600">更新于</p>
                <p class="md:text-sm text-xs line-clamp-1 dark:text-true-gray-400">
                  <time dateTime={doc.created}>{{ doc.created.slice(0, 10) }}</time>
                </p>
              </div>
              <div class="mr-4">
                <p class="text-xs line-clamp-1 text-true-gray-600">许可协议</p>
                <p class="md:text-sm text-xs line-clamp-1 dark:text-true-gray-400">
                  <a class="mr-1" rel="noopener noreferrer" target="_blank" title="Creative Commons" href="https://creativecommons.org/">
                    <svg width="16" height="16" class="svg-inline--fa fa-creative-commons fa-w-16 inline-block" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="creative-commons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                      <path fill="currentColor" d="M245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93-22.13 0-33.22 14.61-33.22 43.84 0 23.57 9.21 43.84 33.22 43.84 14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98-22.6 0-73.96-10.32-73.96-77.05 0-58.69 43-77.06 72.63-77.06 30.72-.01 52.7 11.95 65.99 35.86zm143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93-22.14 0-33.22 14.61-33.22 43.84 0 23.55 9.23 43.84 33.22 43.84 14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98-22.69 0-73.96-9.87-73.96-77.05 0-58.67 42.97-77.06 72.63-77.06 30.71-.01 52.58 11.95 65.56 35.86zM247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248 129.93 0 248.44-100.87 248.44-248 0-137.87-106.62-248-248.44-248zm.87 450.81c-112.54 0-203.7-93.04-203.7-202.81 0-105.42 85.43-203.27 203.72-203.27 112.53 0 202.82 89.46 202.82 203.26-.01 121.69-99.68 202.82-202.84 202.82z"/>
                    </svg>
                  </a>
                </p>
              </div>
            </nav>
          </div>
        </article>
        <div class="mt-8">
          <span v-for="item in doc.toc" :key="item.id" class="tag">
            {{ item.title }}
          </span>
        </div>
      </template>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
  </article>
</template>
