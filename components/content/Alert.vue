<script setup lang="ts">
interface AlertProps {
  content?: string | any
  type?: 'success' | 'warning' | 'tip' | 'danger'
}

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'success',
})

const classes = computed(() => {
  return [
    {
      'border-emerald-100 bg-emerald-50 text-emerald-500': props.type === 'success',
      'border-amber-100 bg-amber-50 text-amber-500': props.type === 'warning',
      'border-cyan-100 bg-cyan-50 text-cyan-500': props.type === 'tip',
      'border-pink-100 bg-pink-50 text-pink-500': props.type === 'danger',
    },
  ]
})
</script>

<template>
  <div :class="classes" class="flex w-full items-start gap-4 rounded-xl border px-4 my-4 text-sm filter dark:brightness-75">
    <p><ContentSlot :use="$slots.default" unwrap="p" /></p>
  </div>
</template>
