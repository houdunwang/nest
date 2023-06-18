<script setup lang="ts">
import dayjs from 'dayjs'
const { authorize } = useAuth()
const { comment, replyComment } = defineProps<{
  comment: CommentModel
  //回复的评论
  replyComment?: CommentModel
}>()
const { model } = useComment(comment.softId)
const showReplyBox = ref(false)
model.value.commentId = comment.commentId || comment.id

const emit = defineEmits<{
  add: [comment: CommentModel]
  del: [id: number]
}>()

const submit = async () => {
  // showReplyBox.value = false
  emit('add', model.value as CommentModel)
  // model.value.content = ''
}
</script>

<template>
  <main class="border mb-2 bg-white rounded-md">
    <div class="flex justify-between border-b p-3 items-baseline" :id="`comment${comment.id}`">
      <div class="flex items-center gap-2">
        <img :src="comment.user.avatar" class="w-8 h-8 object-cover rounded-full" />
        <div class="flex flex-col text-xs">
          <div class="flex items-center">
            {{ comment.user.nickname }}
            <div v-if="replyComment" class="flex items-center">
              <icon-right theme="outline" size="12" fill="#333" />
              <span>{{ replyComment.user.nickname }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            {{ dayjs(comment.createdAt).fromNow() }}
            <div class="flex items-center cursor-pointer hover:text-indigo-600" @click="showReplyBox = !showReplyBox">
              <icon-next theme="outline" size="12" fill="#333" /> 回复
              <!-- #{{ comment.id }} -->
            </div>
          </div>
        </div>
      </div>
      <icon-delete
        theme="outline"
        size="12"
        fill="#333"
        class="cursor-pointer"
        @click="$emit('del', comment.id)"
        v-if="authorize(comment.userId)"
      />
    </div>
    <div class="bg-gray-50 p-3">
      <v-md-preview :text="comment.content"></v-md-preview>
    </div>
    <div class="p-3" v-if="showReplyBox">
      <ElInput type="textarea" v-model="model.content"></ElInput>
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </div>
  </main>
</template>

<style lang="scss">
.github-markdown-body {
  padding: 0 !important;
  @apply text-sm opacity-95;
  p {
    margin-bottom: 0;
  }
}
</style>
