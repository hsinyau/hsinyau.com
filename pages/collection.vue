<script setup lang="ts">
import type { Photos } from '~/types/gallery'
import type { Moment, Moments } from '~/types/moments'

const config = useRuntimeConfig()

const title = '动态汇集'
const description = '对我的近况感兴趣？快来看看最近做了什么、去了哪里、看到了什么...'

useSeoMeta({
  title,
  description,
})

const tags = [
  {
    label: '动态',
    icon: 'i-ph-books-duotone',
    color: 'black',
  },
  {
    label: '画廊',
    icon: 'i-ph-books-duotone',
    color: 'black',
  },
  {
    label: '足迹',
    icon: 'i-ph-books-duotone',
    color: 'black',
  },
]

const activeTab = ref(0)

const { data: moments } = await useFetch<Moments>('/api/collection/moments')
const { data: photos } = await useFetch<Photos>('/api/collection/photos')
const { data: geo } = await useFetch<any>('/api/collection/geo')
const displayData = computed(() => {
  switch (activeTab.value) {
    case 0:
      return moments.value?.moments || []
    case 1:
      return photos.value?.photos || []
    case 2:
      return geo.value?.features || []
    default:
      return moments.value?.moments || []
  }
})

const zoom = ref(4)
const coordinates = ref<[number, number]>([106.5504, 29.5632])

class ResetControl {
  private _map: any
  private _container: HTMLDivElement
  private _button: HTMLButtonElement
  private _defaultCenter: [number, number] = [106.5504, 29.5632]
  private _defaultZoom: number = 4

  constructor() {
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    this._button = document.createElement('button')
    this._button.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-reset'
    this._button.type = 'button'
    this._button.title = '返回初始视图'
    this._button.setAttribute('aria-label', '返回初始视图')
    this._button.disabled = true

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', '24')
    svg.setAttribute('height', '24')
    svg.setAttribute('viewBox', '0 0 256 256')

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('fill', 'currentColor')
    path.setAttribute('d', 'M244 56v48a12 12 0 0 1-12 12h-48a12 12 0 1 1 0-24h17.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76 76 0 1 0 127 204h1a75.53 75.53 0 0 0 52.15-20.72a12 12 0 0 1 16.49 17.45A99.45 99.45 0 0 1 128 228h-1.37a100 100 0 1 1 71.88-170.94L220 76.72V56a12 12 0 0 1 24 0')

    svg.appendChild(path)
    this._button.appendChild(svg)
    this._container.appendChild(this._button)
  }

  onAdd(map: any) {
    this._map = map
    this._button.onclick = this._resetMap.bind(this)
    this._map.on('moveend', this._updateButtonState.bind(this))
    this._map.on('zoomend', this._updateButtonState.bind(this))
    return this._container
  }

  onRemove() {
    if (this._map) {
      this._map.off('moveend', this._updateButtonState.bind(this))
      this._map.off('zoomend', this._updateButtonState.bind(this))
    }
    this._container.parentNode?.removeChild(this._container)
    this._map = undefined
  }

  private _resetMap() {
    this._map?.flyTo({
      center: this._defaultCenter,
      zoom: this._defaultZoom,
      duration: 1000,
    })
  }

  private _updateButtonState() {
    if (!this._map)
      return

    const currentCenter = this._map.getCenter()
    const currentZoom = this._map.getZoom()

    const isCenterDefault = Math.abs(currentCenter.lng - this._defaultCenter[0]) < 0.0001
      && Math.abs(currentCenter.lat - this._defaultCenter[1]) < 0.0001
    const isZoomDefault = Math.abs(currentZoom - this._defaultZoom) < 0.1

    this._button.disabled = isCenterDefault && isZoomDefault
  }
}
</script>

<template>
  <main class="space-y-12 mt-12">
    <HsinTitle
      :title
      :description
    />
    <UTabs
      v-model="activeTab"
      :items="tags"
    >
      <template #default="{ item }">
        <span class="truncate">{{ item.label }}</span>
      </template>
    </UTabs>
    <ul v-if="activeTab === 0">
      <li v-for="item in displayData as Moment[]" :key="item.node_id" class="group mb-2 flex flex-col gap-2" style="opacity: 1; transform: none;">
        <div class="flex gap-4">
          <NuxtImg
            src="https://cdn.jsdelivr.net/gh/hsinyau/static@master/avatar.jpg"
            class="size-[40px] rounded-full ring-2 ring-slate-200 dark:ring-zinc-800"
          />
          <div class="flex flex-col items-center self-start md:flex-row md:gap-2">
            <span class="self-start text-lg font-medium md:self-auto">Hsinyau</span>
            <span class="text-xs opacity-80 md:-translate-y-1 md:self-end">{{ useTimeAgo(Number(item.title) * 1000) }}</span>
          </div>
        </div>
        <div class="min-w-0 max-w-full mt-2 pl-4 md:mt-0 md:-translate-y-4 md:pl-14">
          <div class="relative w-full min-w-0">
            <div class="relative inline-block rounded-xl p-3 text-zinc-800 dark:text-zinc-200 rounded-tl-sm bg-zinc-600/5 dark:bg-zinc-500/20 max-w-full overflow-auto">
              {{ item.body }}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="activeTab === 1">
      <Gallery :photos="displayData" layout="columns" />
    </div>
    <div v-if="activeTab === 2">
      <div class="flex items-center justify-center mt-4 flex-col space-y-1">
        <div class="relative h-80 md:h-96 w-full border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <MapboxMap
            :options="{
              accessToken: config.public.mapbox.accessToken,
              style: 'mapbox://styles/mapbox/light-v10',
              center: coordinates,
              zoom,
              minZoom: 4,
              maxZoom: 14,
              projection: 'globe',
            }"
            class="relative z-10 h-full w-full"
            map-id="map"
            locale="zh-Hans"
            @load="async (map: any) => {
              const mapboxgl = await import('mapbox-gl');

              map.addSource('geo-data', {
                type: 'geojson',
                data: geo,
              });

              map.addLayer({
                id: 'geo-points',
                type: 'circle',
                source: 'geo-data',
                paint: {
                  'circle-radius': 8,
                  'circle-color': '#00DC82',
                  'circle-stroke-width': 2,
                  'circle-stroke-color': '#eeeeee',
                },
              });

              // 创建一个弹出框
              const popup = new mapboxgl.default.Popup({
                closeButton: false,
                closeOnClick: false,
                className: 'map-popup',
              });

              // 添加点击事件监听器
              map.on('click', 'geo-points', (e: any) => {
                // 获取点击位置的坐标
                const coordinates = e.features[0].geometry.coordinates;

                // 飞行到点击的位置并放大
                map.flyTo({
                  center: coordinates,
                  zoom: 12,
                  duration: 2000,
                });
              });
              // 添加导航控件
              map.addControl(
                new mapboxgl.default.NavigationControl({
                  showCompass: true, // 显示指南针
                  showZoom: true, // 显示缩放按钮
                  visualizePitch: false, // 显示倾斜控制
                }),
                'top-right',
              );

              map.addControl(
                new mapboxgl.default.FullscreenControl(),
                'top-right',
              );

              map.addControl(
                new ResetControl(),
                'top-right',
              );

              // 当鼠标悬停在点上时显示弹出框
              map.on('mouseenter', 'geo-points', (e: any) => {
                map.getCanvas().style.cursor = 'pointer';

                const coordinates = e.features[0].geometry.coordinates.slice();
                const properties = e.features[0].properties;

                // 确保弹出框显示在视口内
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // 设置弹出框内容并显示
                popup
                  .setLngLat(coordinates)
                  .setHTML(`
                    <div class='map-popup'>
                      <p class='font-bold'>${properties.name || '未知地点'}</p>
                      <p class='text-sm opacity-75'>${properties.description || '暂无描述'}</p>
                    </div>
                  `)
                  .addTo(map);
              });

              // 当鼠标离开点时移除弹出框
              map.on('mouseleave', 'geo-points', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
              });
            }"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.map-marker {
  background: linear-gradient(180deg,#2df4a3,#024603);
  background-size: cover;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 16px 60px 0 rgba(0, 0, 0, .08), 0 6px 12px 0 rgba(0, 0, 0, .1);
  cursor: pointer;
  height: 18px;
  transition: width .2s ease-out, height .2s ease-out;
  width: 18px;
}

.map-popup .mapboxgl-popup-close-button,
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none !important;
}

.map-marker:hover {
  transform: scale(1.1);
}

.map-popup h3 {
  @apply text-base text-black;
}

.map-popup p {
  @apply text-sm text-gray-500;
}

.mapboxgl-ctrl-reset {
  background-image: none !important;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.mapboxgl-ctrl-reset svg {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 2px;
}

.mapboxgl-ctrl-reset:disabled {
  opacity: 0.5 !important;
  cursor: default;
}

.mapboxgl-ctrl-reset:disabled:hover {
  background-color: inherit;
}
</style>
