<script setup lang="ts">
const { destroy } = useSoft()
const { open } = useUtil()
const { soft, showButton } = withDefaults(
  defineProps<{
    soft: SoftModel
    showButton: boolean
  }>(),
  { showButton: false },
)
</script>

<template>
  <main
    class="
      border
      cursor-pointer
      group
      hover:shadow-sm
      shadow-inner
      duration-300
      flex flex-col
      bg-white
      rounded-xl
      overflow-hidden
    "
  >
    <section @click="open({ name: 'soft.show', params: { id: soft.id } }, '_blank')">
      <div class="overflow-hidden relative border-b">
        <img
          :src="soft.preview"
          :alt="soft.title"
          class="hover:scale-110 duration-300 w-full aspect-video object-cover z-0"
        />
        <div class="absolute z-10 right-3 top-2">
          <el-tag type="success" size="small" effect="dark" v-if="!soft.pro">Free</el-tag>
          <!-- <el-tag type="warning" size="small" effect="dark" v-else>PRO</el-tag> -->
        </div>
      </div>
      <h2 class="px-4 mt-5 mb-3 truncate font-bold opacity-80 group-hover:text-indigo-600">{{ soft.title }}</h2>
      <div class="px-2 line-clamp-2 text-sm text-gray-700 opacity-80 flex-grow mx-2 mb-2">
        {{ soft.description }}
      </div>
    </section>
    <div class="flex gap-1 justify-center py-3 border-t mt-2 flex-grow-0" v-if="showButton">
      <el-button
        type="primary"
        size="small"
        plain
        @click="$router.push({ name: 'soft.update', params: { id: soft.id } })"
        >编辑</el-button
      >
      <el-button type="danger" size="small" plain @click="destroy(+soft.id)" class="!ml-0">删除</el-button>
    </div>
  </main>
</template>

<style lang="scss"></style>
