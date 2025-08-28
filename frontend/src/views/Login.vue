<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow w-96">
      <h2 class="text-xl font-bold mb-4">Login</h2>

      <input v-model="form.email" type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" required />
      <input v-model="form.password" type="password" placeholder="Password" class="w-full mb-3 p-2 border rounded" required />

      <button class="w-full bg-green-600 text-white py-2 rounded">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({ email: "", password: "" });

const login = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", form.value);

    // Save token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Check role and redirect
    if (res.data.user.role === "admin") {
      router.push("/admin"); // admin dashboard
    } else {
      router.push("/dashboard"); // normal user dashboard
    }

    alert("Login successful 🚀");
  } catch (err) {
    alert(err.response?.data?.msg || "Error logging in");
  }
};
</script>
