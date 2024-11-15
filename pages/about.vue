<script>

</script>

<template>
    <div class="mt-20">
      <div class="relative flex justify-center filter dark:brightness-50">
        <div class="relative w-44 h-44 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
          <span class="absolute inset-5 rounded-full bg-white z-1"/>
          <img
            src="/img/avatar.jpg"
            alt="Avatar"
            class="m-auto rounded-full overflow-hidden w-40 h-40 z-10"
          >
        </div>
      </div>
      <div class="dark:text-white mb-8 font-sans flex justify-center font-700 text-[2rem] mt-4 slide-enter">
        关于本站
      </div>
      <div class="mx-auto card py-6 px-4 rounded-2xl w-full slide-enter-content">
        <ContentDoc v-slot="{ doc }">
          <article class="prose w-full max-w-none dark:prose-invert dark:text-white">
            <ContentRenderer :value="doc" />
          </article>
        </ContentDoc>
      </div>
    </div>
</template>
