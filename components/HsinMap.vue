<script setup lang="ts">
defineProps<{
  geoData: any
}>()
const config = useRuntimeConfig()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

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
  <div class="relative h-80 md:h-96 w-full border border-zinc-200 dark:border-zinc-800 rounded-lg">
    <MapboxMap
      :options="{
        accessToken: config.public.mapboxAccessToken,
        style: isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
        center: coordinates,
        zoom,
        minZoom: 4,
        maxZoom: 14,
        projection: 'globe',
        attributionControl: false,
      }"
      class="relative z-10 h-full w-full"
      map-id="map"
      locale="zh-Hans"
      @load="async (map: any) => {
        const mapboxgl = await import('mapbox-gl');

        map.addSource('geo-data', {
          type: 'geojson',
          data: geoData,
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
          className: 'map-marker',
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
          new ResetControl(),
          'top-right',
        );

        map.addControl(
          new mapboxgl.default.FullscreenControl(),
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
                      <p class='font-bold text-base text-black'>${properties.name || '未知地点'}</p>
                      <p class='text-sm opacity-75 text-zinc-800'>${properties.description || '暂无描述'}</p>
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
</template>

<style>
.mapbox-logo {
  display: none;
}

.mapboxgl-ctrl-logo {
  display: none !important;
}

.mapboxgl-canvas {
  border-radius: 1rem;
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
  @apply size-5 mx-auto;
}

.mapboxgl-ctrl-reset:disabled svg path {
  @apply opacity-50;
}

.dark .mapboxgl-ctrl-reset svg path {
  @apply fill-zinc-800;
}
</style>
