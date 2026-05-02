import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')    // lazy loading ✅
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: () => import('@/views/PostView.vue')
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('@/views/CategoryView.vue')
    }
  ]
})

export default router
