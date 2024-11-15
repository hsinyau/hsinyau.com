<script setup lang="ts">
import { ref, watch } from 'vue'
import { PhotoAlbum } from 'vue-photo-album'
import PhotoColumn from '@/components/PhotoColumn.vue'
definePageMeta({
  layout: 'full-screen',
})

interface GalleryItem {
  id: string
  src: string
  width: number
  height: number
  date: string
}
const page = ref(1)
const loading = ref(false)
const { data, refresh } = await useAsyncData<{ gallery: GalleryItem[], last_page: number, current_page: number }>(`gallery-${page.value}`, () => $fetch(`/api/gallery?page=${page.value}`))
const photos = ref(data.value?.gallery ?? [])

watch(page, async () => {
  loading.value = true
  await refresh()
  photos.value = data.value?.gallery ?? []
  loading.value = false
})
</script>

<template>
  <div class="mt-8">
    <HsinLoading v-if="loading" loading-text="画卷展，流年绘" />
    <PhotoAlbum v-else :photo-renderer="PhotoColumn" :photos="photos" layout="columns" :spacing="5" />
    <div class="pagination flex justify-center items-center py-5 gap-4">
      <button v-if="page > 1" class="btn" @click="page--">
        <i className="i-mingcute-left-line" />
        <span>上一页</span>
      </button>
      <button disabled class="btn opacity-50">
        {{ `${page} / ${data?.last_page}` }}
      </button>
      <button v-if="page < (data?.last_page ?? 1)" class="btn" @click="page++">
        <span>下一页</span>
        <i className="i-mingcute-right-line" />
      </button>
    </div>
  </div>
</template>
