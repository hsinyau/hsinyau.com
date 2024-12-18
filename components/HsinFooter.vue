<template>
  <footer class="mt-8">
    <div class="flex justify-center mb-8">
      <UDivider
        class="md:w-2/3"
        size="2xs"
        type="solid"
      />
    </div>
    <div class="text-xs text-gray-500 pt-6 text-center">
      <span>
        &copy;
        2022 -
        {{ new Date().getFullYear() }}
        <NuxtLink href="/" class="hover:underline">
          𝐻𝑠𝑖𝑛𝑦𝑎𝑢
        </NuxtLink>
        <span class="px-1">•</span>
        <NuxtLink href="https://icp.gov.moe/?keyword=20242023" target="_blank" class="hover:underline">萌ICP备20242023号</NuxtLink>
      </span>
    </div>
  </footer>
</template>
