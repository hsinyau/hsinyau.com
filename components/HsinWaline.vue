<script setup>
import { Waline } from '@waline/client/component';

import '@waline/client/style';

defineProps({
  path: {
    type: String,
    required: true
  }
})
const runtimeConfig = useRuntimeConfig()

const locale = {
  sofa: '此时无声胜有声',
  placeholder: '填写邮箱可在被回复时收到邮件提醒~',
};

const emoji = [
  'https://cute.s3.bitiful.net/emojis/alus',
  'https://cute.s3.bitiful.net/emojis/qq',
  'https://cute.s3.bitiful.net/emojis/tieba',
  'https://cute.s3.bitiful.net/emojis/weibo',
  'https://cute.s3.bitiful.net/emojis/bilibili',
];
</script>
  
<template>
    <Waline
      :server-u-r-l="runtimeConfig.public.commentApi"
      :path="path"
      :locale="locale"
      :emoji="emoji"
    />
</template>

<style>
.wl-comment .wl-panel {
  @apply m-0 mt-4 dark:bg-gray-800/50 dark:border-gray-800;
}

.wl-comment .wl-panel .wl-header {
  @apply dark:border-b-gray-800;
}

.wl-comment .wl-panel .wl-header .wl-header-item * {
  @apply dark:text-gray-300;
}

.wl-comment .wl-panel .wl-editor {
  @apply text-gray-800 dark:text-gray-300;
}

.wl-comment .wl-panel .wl-editor:focus,
.wl-input:focus {
  @apply dark:bg-gray-800/60;
}

.wl-footer button.wl-btn {
  @apply dark:border-gray-800 dark:text-gray-300;
}

.wl-footer .wl-actions a {
  @apply inline-block flex items-center;
}

.wl-footer .wl-actions svg {
  @apply text-gray-500;
}

.wl-card .wl-meta .wl-browser,
.wl-card .wl-meta .wl-addr,
.wl-card .wl-meta .wl-os {
  @apply dark:bg-gray-800;
}

.wl-card .wl-content p {
  @apply dark:text-gray-100
}

.wl-power {
  @apply hidden
}

.wl-cards>.wl-card-item {
  @apply border border-gray-200 dark:border-gray-800 rounded-xl mb-3 px-4 pt-4
}

.wl-cards .wl-card {
  @apply border-b-0 pb-0
}

.wl-cards .wl-card .wl-quote {
  @apply border-none
}
</style>
