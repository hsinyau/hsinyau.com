<script lang="ts" setup>
interface Stats {
  seconds: number
  languages: Array<{
    name: string
    total_seconds: number
  }>
}
const { data: stats } = await useFetch<Stats>('/api/stats')
</script>

<template>
  <ClientOnly>
    <p v-if="stats">
      我从 WakaTime 获取了一些数据，始于
      <HoverText
        text="2022 年 3 月"
        hover="第一次知道这个东西 🫣"
      />。
      截至目前我编写代码时间约
      <HoverText
        hover="为啥这么久了还是这么菜 😮"
        :text="usePrecision(stats.seconds / 3600, 0).value"
      />
      小时。过去一年我使用最多的编辑器是
      <HoverText
        text="VS Code"
        hover="要不了多久就是 Cursor 了 😄"
      />、
      使用最多的操作系统是
      <HoverText
        text="Windows"
        hover="没实力 买不起 Mac 😭"
      />、使用最多的语言是
      <HoverText
        :hover="`约 ${usePrecision(stats.languages[0].total_seconds / 3600, 0).value} 小时`"
        :text="stats.languages[0].name"
      />
      其次是
      <HoverText
        :hover="`约 ${usePrecision(stats.languages[1].total_seconds / 3600, 0).value} 小时`"
        :text="stats.languages[1].name"
      />。
    </p>
  </ClientOnly>
</template>
