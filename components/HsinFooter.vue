<script setup lang="ts">
const socials = [
  {
    icon: 'ph:x-logo-duotone',
    label: 'Twitter',
    link: 'https://twitter.com/yau_1204',
  },
  {
    icon: 'ph:github-logo-duotone',
    label: 'GitHub',
    link: 'https://github.com/hsinyau',
  },
  {
    icon: 'ph:instagram-logo-duotone',
    label: 'Instagram',
    link: 'https://www.instagram.com/hsinyau_zz',
  },
  {
    icon: 'ph:telegram-logo-duotone',
    label: 'Telegram',
    link: 'https://t.me/hsinyau_channel',
  },
  {
    icon: 'ph:threads-logo-duotone',
    label: 'Threads',
    link: 'https://www.threads.net/@hsinyau_zz',
  },
  {
    icon: 'tabler:brand-netease-music',
    label: '网易云',
    link: 'https://music.163.com/#/user/home?id=1352085491',
  },
  {
    icon: 'tabler:brand-bilibili',
    label: '哔哩哔哩',
    link: 'https://space.bilibili.com/221029937',
  },
]
</script>

<template>
  <footer class="my-8">
    <div class="flex justify-center mb-16">
      <UDivider
        class="md:w-2/3"
        size="2xs"
        type="solid"
      />
    </div>
    <div class="space-y-4">
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <h1>找到我</h1>
        <div class="flex gap-2 flex-wrap">
          <HomeLink
            v-for="social in socials.sort((a, b) => a.label.localeCompare(b.label))"
            :key="social.label"
            :href="social.link"
            :icon="`i-${social.icon}`"
            :label="social.label"
            target="_blank"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <h1>发邮件</h1>
        <div class="flex">
          <HomeLink
            blanked
            icon="i-ph:envelope-duotone"
            href="mailto:hi@hsinyau.com"
            label="hi@hsinyau.com"
          />
        </div>
      </div>
    </div>
    <div class="mt-8 w-full flex justify-center text-xs">
      © {{ new Date().getFullYear() }} Hsinyau. All rights reserved.
    </div>
  </footer>
</template>
