<script lang="ts" setup>
interface ExternalLink {
  title: string
  url: string
}

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  externalLink: {
    type: Object as PropType<ExternalLink>,
    required: false,
    default: null,
  },
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
      <span>{{ title }}</span>
      <span v-if="externalLink" class="ml-4">
        <NuxtLink :to="externalLink.url" class="opacity-30 hover:opacity-70 transition-opacity" target="_blank">
          {{ externalLink.title }}
        </NuxtLink>
      </span>
    </h1>
    <p class="mt-4 text-base">
      {{ description }}
    </p>
  </div>
</template>
