<script setup lang="ts">
import type { Activity } from '~/types'

const { socials } = useAppConfig()

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'))

useIntervalFn(async () => await refresh(), 5000)
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
      <ClientOnly>
        <div v-if="activity?.data?.spotify">
          <span class="flex items-center">
            <UIcon
              name="i-logos:spotify-icon"
              size="18"
            />
            <span class="ml-1">
              正在听：<strong>{{ activity?.data?.spotify.song }} - {{ activity?.data?.spotify.artist }}</strong>
            </span>
          </span>
        </div>
      </ClientOnly>
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <h1>找到我</h1>
        <div class="flex gap-2 flex-wrap">
          <HomeLink
            v-for="social in socials"
            :key="social.label"
            :href="social.link"
            :icon="`i-${social.icon}`"
            :label="social.label"
            target="_blank"
          />
        </div>
      </div>
      <div class="flex flex-row gap-2">
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
