<template>
  <div class="max-w-5xl mx-auto flex flex-col min-h-[100dvh] px-4">
    <HsinHeader />
    <main class="grow">
      <slot />
    </main>
    <HsinFooter />
  </div>
</template>
