import { Patch } from '@nestjs/common'
import { http } from '@/plugins/axios'
import router from '@/plugins/router'
import { ElMessageBox } from 'element-plus'

export default () => {
  const collections = ref<ApiPage<SoftModel>>()
  const model = ref<Partial<SoftModel>>({})
  const all = async (page = 1) => {
    collections.value = await http.request<ApiPage<SoftModel>>({
      url: `soft?page=${page}`,
    })
  }
  const find = async (id: number) => {
    return http.request<SoftModel>({
      url: `soft/${id}`,
    })
  }
  const update = async () => {
    await http.request({
      url: `soft/${model.value.id}`,
      method: 'Patch',
      data: model.value,
    })

    router.push({ name: 'admin.soft' })
  }

  const create = async () => {
    await http.request({
      method: 'POST',
      url: `soft`,
      data: model.value,
    })

    router.push({ name: 'admin.soft' })
  }
  const destroy = async (id: number) => {
    await ElMessageBox.confirm('确定删除吗')
    await http.request({
      method: 'Delete',
      url: `soft/${id}`,
    })
    location.reload()
  }

  return { all, find, update, create, destroy, collections, model }
}
