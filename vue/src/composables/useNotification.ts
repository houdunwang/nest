import { http } from '@/plugins/axios'

export default () => {
  const collections = ref<NotificationModel[]>([])

  const findAll = async () => {
    collections.value = await http.request<NotificationModel[]>({
      url: `notification`,
    })
  }

  const del = async (id: number) => {
    await http.request({
      url: `notification/${id}`,
      method: 'DELETE',
    })
    const index = collections.value.findIndex((item) => item.id == id)
    collections.value.splice(index, 1)
  }

  return { findAll, collections, del }
}
