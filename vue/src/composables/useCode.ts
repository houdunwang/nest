import { http } from '@/plugins/axios'

export default () => {
  const form = ref<{ code: string }>({ code: '' })
  const collections = ref<any[]>([])
  const code = ref<any>()

  //所有口令
  const findAll = async () => {
    collections.value = await http.request({
      url: 'code',
    })
  }

  //使用口令生成软件密钥
  const useCodeCreateSecret = async () => {
    collections.value = await http.request({
      url: 'code/useCodeCreateSecret',
      method: 'POST',
      data: form.value,
    })
  }

  //创建新的口令
  const createCode = async () => {
    code.value = await http.request({
      url: 'code/create',
      method: 'POST',
    })
  }
  return { collections, findAll, form, useCodeCreateSecret, createCode, code }
}
