<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
  children?: TocItem[]
}

defineProps({
  toc: {
    type: Array as PropType<TocItem[]>,
    default: () => [],
  },
})

const isActive = ref('')

// 监听滚动更新当前激活的标题
onMounted(() => {
  window.addEventListener('scroll', () => {
    const headings = document.querySelectorAll('h2, h3, h4')
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect()
      // 修改判断条件,增加一个上边距,这里设置为 150px
      if (rect.top > 0 && rect.top < 100) {
        isActive.value = heading.id
        // 找到当前激活的目录项并滚动到可视区域
        const activeLink = document.querySelector(`a[href="javascript:void(0)"][data-id="${heading.id}"]`)
        activeLink?.scrollIntoView({ block: 'nearest' })
        break
      }
    }
  })
})

// 平滑滚动到目标位置
function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (el) {
    // 添加一个偏移量,这里设置为 24px
    const offset = 24
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <nav v-if="toc.length > 0" class="sticky top-12 p-4 text-gray-500 text-sm">
    <div class="text-sm font-medium mb-2">
      目录
    </div>
    <ul class="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 max-h-[60vh] overflow-y-auto">
      <template v-for="item in toc" :key="item.id">
        <li>
          <a
            href="javascript:void(0)"
            class="block hover:text-black dark:hover:text-white duration-300 border-l-2 border-transparent"
            :class="{
              'text-black dark:text-white !border-green-500 pl-2': isActive === item.id,
              'pl-0': item.depth === 2,
              'pl-2': item.depth === 3,
              'pl-4': item.depth === 4,
            }"
            :data-id="item.id"
            @click="scrollToHeading(item.id)"
          >
            {{ item.text }}
          </a>
        </li>
        <template v-if="item.children">
          <li v-for="child in item.children" :key="child.id">
            <a
              href="javascript:void(0)"
              class="block hover:text-black dark:hover:text-white duration-300 border-l-2 border-transparent"
              :class="{
                'text-black dark:text-white !border-green-500 pl-4': isActive === child.id,
                'pl-0': child.depth === 2,
                'pl-2': child.depth === 3,
                'pl-4': child.depth === 4,
              }"
              :data-id="child.id"
              @click="scrollToHeading(child.id)"
            >
              {{ child.text }}
            </a>
          </li>
        </template>
      </template>
    </ul>
    <div>{{ }}</div>
  </nav>
</template>
