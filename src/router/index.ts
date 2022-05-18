import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    component:() => import('../pages/Login.vue')
  },
  {
    path:'/home',
    name:'Home',
    redirect:'/panel',
    component: () => import('../pages/Home.vue'),
    children:[
      {
        path:'/panel',
        component:() => import('../pages/panel/Panel.vue'),
        meta:{title:'作品列表'}
      },
      {
        path:"/password",
        component:() => import('../pages/password/Password.vue'),
        meta:{title:"账号管理"}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
