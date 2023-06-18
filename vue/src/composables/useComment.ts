import { http } from '@/plugins/axios'
import { ElMessage, ElMessageBox } from 'element-plus'

export default (sid: number) => {
  const collections = ref<CommentModel[]>([])
  const model = ref<Partial<CommentModel>>({})
  const key = ref(1)

  const getAll = async () => {
    collections.value = await http.request({
      url: `/comment/${sid}`,
    })
    key.value++
  }

  const add = async (data: any) => {
    if (!data.content) return ElMessage.error('评论内容不能为空')
    try {
      await http.request<CommentModel>({
        method: 'POST',
        data,
        url: `/comment/${sid}`,
      })
      model.value.content = ''
      await getAll()
    } catch (error) {}

    // const comment = await http.request<CommentModel>({
    //   method: 'POST',
    //   data,
    //   url: `/comment/${sid}`,
    // })
    // await getAll()
    // model.value.content = ''
    // if (comment.commentId) {
    //   collections.value.find((item) => item.id == comment.commentId)?.replys.push(comment)
    // } else {
    //   collections.value.push(comment)
    // }
  }

  const del = async (id: number) => {
    await ElMessageBox.confirm('确定删除吗?')
    await http.request({
      method: 'DELETE',
      url: `/comment/${sid}/${id}`,
    })
    await getAll()
  }

  return { getAll, add, del, collections, model, key }
}
