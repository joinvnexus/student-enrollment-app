<template>
  <nav class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <!-- Logo -->
    <router-link to="/" class="text-2xl font-bold hover:text-blue-400">
      MyCourses
    </router-link>

    <!-- Menu Items -->
    <div class="flex space-x-6">
      <router-link to="/" class="hover:text-blue-400">Home</router-link>
      <router-link to="/courses" class="hover:text-blue-400">Courses</router-link>
      <router-link to="/about" class="hover:text-blue-400">About</router-link>
    </div>

    <!-- Right Side (Login / User) -->
    <div>
      <!-- যদি লগইন না থাকে -->
      <div v-if="!isLoggedIn" class="space-x-4">
        <router-link to="/login" class="hover:text-blue-400">Login</router-link>
        <router-link to="/signup" class="hover:text-blue-400">Signup</router-link>
      </div>

      <!-- যদি লগইন থাকে -->
      <div v-else class="flex items-center space-x-4">
        <router-link to="/dashboard" class="hover:text-blue-400">Dashboard</router-link>
        <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const isLoggedIn = ref(false)
const router = useRouter()

// check login status
onMounted(() => {
  const token = localStorage.getItem("token")
  if (token) {
    isLoggedIn.value = true
  }
})

// logout
const logout = () => {
  localStorage.removeItem("token")
  isLoggedIn.value = false
  router.push("/login")
}
</script>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>
