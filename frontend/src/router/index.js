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
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue'),
      // meta: {
      //   requiresAuth: true,
      //   isAdmin: true
      // }
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// ✅ Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role') // ধরো role: 'admin' বা 'student'

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } 
  else if (to.meta.isAdmin && userRole !== 'admin') {
    next({ name: 'home' }) // non-admin কে home পাঠানো হবে
  } 
  else {
    next()
  }
})

export default router
