<template>
  <header
      class="max-w-5xl inset-x-0 border border-gray-200/50 dark:border-gray-800/80 top-4 sticky w-full z-40 mx-auto flex h-[60px] items-center justify-between rounded-2xl px-4 shadow-sm saturate-100 transition-colors bg-white dark:bg-black/50 bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-saturate-200"
    >
    <NuxtLink to="/" class="flex items-center justify-center gap-1">
      <span class="sr-only">Home</span>
      <Logo width={28} height={28} aria-hidden="true" />
    </NuxtLink>
    <div class="flex items-center gap-2">
      <Navbar />
      <div data-orientation="vertical" role="none" class="shrink-0 bg-[rgba(135,150,165,.075)] mr-2 w-px h-6"/>
      <ThemeSwitch />
      <MenuDrawer />
    </div>
  </header>
</template>
