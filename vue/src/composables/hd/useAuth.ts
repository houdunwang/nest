import { http } from '@/plugins/axios'
import router from '@/plugins/router'
const storage = useStorage()

export default () => {
  const form = reactive({
    name: '',
    password: '',
    password_confirmation: '',
    captcha: {
      key: '',
      value: '',
    },
  })

  //超级管理员
  const isSuperAdmin = () => {
    return useUserStore().user?.id == 1
  }

  //模型权限验证
  const authorize = (userId: undefined | number) => {
    return userId == useUserStore().user?.id || isSuperAdmin()
  }

  //登录检测
  const isLogin = () => {
    return !!useStorage().get(CacheEnum.TOKEN_NAME)
  }

  //退出登录
  const logout = async () => {
    storage.remove(CacheEnum.TOKEN_NAME)
    location.href = '/'
  }

  //找回密码
  const findPassword = async () => {
    try {
      const { token } = await http.request<{ token: string; user: UserModel }>({
        url: ApiEnum.FORGOT_PASSWORD,
        method: 'post',
        data: form,
      })
      storage.set(CacheEnum.TOKEN_NAME, token)
      const route = router.resolve({ name: RouteEnum.ADMIN })
      location.href = route.fullPath
    } catch (error) {
      // useCaptcha().getCaptcha()
    }
  }

  //登录
  const login = useUtil().request(async () => {
    try {
      const { token } = await http.request<{ token: string; user: UserModel }>({
        url: ApiEnum.LOGIN,
        method: 'POST',
        data: form,
      })
      storage.set(CacheEnum.TOKEN_NAME, token)
      await useUserStore().getCurrentUser()
      router.push({ name: RouteEnum.HOME })
    } catch (error) {}
  })

  //注册
  const register = useUtil().request(async () => {
    try {
      const { token } = await http.request<{ token: string; user: UserModel }>({
        url: ApiEnum.REGISTER,
        method: 'POST',
        data: form,
      })
      storage.set(CacheEnum.TOKEN_NAME, token)
      await useUserStore().getCurrentUser()
      router.push({ name: RouteEnum.HOME })
    } catch (error) {
      // useCaptcha().getCaptcha()
    }
  })

  return { authorize, isLogin, logout, login, register, form, findPassword, isSuperAdmin }
}
