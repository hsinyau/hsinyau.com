<script setup lang="ts">

interface GithubIssue {
  id: number
  title: string
  body: string
  labels: Array<{
    id: number
    name: string
  }>
}
const { data: moments } = await useAsyncData<GithubIssue[]>('moments', () => $fetch('/api/moments'))

</script>
<template>
    <div class="mt-8 pb-4 flex flex-col justify-center items-center gap-4 animate-fade-up animate-ease-in-out delay-200">
        <div v-for="moment in moments" :key="moment.id" class="card w-full rounded-2xl py-3 px-4">
          <div class="flex">
          <div class="mr-2 w-10 h-10 overflow-hidden rounded-full">
            <img
              class="rounded-full h-10 w-10 filter dark:brightness-75 no-zoom"
              width="40"
              height="40"
              src="https://bu.dusays.com/2024/06/28/667e4cb48a25c.png"
              alt="Avatar"
            >
          </div>
          <div>
            <div class="flex space-x-1">
              <span class="text-gray-800 dark:text-gray-300">HSINYAU</span>
              <span class="text-blue-500 mdi:account-badge"/>
            </div>
            <div class="text-gray-500 leading-4 flex time-ago">
              <div class="card text-left px-1 mr-1 rounded-md text-sm">
                {{ moment.title }}
              </div>
              <div class="card text-left px-1 rounded-md text-sm mr-1">
                <template v-for="label in moment.labels" :key="label.id">
                  <span>
                    #
                    {{ label.name }}
                  </span>
                </template>
              </div>
              <!-- {{ moment.body.match(/&\S+/g) && (
                <Card class="text-left px-1 rounded-md text-sm">
                  {{ moment.body.match(/&\S+/g)?.map((match: string | any[]) => match.slice(1)) }}
                </Card>
              )}} -->
            </div>

          </div>
        </div>
        <div class="pt-3">
          <div class="moments-content text-lg <md:text-base dark:text-gray-300">
            {{ moment.body }}
          </div>
          </div>
        </div>
    </div>
</template>
