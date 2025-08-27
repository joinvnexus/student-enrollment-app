<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="signup" class="bg-white p-6 rounded shadow w-96">
      <h2 class="text-xl font-bold mb-4">Signup</h2>

      <input v-model="form.name" type="text" placeholder="Name"
        class="w-full mb-3 p-2 border rounded" required />

      <input v-model="form.email" type="email" placeholder="Email"
        class="w-full mb-3 p-2 border rounded" required />

      <input v-model="form.phone" type="text" placeholder="Phone"
        class="w-full mb-3 p-2 border rounded" required />

      <input v-model="form.password" type="password" placeholder="Password"
        class="w-full mb-3 p-2 border rounded" required />

      <button class="w-full bg-blue-600 text-white py-2 rounded">Signup</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({ name: "", email: "", phone: "", password: "" });

const signup = async () => {
  try {
    const res = await axios.post("/api/auth/signup", form.value);
    alert(res.data.msg);
  } catch (err) {
    alert(err.response.data.msg || "Error signing up");
    console.log(err);
  }
};
</script>
