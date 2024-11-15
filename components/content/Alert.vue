<script setup>
defineProps({
  type: {
    type: String,
    default: 'success',
  },
  content: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    class="flex w-full items-start gap-4 rounded-xl border px-4 my-4 text-sm filter dark:brightness-75"
    :class="{
        'border-emerald-100 bg-emerald-50 text-emerald-500': type === 'success',
        'border-amber-100 bg-amber-50 text-amber-500': type === 'warning',
        'border-cyan-100 bg-cyan-50 text-cyan-500': type === 'tip',
      'border-pink-100 bg-pink-50 text-pink-500': type === 'danger',
    }"
  >
    <p v-html="content" />
  </div>
</template>
