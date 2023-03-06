<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
  </div>
</template>

<style lang="scss">
  @tailwind components;
  @layer components {

    #app {
      @apply w-full h-full px-4;
      @apply flex flex-col justify-start items-stretch;
      
      & > [layout] {
        @apply flex-1;
      }
      
      footer {
        @apply flex-none;
      }
    }

  }
</style>