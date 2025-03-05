<script setup>
import { Waline } from '@waline/client/component'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SITE_COMMENT } from '~/lib/constants'
import '@waline/client/style'

const path = computed(() => useRoute().path)
</script>

<template>
  <ClientOnly>
    <Waline
      :path="path"
      :server-u-r-l="SITE_COMMENT.serverURL"
      :locale="{
        sofa: SITE_COMMENT.locale.sofa,
        placeholder: SITE_COMMENT.locale.placeholder,
      }"
      :emoji="SITE_COMMENT.emoji"
      :search="false"
    />
  </ClientOnly>
</template>

<style>
@reference "tailwindcss";

.wl-comment .wl-panel {
  @apply m-0 mt-4 dark:bg-zinc-600/5 dark:border-zinc-800;
}

.wl-comment .wl-panel .wl-header {
  @apply dark:border-b-zinc-800;
}

.wl-comment .wl-panel .wl-header .wl-header-item * {
  @apply dark:text-zinc-300;
}

.wl-comment .wl-panel .wl-editor {
  @apply text-zinc-800 dark:text-zinc-300;
}

.wl-comment .wl-panel .wl-editor:focus,
.wl-input:focus {
  @apply dark:bg-zinc-800/60;
}

.wl-footer button.wl-btn {
  @apply dark:border-zinc-800 dark:text-zinc-300;
}

.wl-footer .wl-actions a {
  @apply inline-block flex items-center;
}

.wl-footer .wl-actions svg {
  @apply text-zinc-500;
}

.wl-card .wl-meta .wl-browser,
.wl-card .wl-meta .wl-addr,
.wl-card .wl-meta .wl-os {
  @apply dark:bg-zinc-800;
}

.wl-card .wl-content p {
  @apply dark:text-zinc-100
}

.wl-power {
  @apply hidden
}

.wl-cards .wl-card {
  @apply border-b-0 pb-0
}

.wl-cards .wl-card .wl-quote {
  @apply border-none
}
</style>
