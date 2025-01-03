<template>
  <footer class="mt-8">
    <div class="flex justify-center mb-8">
      <UDivider
        class="md:w-2/3"
        size="2xs"
        type="solid"
      />
    </div>
    <div class="text-xs space-y-2 text-gray-500 pt-6 text-center">
      <div>
        &copy;
        2022 -
        {{ new Date().getFullYear() }}
        <NuxtLink href="/" class="hover:underline">
          Hsinyau
        </NuxtLink>
        <span class="px-1">•</span>萌ICP备
        <NuxtLink href="https://icp.gov.moe/?keyword=20242023" target="_blank" class="hover:underline">
          20242023
        </NuxtLink>号
      </div>
      <div>
        <NuxtLink href="/rss.xml" class="hover:underline" target="_blank">
          RSS
        </NuxtLink>
        <span class="px-1">•</span>
        <NuxtLink href="/sitemap.xml" class="hover:underline" target="_blank">
          站点地图
        </NuxtLink>
        <span class="px-1">•</span>
        <NuxtLink href="https://travel.moe/go" class="hover:underline" target="_blank">
          跃迁
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
