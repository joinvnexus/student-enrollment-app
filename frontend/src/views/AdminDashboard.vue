<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Admin Dashboard</h2>

    <!-- Add Course Form -->
    <div class="border p-4 rounded mb-6 shadow">
      <h3 class="text-xl font-semibold mb-2">Add New Course</h3>
      <input v-model="title" placeholder="Course Title" class="border p-2 w-full mb-2" />
      <input v-model="duration" placeholder="Duration" class="border p-2 w-full mb-2" />
      <input v-model="fee" type="number" placeholder="Fee" class="border p-2 w-full mb-2" />
      <textarea v-model="description" placeholder="Description" class="border p-2 w-full mb-2"></textarea>
      <button @click="addCourse" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Course
      </button>
    </div>

    <!-- Course List -->
    <div>
      <h3 class="text-xl font-semibold mb-2">All Courses</h3>
      <div v-for="course in courses" :key="course._id" class="border p-3 rounded mb-2">
        <h4 class="font-bold">{{ course.title }}</h4>
        <p>{{ course.description }}</p>
        <p>Duration: {{ course.duration }}</p>
        <p>Fee: {{ course.fee }} ৳</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const title = ref("");
const description = ref("");
const fee = ref("");
const duration = ref("");
const courses = ref([]);

const fetchCourses = async () => {
  const res = await axios.get("http://localhost:5000/api/admin/all-courses");
  courses.value = res.data;
};

const addCourse = async () => {
  await axios.post("http://localhost:5000/api/admin/add-course", {
    title: title.value,
    description: description.value,
    fee: fee.value,
    duration: duration.value,
    
  });
  await fetchCourses();
  title.value = description.value = fee.value = duration.value = "";
};

onMounted(fetchCourses);
</script>
