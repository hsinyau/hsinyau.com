<script setup lang="ts">
  const { friends, site } = useAppConfig()
</script>

<template>
  <div class="mt-8">
      <div class="mx-auto text-gray-600">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 slide-enter-content">
            <NuxtLink v-for="friend in friends" :key="friend.link" class="w-full transition-opacity ease" :href="friend.link" target="_blank">
              <div class="h-full w-full flex items-center p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-filter backdrop-blur-lg">
                <div class="w-16 h-16 mr-4 flex-shrink-0 overflow-hidden rounded-full">
                  <img
                    alt="team"
                    class="w-16 h-16 object-cover object-center rounded-full filter dark:brightness-50"
                    :src="friend.avatar"
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
      <div class="card p-4 divide-y w-full divide-gray-100 dark:text-gray-200 rounded-xl mt-4">
      <div class="flex items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium mx-auto mb-4">
          快来和我做朋友吧
        </h2>
      </div>
      <span class="mt-4 leading-loose">
        <dl class=" divide-gray-100 text-sm border-y border-gray-200 dark:border-gray-800">
          <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800/50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium">站点名称🪪</dt>
            <dd class="sm:col-span-2">{{site.title}}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800/50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium">站点描述🎨</dt>
            <dd class="sm:col-span-2">{{site.description}}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800/50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium">站点链接🔗</dt>
            <dd class="sm:col-span-2">{{site.domain}}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800/50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium">站点头像🪄</dt>
            <dd class="sm:col-span-2">
              <a :href="site.avatar" target="_blank">点击查看</a>
            </dd>
          </div>
        </dl>
      </span>
      <p class="text-center mt-4">申请加入友链请在下方留言✨</p>
    </div>
      <HsinWaline path="/friends" />
    </div>
</template>
