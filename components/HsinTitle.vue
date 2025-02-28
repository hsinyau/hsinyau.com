<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  other: {
    type: Object as PropType<{
      title: string
      link: string
    }>,
    required: false,
  },
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
      <span>{{ title }}</span>
      <span v-if="other" class="ml-4">
        <NuxtLink :to="other.link" class="opacity-30 hover:opacity-70 transition-opacity" target="_blank">
          {{ other.title }}
        </NuxtLink>
      </span>
    </h1>
    <p class="mt-4 text-base">
      {{ description }}
    </p>
  </div>
</template>
