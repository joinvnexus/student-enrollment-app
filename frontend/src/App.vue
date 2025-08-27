<template>
  <div class="navbar p-4 bg-skylight ">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/signup">Signup</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/courses">Courses</router-link>
  </div>

  <div>
    <router-view></router-view>
  </div>
</template>
