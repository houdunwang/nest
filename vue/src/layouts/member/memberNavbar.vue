<script setup lang="ts">
import UserAvatarMenu from '@/components/hd/userAvatarMenu.vue'
import { Home, AllApplication } from '@icon-park/vue-next'
import config from '@/config'

const { open } = useUtil()
</script>

<template>
  <main class="bg-white px-3 border-b-4 border-[#e66767] py-3 shadow-sm">
    <section class="2xl:w-page m-auto relative z-50 border-b-1 flex justify-between items-center">
      <div class="flex items-center text-[#e66767] font-semibold gap-2">
        <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
          <home theme="outline" size="24" class="cursor-pointer hidden md:block" />
          <span class="text-xl">hdcms.com</span>
        </div>
        <el-dropdown trigger="click" size="default" class="md:hidden">
          <AllApplication theme="outline" size="26" fill="#e66767" class="md:hidden" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(menu, index) in config.member.menu"
                :key="index"
                @click="$router.push({ name: menu.routeName })"
              >
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex justify-center items-center relative cursor-pointer">
        <UserAvatarMenu />
      </div>
    </section>
  </main>
</template>
