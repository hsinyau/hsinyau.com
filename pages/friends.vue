<script setup>
const { site } = useAppConfig()
const title = '友情链接'
const description = '快来和我做朋友吧~'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} | ${site.title}`,
  ogDescription: description,
  twitterTitle: `${title} | ${site.title}`,
  twitterDescription: description,
})

const { data: friends } = await useAsyncData('all-friends', () => queryContent('/friends').find())
</script>

<template>
  <main class="mt-12 space-y-12">
    <HsinTitle
      :title
      :description
    />
    <ul class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-content-between">
      <li v-for="item in friends[0].body" :key="item.link">
        <NuxtLink
          :href="item.link"
          target="_black"
          class="flex items-center gap-4 cursor-pointer relative group"
        >
          <div class="group-hover:rotate-[360deg] transition-transform duration-500">
            <NuxtImg
              provider="cloudflare"
              class="rounded-full size-16"
              :src="item.avatar"
              alt="Avatar"
              placeholder
            />
          </div>
          <div class="space-y-3">
            <h3 class="text-base font-medium line-clamp-1">
              {{ item.name }}
            </h3>
            <p class="text-sm text-gray-500 line-clamp-1">
              {{ item.desc }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
