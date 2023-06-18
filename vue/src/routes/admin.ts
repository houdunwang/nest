import { DashboardOne } from '@icon-park/vue-next'
import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/admin',
    component: () => import('@/layouts/admin/index.vue'),
    meta: { auth: true, admin: true, menu: { title: 'Dashboard', icon: DashboardOne, order: 100 } },
    children: [
      {
        name: 'admin',
        path: '',
        component: () => import('@/views/admin/index.vue'),
        meta: { title: '工作台', menu: { title: '工作台' } },
      },
      {
        name: 'admin.soft',
        path: 'soft',
        component: () => import('@/views/soft/admin.vue'),
        meta: { title: '软件列表', menu: { title: '软件管理' } },
      },
      {
        name: 'soft.create',
        path: 'soft/create',
        component: () => import('@/views/soft/form.vue'),
        meta: { title: '发表软件' },
      },
      {
        name: 'soft.update',
        path: 'soft/edit/:id',
        component: () => import('@/views/soft/form.vue'),
        meta: { title: '更新软件' },
      },
    ],
  },
] as RouteRecordRaw[]
