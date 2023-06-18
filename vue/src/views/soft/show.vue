<script setup lang="ts">
import dayjs from 'dayjs'
import CommentList from '@/components/commentList.vue'
const route = useRoute()
const { isSuperAdmin } = useAuth()
const { open } = useUtil()
const { find } = useSoft()
const model = await find(+route.params.id)
const tabName = ref(route.query.commentId ? 'comment' : 'content')
</script>

<template>
  <main class="">
    <section class="bg-white p-5 mb-5 rounded-lg">
      <h1 class="flex justify-between items-center text-lg font-bold">
        <div class="flex items-center gap-2">
          {{ model.title }}
          <el-tag type="success" size="small" effect="dark" v-if="model.version">版本号: V{{ model.version }}</el-tag>
          <div class="text-slate-600 flex items-center gap-1 text-sm">
            <icon-time theme="outline" size="18" fill="#333" :strokeWidth="3" /> {{ dayjs(model.updatedAt).fromNow() }}
          </div>
        </div>
        <div class="flex items-center">
          <el-button type="primary" size="default" @click="open(model.download, '_blank')" v-if="model.download">
            下载软件
          </el-button>
          <el-button type="warning" size="default" @click="open(model.github, '_blank')" v-if="model.github">
            Github
          </el-button>
          <el-button type="danger" size="default" @click="open(model.gitee, '_blank')" v-if="model.gitee">
            Gitee
          </el-button>
          <el-button
            type="success"
            size="default"
            v-if="isSuperAdmin()"
            @click="open({ name: 'soft.update', params: { id: model.id } }, '_blank')"
          >
            编辑
          </el-button>
        </div>
      </h1>
    </section>
    <section class="rounded-lg bg-white">
      <div class="sticky top-0 z-10 px-3 pt-3 border-b bg-white">
        <el-tabs v-model="tabName" type="card" tab-position="top">
          <el-tab-pane label="软件介绍" name="content"></el-tab-pane>
          <el-tab-pane label="问题讨论" name="comment"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="p-3 py-5">
        <v-md-preview :text="model.content" class="px-3" v-show="tabName == 'content'"></v-md-preview>
        <div class="" v-show="tabName == 'comment'">
          <comment-list :sid="model.id" />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
:deep(.github-markdown-body) {
  @apply p-3;
}
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs--card > .el-tabs__header) {
  border-bottom: none;
}
</style>
