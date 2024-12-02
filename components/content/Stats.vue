<script lang="ts" setup>
import type { Stats } from '~/types/stats'

const { data: stats } = await useFetch<Stats>('/api/stats')

const formatDate = (date: Date, format: string) => useDateFormat(date, format, { locales: 'zh-CN' }).value
</script>

<template>
  <ClientOnly>
    <p v-if="stats">
      我从 WakaTime 获取了一些数据
      {{ useTimeAgo(new Date(stats.coding.data.range?.start)).value.split(' ')[0] }}
      年，始于
      <HoverText
        hover="第一次知道这个东西 🫣"
        :text="formatDate(new Date(stats.coding.data.range.start), 'YYYY 年 M 月')"
      />。
      截至目前我编写代码时间约
      <HoverText
        hover="貌似没那么多 😮"
        :text="usePrecision(stats.coding.data.grand_total.total_seconds_including_other_language / 3600, 0).value"
      />
      小时。我使用最多的编辑器是
      {{ stats.editors.data.slice(0, 1).map(editor => `${editor.name} (${editor.percent}%)`).join('') }}。
      我编写代码使用最多的操作系统是
      <template v-if="stats.os.data[0]">
        {{ stats.os.data[0].name }} ({{ stats.os.data[0].percent }}%)
      </template>
      。 我使用最多的语言是
      {{ stats.languages.data.slice(0, 2).map(language => `${language.name} (${language.percent}%)`).join(' 和 ') }}。
    </p>
  </ClientOnly>
</template>
