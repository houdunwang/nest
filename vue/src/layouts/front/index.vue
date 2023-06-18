<script lang="ts" setup>
import footerVue from './footer.vue'
import Navbar from './navbar.vue'
</script>
<template>
  <main>
    <Navbar />
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <component :is="Component" :key="route.fullPath" class="w-full 2xl:w-page mx-auto p-3 lg:mt-5" />
      </template>
    </RouterView>
    <footerVue />
  </main>
</template>
