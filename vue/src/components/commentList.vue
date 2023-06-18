<script setup lang="ts">
import CommentItem from './commentItem.vue'
const route = useRoute()
const { isLogin } = useAuth()
const { sid } = defineProps<{ sid: number }>()
//评论
const { key, getAll, collections, model, add, del } = useComment(sid)
await getAll()

onMounted(() => {
  const commentId = route.query.commentId
  document.querySelector(`#comment${commentId}`)?.scrollIntoView({ behavior: 'smooth' })
})

const { exec } = useIntervalRequest(20, async (...data: any[]) => {
  await add(data[0])
})
</script>

<template>
  <section :key="key">
    <div v-for="comment of collections" :key="comment.id">
      <CommentItem :comment="comment" type="comment" @add="exec($event)" @del="del(comment.id)" />
      <div class="ml-5 bg-gray-50" v-for="reply of comment.replys" :key="reply.id">
        <CommentItem :comment="reply" :replyComment="comment" @add="exec($event)" @del="del(reply.id)" />
      </div>
    </div>
  </section>
  <section id="commentMarkdown" v-if="isLogin()">
    <HdMarkdownEditor v-model="model.content" />
    <el-button type="primary" size="default" class="mt-3" @click="exec(model)"> 保存提交 </el-button>
  </section>
  <section class="flex justify-center">
    <el-button type="success" size="default" @click="$router.push({ name: RouteEnum.LOGIN })">登录后发表评论</el-button>
  </section>
</template>
