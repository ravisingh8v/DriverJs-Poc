import mainContainerVue from '@/components/main-page/main-container.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('./../components/master/master-component.vue'),
    children: [
      {
        path: '/',
        component: () => import('./../components/main-page/main-container.vue')
      },
      {
        path: '/hero',
        component: () => import('./../components/main-page/main-container.vue')
      },
      {
        path: '/tours',
        component: () => import('./../components/main-page/main-container.vue')
      },
      {
        path: '/contact',
        component: () => import('./../components/main-page/main-container.vue')
      },
    ]
  },
  {
    path: '/todo',
    component: () => import('./../components/todo/todo-component.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
