<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
const { hero, social } = useAppConfig()
</script>

<template>
  <div class="space-y-6 md:my-16 select-none slide-enter-content">
    <div class="flex flex-col-reverse gap-8 md:flex-row md:justify-between">
      <div class="flex flex-col gap-4 will-change-[transform,opacity] md:max-w-xl">
        <h1 class="bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text font-title text-2xl font-bold leading-9 text-transparent dark:from-white dark:via-white/90 dark:to-white/70 sm:text-4xl sm:leading-[3.5rem]">
          嗨，很高兴能在这里与你相遇。我是 𝐻𝑠𝑖𝑛𝑦𝑎𝑢, 一个
          <div class="inline-grid h-9 overflow-hidden sm:h-[3.5rem]">
            <swiper
              :modules="[Autoplay]"
              :direction="'vertical'" 
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false
              }"
              :loop="true"
              class="h-9 sm:h-[3.5rem] ease-in-out"
            >
              <swiper-slide
                v-for="(item, index) in hero"
                :key="index"
                class="flex items-center bg-clip-text text-transparent bg-gradient-to-r from-yau-primary to-purple-500"
              >
                {{ item }}
              </swiper-slide>
            </swiper>
          </div>
          。
          <br >
          欢迎酷酷的你来到这个小小的网站。
        </h1>
        <div class="text-sm flex gap-5 mt-2 text-muted-foreground">
          <NuxtLink
            v-for="item in social" 
            :key="item.icon"
            :to="item.link"
            target="_blank"
          >
            <img :src="item.icon" :class="[item.color, item.icon === 'https://icons.ly/github ' ? 'dark:invert' : '', 'text-2xl size-6']">
          </NuxtLink>
        </div>
      </div>
      <div class="relative size-20 md:size-28 mt-8">
        <img
          src="/img/avatar.jpg"
          class="rounded-full"
          width="112"
          height="112"
          alt="Avatar"
        >
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 opacity-0 blur-2xl md:opacity-50" />
      </div>
    </div>
  </div>
</template>
