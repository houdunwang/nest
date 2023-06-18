<script setup lang="ts">
import dayjs from 'dayjs'
const { user } = defineProps<{
  user: UserModel
}>()
</script>

<template>
  <main class="bg-white overflow-hidden rounded-md">
    <!-- {{ user }} -->
    <el-image :src="user.avatar" fit="cover" :lazy="true" class="w-full hidden lg:block" />
    <div class="flex flex-col items-center justify-center py-3 text-slate-700">
      <h2 class="font-bold">{{ user.nickname ?? '盾友' }}</h2>
      <small class="text-xs opacity-80 mt-1">注册于{{ dayjs(user.createdAt).fromNow() }}</small>
      <div class="text-xs mt-1 text-gray-600">UID:{{ user.id }}</div>
    </div>
  </main>
</template>
