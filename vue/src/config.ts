import appMiddleware from '@/middleware/appMiddleware'
const { isSuperAdmin } = useAuth()
export default {
  middleware: [appMiddleware],
  router: {
    prefix: '',
  },
  member: {
    //修改资料菜单
    menu: [
      {
        routeName: 'member',
        title: '资料修改',
      },
      {
        routeName: 'member.password',
        title: '修改密码',
      },
    ],
  },
  user: {
    //顶部头像下拉菜单项
    avatarMenu: [
      {
        routeName: RouteEnum.MEMBER,
        title: '会员中心',
        condition: () => true,
      },
      {
        routeName: RouteEnum.ADMIN,
        title: '后台管理',
        condition: () => {
          return isSuperAdmin()
        },
      },
    ],
  },
}
