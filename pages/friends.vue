<script setup>
const title = '友情链接'
const description = '快来和我做朋友吧~'

useSeoMeta({
  title,
  description,
})

const { data: friends } = await useAsyncData('all-friends', () => queryContent('/friends').find())
</script>

<template>
  <main>
    <HsinTitle
      :title
      :description
    />
    <ul class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 place-content-between mt-12">
      <template v-for="friend in friends" :key="friend._id">
        <li v-for="item in friend.body" :key="item.link">
          <NuxtLink
            :href="item.link"
            target="_black"
            class="flex items-center gap-4 cursor-pointer relative group"
          >
            <div class="group-hover:rotate-[360deg] transition-transform duration-500">
              <UAvatar
                :src="item.avatar"
                alt="Avatar"
                size="2xl"
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
      </template>
    </ul>
  </main>
</template>
