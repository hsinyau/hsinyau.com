<template>
  <NuxtLoadingIndicator color="pink" />
  <NuxtLayout>
    <NuxtPage />
    <ScrollToTop />
  </NuxtLayout>
</template>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px
}

::-webkit-scrollbar-thumb {
  background: rgba(60, 60, 67, 0.5);
  border-radius: 8px;
  cursor: pointer
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 113, 133, 1);
  opacity: 1;
  display: block !important
}

::-webkit-scrollbar-track {
  background-color: #00000000;
}
</style>
