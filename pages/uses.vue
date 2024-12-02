<script setup lang="ts">
const title = '我的装备'
const description = '我平时用于游戏、编程、视频制作和日常使用的设备与软件，以及我喜欢的小工具和其他推荐物品。'

useSeoMeta({
  title,
  description,
})

const { data: items } = await useAsyncData('uses', () => queryContent('/uses').find())

const categories = [
  { id: 'hardware', title: '硬件' },
  { id: 'software', title: '软件' },
  { id: 'other', title: '其他' },
]

const categorizedItems = categories.map(category => ({
  ...category,
  items: items.value!.filter(item => item.category === category.id),
}))
</script>

<template>
  <main>
    <HsinTitle
      :title="title"
      :description="description"
    />
    <div class="mt-12 space-y-24">
      <UsesList
        v-for="category in categorizedItems"
        :key="category.id"
        :title="category.title"
      >
        <UsesItem
          v-for="(item, id) in category.items"
          :key="id"
          :item="item"
        />
      </UsesList>
    </div>
  </main>
</template>
