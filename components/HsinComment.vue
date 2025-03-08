<script setup>
import { Waline } from '@waline/client/component'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import '@waline/client/style'

const path = computed(() => useRoute().path)
const { site } = useAppConfig()
</script>

<template>
  <ClientOnly>
    <Waline
      :path="path"
      :server-u-r-l="site.comment.serverURL"
      :reaction="false"
      :locale="{
        sofa: site.comment.locale.sofa,
        placeholder: site.comment.locale.placeholder,
      }"
      :emoji="site.comment.emoji"
      :search="false"
    />
  </ClientOnly>
</template>

<style>
@reference "tailwindcss";

.wl-comment .wl-panel {
  @apply m-0 mt-4;
}

.dark .wl-comment .wl-panel {
  @apply bg-neutral-600/5 border-neutral-800;
}

.dark .wl-comment .wl-panel .wl-header {
  @apply border-b-neutral-800;
}

.dark .wl-comment .wl-panel .wl-header .wl-header-item * {
  @apply text-zinc-300;
}

.wl-comment .wl-panel .wl-editor {
  @apply text-zinc-800;
}

.dark .wl-comment .wl-panel .wl-editor {
  @apply text-zinc-300;
}

.dark .wl-comment .wl-panel .wl-editor:focus,
.dark .wl-input:focus {
  @apply bg-zinc-800/60;
}

.dark .wl-footer button.wl-btn {
  @apply border-zinc-800 text-zinc-300;
}

.wl-footer .wl-actions a {
  @apply inline-block flex items-center;
}

.wl-footer .wl-actions svg {
  @apply text-zinc-500;
}

.dark .wl-card .wl-meta .wl-browser,
.dark .wl-card .wl-meta .wl-addr,
.dark .wl-card .wl-meta .wl-os {
  @apply bg-zinc-800;
}

.dark .wl-card .wl-content p {
  @apply text-zinc-100;
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
