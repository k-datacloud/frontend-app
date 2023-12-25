import { createRouter, createWebHashHistory } from 'vue-router'
// import SignupView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import('../views/StartView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/mypage/:id',
    name: 'mypage',
    component: () => import('../views/MypageView.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/PostView.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/UserView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes
})

export default router
