<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
  @tailwind components;
  @layer components {

    #app {
      @apply w-full h-full px-4;
    }

  }
</style>