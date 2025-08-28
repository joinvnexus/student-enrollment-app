import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/Courses.vue'),

    },
    {
      path: '/admin',
      name: 'course',
      component: () => import('../views/AdminDashboard.vue'),

    }
  ],

  // scroll to top on route change
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },

  // route guard
  beforeEnter(to, from, next) {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})

export default router
