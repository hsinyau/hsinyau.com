<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  text: {
    type: [String, Number],
    required: true,
  },
  hover: {
    type: String,
    required: true,
  },
  position: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
  },
  href: {
    type: String,
  },
})
</script>

<template>
  <ClientOnly>
    <UTooltip
      :popper="{ placement: position }"
      :text="hover"
    >
      <NuxtLink v-if="href" :href="href" target="_black">
        <strong class="leading-3 cursor-point">{{ text }}</strong>
      </NuxtLink>
      <strong v-else class="leading-3 cursor-help">{{ text }}</strong>
    </UTooltip>
  </ClientOnly>
</template>
