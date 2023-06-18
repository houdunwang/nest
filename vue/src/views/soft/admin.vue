<script setup lang="ts">
import SoftItem from '@/components/softItem.vue'
const route = useRoute()
const { all, collections } = useSoft()
await all(+(route.query.page || 1))
</script>

<template>
  <main v-if="collections">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">
          软件管理
          <el-button type="primary" size="default" @click="$router.push({ name: 'soft.create' })">上架软件</el-button>
        </div>
      </template>
      <section class="grid grid-cols-5 gap-3">
        <SoftItem v-for="soft of collections.data" :key="soft.id" :soft="soft" :show-button="true" />
      </section>
    </el-card>
    <el-pagination
      class="bg-white p-2 rounded-md mt-3 border"
      @current-change="$router.push({ name: 'admin.soft', query: { page: $event } })"
      :currentPage="+($route.query.page || 1)"
      :page-sizes="[20, 40, 80, 100]"
      :total="collections.meta.total"
      background
    >
    </el-pagination>
  </main>
</template>

<style lang="scss"></style>
