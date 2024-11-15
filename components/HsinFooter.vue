<script setup lang="ts">
  const { site } = useAppConfig()
  const current_year = new Date().getFullYear()
</script>

<template>
  <footer class="text-xs text-gray-500 py-6 pt-6 text-center font-sans" style="border-top: 1px solid rgba(135,150,165,.075)">
    <span>&copy; {{ site.title }} {{ site.start_at }} - {{ current_year }}</span>
    <span class="px-2">•</span>
    <NuxtLink to="https://icp.gov.moe/?keyword=20242023" target="_blank">
      {{ site.moeIcp }}
    </NuxtLink>
  </footer>
</template>
