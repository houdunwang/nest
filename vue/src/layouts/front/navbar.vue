<script setup lang="ts">
const { isLogin } = useAuth()
</script>

<template>
  <main class="bg-white shadow-sm py-5 border-t-4 border-t-orange-600 border-b border-b-gray-200">
    <section class="2xl:w-page m-auto px-3 flex justify-between">
      <router-link to="/" class="flex items-center gap-2 opacity-90 text-[#e74c3c]">
        <icon-application-two theme="outline" size="24" />
        <span class="font-bold text-2xl">houdunren.com</span>
      </router-link>
      <div class="links">
        <div class="hidden md:flex items-center gap-5">
          <a href="https://www.houdunren.com" target="_blank">视频教程</a>
          <a href="https://www.houdunren.com/live" target="_blank">晚八点直播</a>
          <a href="https://doc.houdunren.com" target="_blank">文档库</a>
        </div>
        <div class="flex items-center gap-2">
          <Notification v-if="isLogin()" />
          <div v-if="isLogin()">
            <HdUserAvatarMenu />
          </div>
          <div v-else class="flex items-center">
            <el-button type="success" size="small" @click="$router.push({ name: RouteEnum.LOGIN })"> 登录 </el-button>
            <el-button type="primary" size="small" @click="$router.push({ name: RouteEnum.REGISTER })">
              注册
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.links {
  @apply flex gap-5;
  a {
    @apply opacity-90 text-slate-600 font-bold;
    &:hover {
      @apply text-teal-700 font-bold;
    }
  }
}
</style>
