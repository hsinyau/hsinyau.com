<script lang="ts" setup>
const { width } = useWindowSize()
</script>

<template>
  <ClientOnly>
    <div
      v-if="width > 1024"
      class="group text-[12px] italic flex items-center gap-1"
    >
      <UIcon
        class="transform -rotate-12 duration-300 group-hover:animate-wave"
        name="i-ph-hand-pointing-duotone"
      />
      <p>将鼠标悬停在粗体文本上以了解有关我的更多信息。</p>
    </div>
  </ClientOnly>
</template>
