<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Available Courses</h2>

        <div v-if="courses.length === 0" class="text-gray-500">
            No courses available yet.
        </div>

        <div v-for="course in courses" :key="course._id" class="border p-4 rounded mb-3 shadow">
            <h3 class="text-xl font-semibold">{{ course.title }}</h3>
            <p>{{ course.description }}</p>
            <p>Duration: {{ course.duration }}</p>
            <p>Fee: {{ course.fee }} ৳</p>
            <button class="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700" @click="enroll(course._id)">
                Apply Now
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";

    const courses = ref([]);

    onMounted(async () => {
        const res = await axios.get("http://localhost:5000/api/courses");
        courses.value = res.data;
        // console.log(courses.value)
    });

    const enroll = async (courseId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                alert("Please login first");
                return;
            }

            const res = await axios.post("http://localhost:5000/api/courses/enroll", {
                userId: user.id,
                courseId
            });

            alert(res.data.msg);
        } catch (err) {
            alert(err.response?.data?.msg || "Error");
        }
    };
</script>
