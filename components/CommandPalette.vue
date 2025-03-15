<script setup lang="ts">
const open = ref(false)

const { data: posts } = await useAsyncData('AllPosts', async () => {
  const posts = await queryCollection('posts')
    .select('title', 'created', 'summary', 'tag', 'path')
    .order('created', 'DESC')
    .all()

  return posts
})

const searchTerm = ref('')

const groups = computed(() => [
  {
    id: 'posts',
    label: searchTerm.value ? `搜索博文 - ${searchTerm.value}` : '最新博文',
    items: posts.value?.map((post: { path: string, title: string }) => ({
      id: post.path,
      label: post.title,
      to: post.path,
      icon: 'i-lucide-file-text',
      onSelect: () => {
        open.value = false
      },
    })),
  },
  {
    id: 'other',
    label: '其他',
    items: [
      {
        id: 'rss',
        label: 'RSS',
        to: '/rss.xml',
        icon: 'i-lucide-rss',
        target: '_blank',
        onSelect: () => {
          open.value = false
        },
      },
    ],
  },
])

defineShortcuts({
  ctrl_k: () => {
    open.value = !open.value
  },
})
</script>

<template>
  <UModal v-model:open="open" class="cursor-pointer">
    <UTooltip text="搜索" :kbds="['ctrl', 'k']" :delay-duration="0">
      <UButton
        color="neutral"
        size="sm"
        variant="outline"
        icon="i-lucide-search"
      />
    </UTooltip>

    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        close
        class="h-100"
        :groups="groups"
        :fuse="{
          resultLimit: 9,
        }"
        @update:open="open = $event"
      />
    </template>
  </UModal>
</template>
