<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const { copied, copy } = useClipboard({
  source: props.code,
  copiedDuring: 4000,
})
</script>

<template>
  <div class="code-block relative [&>pre]:!rounded-t-none [&>pre]:!my-0">
    <div class="flex items-center justify-between py-1.5 border border-zinc-200 dark:border-zinc-800 border-b-0 relative rounded-t-md px-4 not-prose">
      <span class="flex items-center gap-1.5">
        <UIcon :name="`custom:${language}`" />
        <span class="text-zinc-700 dark:text-zinc-200 text-sm/6">{{ filename }}</span>
      </span>
      <span class="flex items-center gap-1.5">
        <UTooltip v-if="copied" text="已复制">
          <UIcon
            name="i-ph:copy-simple-duotone"
            class="text-green-500 my-1.5 cursor-pointer"
            @click.prevent="copy()"
          />
        </UTooltip>
        <UTooltip v-else text="复制">
          <UIcon
            name="i-ph:copy-simple-duotone"
            class="my-1.5 cursor-pointer"
            @click.prevent="copy()"
          />
        </UTooltip>
      </span>
    </div>
    <pre :class="props.class" class="bg-[#f9f9f9] dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800"><slot /></pre>
  </div>
</template>

<style>
.code-block ~ .code-block {
  @apply mb-4
}

pre code .line {
  display: block;
}
</style>
