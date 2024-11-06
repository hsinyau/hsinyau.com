<script setup lang="ts">
  const { friends } = useAppConfig()
</script>

<template>
  <div class="mt-8">
      <Card class="py-2 mb-4 flex justify-between flex-wrap select-none rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-filter backdrop-blur-lg">
        <div class="px-4 py-2 text-[12px] text-gray-500">
          友情链接
        </div>
      </Card>
      <div class="mx-auto text-gray-600">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 slide-enter-content">
            <NuxtLink v-for="friend in friends" :key="friend.link" class="w-full transition-opacity ease" :href="friend.link" target="_blank">
              <div class="h-full w-full flex items-center p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-filter backdrop-blur-lg">
                <div class="w-16 h-16 mr-4 flex-shrink-0 overflow-hidden rounded-full">
                  <img
                    alt="team"
                    class="w-16 h-16 object-cover object-center rounded-full filter dark:brightness-50"
                    :src="friend.avatar"
                    placeholder="blur"
                    width={100}
                    height={100}
                  >
                </div>
                <div class="flex-grow">
                  <h2 class="text-gray-900 title-font font-700 dark:text-gray-200">{{friend.name}}</h2>
                  <p class="text-gray-500 line-clamp-2">{{friend.desc}}</p>
                </div>
              </div>
            </NuxtLink>
        </div>
      </div>
      <Info />
      <Comment path="/friends" server-u-r-l={env.COMMENT_API} />
    </div>
</template>
