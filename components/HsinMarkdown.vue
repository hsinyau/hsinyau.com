<script setup lang="ts">
import markdownParser from '@nuxt/content/transformers/markdown'

const props = defineProps({
  md: {
    type: String,
    default: '',
  },
  cid: {
    type: String,
    default: '',
  },
})

const parsedMarkdown = await markdownParser.parse(props.cid, props.md)
</script>

<template>
  <ContentRenderer :value="parsedMarkdown" />
</template>
