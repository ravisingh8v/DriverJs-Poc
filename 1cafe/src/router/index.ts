import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import Components
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  { path: '/contact', component: () => import('../views/contact/ContactView.vue') },
  { path: '/about', component: () => import('../views/AboutView.vue') },
  { path: '/order', component: () => import('../views/product/OrderView.vue'), meta: { requireAuth: true } },
  { path: '/login', component: () => import('../views/auth/BaseAuthView.vue'), meta: { requireAuth: false } },
  { path: '/registration', component: () => import('../views/auth/BaseAuthView.vue'), meta: { requireAuth: false } },
  { path: '/manage-profile', component: () => import('../views/auth/BaseAuthView.vue'), meta: { requireAuth: true } },
  { path: '/:notFound(.*)*', component: () => import('../views/PageNotFound.vue') }

]

const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  return { left: 0, top: 0 }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  scrollBehavior
})

// guard 
router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters['auth/isAuthenticated']) {
    store.commit('auth/showGuardAlert', true)
    next('/login')
  } else if (to.meta.requireAuth == false && store.getters['auth/isAuthenticated']) {
    next('/order')
  } else {
    next()
  }
  // console.log(to);

})


export default router
