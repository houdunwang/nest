import { http } from '@/plugins/axios'

export default () => {
  const form = ref({
    account: '',
    password: '',
  })
  const secret = ref<SecretModel>()

  //当前用户密钥
  const getCurrentUserSecret = async () => {
    secret.value = await http.request({
      url: 'secret/getCurrentSecret',
    })
  }

  //刷新密钥
  const refreshSecret = async () => {
    await http.request({
      url: 'secret/refresh',
      method: 'POST',
    })
    getCurrentUserSecret()
  }

  //根据后盾人帐号创建secret
  const createSecretByHoudunren = async () => {
    await http.request({
      url: 'secret/houdunren',
      method: 'POST',
      data: form.value,
    })
    getCurrentUserSecret()
  }
  return { form, createSecretByHoudunren, refreshSecret, getCurrentUserSecret, secret }
}
