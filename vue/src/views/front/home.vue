<script setup lang="ts">
import SoftItem from '@/components/softItem.vue'
import XjAvatar from '@/assets/xj.jpg'
const { all, collections } = useSoft()

await all()
</script>

<template>
  <main v-if="collections">
    <div class="flex flex-col justify-center items-center mt-16 px-5">
      <img :src="XjAvatar" alt="hdcms" class="rounded-full object-cover w-52 h-52 shadow-inner" />
      <h1 class="text-5xl xl:text-8xl font-extrabold mt-6 text-transparent bg-clip-text">向军大叔作品</h1>
      <p class="text-gray-500 mt-5 text-xl xl:text-xl font-extralight">抖音与B站搜索【后盾人】晚八点直播</p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-20">
      <SoftItem :soft="soft" v-for="soft of collections.data" :show-button="false" />
    </div>
  </main>
</template>
<style scoped lang="scss">
h1 {
  animation: TitleAnimate 4s ease infinite;
  background-size: 500%;
  @apply bg-gradient-to-r from-yellow-600 to-red-600;
}
@keyframes TitleAnimate {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
