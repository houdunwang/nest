<script setup lang="ts">
import dayjs from 'dayjs'
const { collections, findAll, del } = useNotification()
const { open } = useUtil()
await findAll()
const redirect = async (notification: NotificationModel) => {
  await del(+notification.id)
  open({
    name: 'soft.show',
    params: { id: notification.comment.softId },
    query: { type: 'comment', commentId: notification.comment.id },
  })
}
</script>

<template>
  <main class="flex items-center" v-if="collections.length">
    <el-dropdown trigger="click" size="default">
      <icon-remind theme="outline" size="18" fill="#333" class="opacity-80" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="notification in collections" :key="notification.id" @click="redirect(notification)">
            <div class="text-xs flex gap-2">
              <span class="">{{ notification.comment.user.nickname }} 发来了消息</span>
              <span class="opacity-80">{{ dayjs(notification.createdAt).fromNow() }}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </main>
</template>

<style lang="scss"></style>
