<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Student Dashboard</h2>

        <div v-if="courses.length === 0" class="text-gray-500">
            You have not enrolled in any course yet.
        </div>

        <div v-for="enroll in courses" :key="enroll._id" class="border p-4 rounded mb-3 shadow">
            <h3 class="text-xl font-semibold">{{ enroll.courseId.title }}</h3>
            <p>Duration: {{ enroll.courseId.duration }}</p>
            <p>Fee: {{ enroll.courseId.fee }} ৳</p>
            <p>Status:
                <span :class="enroll.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'">
                    {{ enroll.paymentStatus }}
                </span>
            </p>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";

    const courses = ref([]);

    onMounted(async () => {
        const user = JSON.parse(localStorage.getItem("user")); // we will save user info after login
        if (user) {
            const res = await axios.get(`http://localhost:5000/api/courses/my/${user.id}`);
            courses.value = res.data;
        }
    });
</script>
