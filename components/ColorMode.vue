<template>
  <span className="flex items-center text-xl cursor-pointer" @click="$colorMode.preference === 'light' ? $colorMode.preference = 'dark' : $colorMode.preference = 'light'">
    <i :class="$colorMode.preference === 'light' ? 'i-mingcute-sun-line' : 'i-mingcute-moon-stars-line'" />
  </span>
</template>
