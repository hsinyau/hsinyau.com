<script setup lang="ts">
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const { hero } = useAppConfig()
</script>

<template>
  <div class="space-y-6 select-none slide-enter-content">
    <div class="flex flex-col justify-between sm:flex-row">
      <div class="flex flex-col gap-4 will-change-[transform,opacity] md:max-w-xl">
        <h1 class="bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text font-title text-2xl font-bold leading-9 text-transparent dark:from-white dark:via-white/90 dark:to-white/70 sm:text-4xl sm:leading-[3.5rem]">
          嗨，很高兴能在这里与你相遇。<br>我是 𝐻𝑠𝑖𝑛𝑦𝑎𝑢, 一个
          <div class="inline-grid h-9 overflow-hidden sm:h-[3.5rem]">
            <Swiper
              :modules="[Autoplay]"
              direction="vertical"
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
              }"
              :loop="true"
              class="h-9 sm:h-[3.5rem] ease-in-out"
            >
              <SwiperSlide
                v-for="item in hero"
                :key="item.text"
                class="flex items-center"
                :class="item.className"
              >
                {{ item.text }}
              </SwiperSlide>
            </Swiper>
          </div>
          。
          <br>
          欢迎酷酷的你来到这个小小的网站。
        </h1>
      </div>
      <div class="relative hidden size-28 md:block">
        <NuxtImg
          provider="cloudflare"
          src="/image/avatar.jpg"
          class="rounded-full"
          width="112"
          height="112"
          alt="Avatar"
        />
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 opacity-0 blur-3xl md:opacity-50" />
      </div>
    </div>
  </div>
</template>
