<script lang="ts" setup>
import type { Activity } from '~/types'

const ides = [
  { name: 'Visual Studio Code', icon: 'visual-studio-code' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'intellij-idea' },
  { name: 'WebStorm', icon: 'webstorm' },
]

const language = [
  { name: 'javascript', icon: 'javascript' },
  { name: 'typescript', icon: 'typescript-icon' },
  { name: 'vue', icon: 'vue' },
  { name: 'markdown', icon: 'markdown' },
  { name: 'html', icon: 'html-5' },
  { name: 'css', icon: 'css-3' },
  { name: 'json', icon: 'json' },
  { name: 'svg', icon: 'svg' },
  { name: 'sql', icon: 'postgresql' },
  { name: 'yaml', icon: 'yaml' },
  { name: 'toml', icon: 'toml' },
  { name: 'git', icon: 'git-icon' },
  { name: 'npm', icon: 'npm-icon' },
]

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'))

useIntervalFn(async () => await refresh(), 5000)

const codingActivity = computed(() => activity.value!.data.activities.find(activity => ides.some(ide => ide.name === activity.name)))

const getActivity = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state, timestamps, assets } = codingActivity.value

  const isActive = name === 'Visual Studio Code'
    ? !details.includes('Idling')
    : state.toLowerCase().includes('editing')

  const project = details ? details.charAt(0).toUpperCase() + details.slice(1).replace('Workspace:', '').trim() : ''
  const stateWord = state.split(' ')[1]
  const timeAgo = useTimeAgo(timestamps.start, options).value

  return {
    active: isActive,
    name,
    project,
    assets: {
      large_text: assets.large_text.replace('Editing a ', '').replace(' file', ''),
      small_text: assets.small_text,
    },
    state: stateWord,
    start: timeAgo,
  }
})
</script>

<template>
  <ClientOnly>
    <div v-if="getActivity" class="flex items-start gap-2">
      <UTooltip :text="getActivity.active ? '我现在在线 👋' : '我开始摸鱼了 🐟'">
        <div class="relative flex h-3 w-3 mt-2">
          <div
            v-if="getActivity.active"
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
          />
          <div
            :class="getActivity.active ? 'bg-green-500' : 'bg-amber-500'"
            class="relative inline-flex rounded-full h-3 w-3"
          />
        </div>
      </UTooltip>
      <div v-if="getActivity.active">
        我正在使用
        <span class="space-x-1">
          <UIcon :name="`i-logos:${ides.find(ide => ide.name === getActivity!.name)!.icon}`" size="12" />
          <strong>{{ getActivity.assets.small_text }}</strong>
        </span>
        处理一个
        <span class="space-x-1">
          <UIcon
            v-if="language.find(lang => lang.name === getActivity!.assets.large_text.toLowerCase())"
            :name="`i-logos:${language.find(lang => lang.name === getActivity!.assets.large_text.toLowerCase())!.icon}`"
            size="12"
          />
          <strong>{{ getActivity.assets.large_text }}</strong>
        </span>
        文件。
        开始于
        {{ getActivity.start }}。
      </div>
      <div v-else class="space-x-1">
        <UIcon
          :name="ides.find(ide => ide.name === getActivity!.name)!.icon"
          size="16"
        />
        <strong>{{ getActivity.name }}</strong>
      </div>
    </div>
    <div v-else class="my-5 flex md:items-start gap-2">
      <UTooltip text="我现在不在线 🫥">
        <span class="cursor-not-allowed h-3 w-3 inline-flex rounded-full bg-red-500 mt-2" />
      </UTooltip>
      <p class="not-prose">
        {{ '我现在不在线 🫥' }}
      </p>
    </div>
  </ClientOnly>
</template>

<!-- <i18n lang="json">
{
  "en": {
    "offline": "I'm currently offline. Come back later to see what I'm working on.",
    "working": "I'm actually working on {project}, editing {state}, using {editor}. I've started {start}, the {format}.",
    "idling": "I'm idling on my computer with {editor} running in background.",
    "tooltip": {
      "online": "",
      "offline": "I'm offline 🫥",
      "idling": "I'm sleeping 😴"
    },
    "separator": "at"
  },
  "fr": {
    "offline": "Je suis actuellement hors ligne. Revenez plus tard pour voir sur quoi je travaille.",
    "working": "Je travaille actuellement sur {project}, éditant {state}, en utilisant {editor}. J'ai commencé il y a {start}, le {format}.",
    "idling": "Je suis en veille sur mon ordinateur avec {editor} en arrière-plan.",
    "tooltip": {
      "online": "Je suis connecté 👋",
      "offline": "Je suis déconnecté 🫥",
      "idling": "Je dors 😴"
    },
    "separator": "à"
  },
  "es": {
    "offline": "Ahora mismo estoy desconectado. Vuelve más tarde para ver en lo que estoy trabajando.",
    "working": "Estoy trabajando en {project}, editando {state}, y utilizando {editor}. He empezado hace {start}, el {format}.",
    "idling": "Estoy en reposo en mi ordenador con {editor} en segundo plano.",
    "tooltip": {
      "online": "Estoy conectado 👋",
      "offline": "Estoy desconectado 🫥",
      "idling": "Estoy durmiendo 😴"
    },
    "separator": "a"
  }
}
</i18n> -->
