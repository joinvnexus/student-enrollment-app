<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Admin Dashboard</h2>

    <!-- Add/Edit Course Form -->
    <div class="border p-4 rounded mb-6 shadow">
      <h3 class="text-xl font-semibold mb-2">{{ editCourseId ? "Edit Course" : "Add New Course" }}</h3>
      <input v-model="title" placeholder="Course Title" class="border p-2 w-full mb-2" />
      <input v-model="duration" placeholder="Duration" class="border p-2 w-full mb-2" />
      <input v-model="fee" type="number" placeholder="Fee" class="border p-2 w-full mb-2" />
      <textarea v-model="description" placeholder="Description" class="border p-2 w-full mb-2"></textarea>
      <div class="flex gap-2">
        <button @click="saveCourse" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {{ editCourseId ? "Update Course" : "Add Course" }}
        </button>
        <button v-if="editCourseId" @click="cancelEdit" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>

    <!-- Course List -->
    <div>
      <h3 class="text-xl font-semibold mb-2">All Courses</h3>
      <div v-for="course in courses" :key="course._id" class="border p-3 rounded mb-2 flex justify-between items-center">
        <div>
          <h4 class="font-bold">{{ course.title }}</h4>
          <p>{{ course.description }}</p>
          <p>Duration: {{ course.duration }}</p>
          <p>Fee: {{ course.fee }} ৳</p>
        </div>
        <div class="flex gap-2">
          <button @click="editCourse(course)" class="bg-blue-600 text-white px-2 py-1 rounded">Edit</button>
          <button @click="deleteCourse(course._id)" class="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
        </div>
      </div>
    </div>

    <!-- Registered Students -->
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-2">Registered Students</h3>
      <button @click="exportExcel" class="bg-green-600 text-white px-4 py-2 rounded mb-2">Export Excel</button>
      <table class="w-full border-collapse border">
        <thead>
          <tr class="bg-gray-200">
            <th class="border px-2 py-1">Name</th>
            <th class="border px-2 py-1">Email</th>
            <th class="border px-2 py-1">Course</th>
            <th class="border px-2 py-1">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student._id">
            <td class="border px-2 py-1">{{ student.name }}</td>
            <td class="border px-2 py-1">{{ student.email }}</td>
            <td class="border px-2 py-1">{{ student.courseTitle }}</td>
            <td class="border px-2 py-1">{{ student.paymentStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import * as XLSX from "xlsx";

const title = ref("");
const description = ref("");
const fee = ref("");
const duration = ref("");
const editCourseId = ref(null);

const courses = ref([]);
const students = ref([]);

// Fetch courses
const fetchCourses = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/admin/all-courses");
    courses.value = res.data;
  } catch (err) {
    console.error("❌ Fetch Courses Error:", err);
  }
};

// Fetch students
const fetchStudents = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/admin/students");
    students.value = res.data;
  } catch (err) {
    console.error("❌ Fetch Students Error:", err);
  }
};

// Add or Update course
const saveCourse = async () => {
  try {
    if(editCourseId.value){
      // Update course
      await axios.put(`http://localhost:5000/api/admin/update-course/${editCourseId.value}`, {
        title: title.value,
        description: description.value,
        fee: fee.value,
        duration: duration.value
      });
      editCourseId.value = null;
    } else {
      await axios.post("http://localhost:5000/api/admin/add-course", {
        title: title.value,
        description: description.value,
        fee: fee.value,
        duration: duration.value
      });
    }
    title.value = description.value = fee.value = duration.value = "";
    await fetchCourses();
  } catch(err){
    console.error("❌ Save Course Error:", err);
  }
};

// Edit course
const editCourse = (course) => {
  editCourseId.value = course._id;
  title.value = course.title;
  description.value = course.description;
  fee.value = course.fee;
  duration.value = course.duration;
};

// Cancel edit
const cancelEdit = () => {
  editCourseId.value = null;
  title.value = description.value = fee.value = duration.value = "";
};

// Delete course
const deleteCourse = async (id) => {
  if(confirm("Are you sure to delete this course?")){
    try{
      await axios.delete(`http://localhost:5000/api/admin/delete-course/${id}`);
      await fetchCourses();
    }catch(err){
      console.error("❌ Delete Course Error:", err);
    }
  }
};

// Export students to Excel
const exportExcel = () => {
  const ws = XLSX.utils.json_to_sheet(students.value);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "students.xlsx");
};

onMounted(() => {
  fetchCourses();
  fetchStudents();
});
</script>
