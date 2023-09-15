import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('./../App.vue')
  },
  {
    path: '/hero',
    component: () => import('./../App.vue')
  },
  {
    path: '/tours',
    component: () => import('./../App.vue')
  },
  {
    path: '/contact',
    component: () => import('./../App.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
