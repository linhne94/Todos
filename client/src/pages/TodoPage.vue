<script setup>
  import TodoInputBar from '@components/TodoInputBar.vue';
  import TaskList from '@components/tasklist/TaskList.vue';
  import axios from '../services/axios';
  import { ref } from 'vue';

  // const tasks = ref([]);

  // const setTasks = (newTasks) => {
  //   tasks.value = newTasks;
  // };

  // const addTask = (newTask) => {
  //   tasks.value.push(newTask);
  // };

  const status = ref(true);

  console.log('cc' + status.value);
  const updateStatus = (newStatus) => {
    status.value = newStatus;
    console.log(status.value);
  };

  const fileInput = ref(null);

  const uploadImage = async () => {
    const file = fileInput.value.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('myImage', file);

    try {
      const response = await axios.post('http://localhost:8000/api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });   

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const uploadImageBasicBlob = async () => {
    const file = fileInput.value.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('myImage', file);

    try {
      const response = await axios.post('http://localhost:8000/api/image/uploadBasicBlob', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });   

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

</script>

<template>
  <!-- <TodoInputBar @add-task="addTask" />
  <TaskList :tasks="tasks" @set-tasks="setTasks" /> -->
  <label>
    Your Image File
    <input ref="fileInput" type="file" name="myImage" accept="image/*" />
  </label> <br>

  <button @click="uploadImage">Upload</button> <br>
  <button @click="uploadImageBasicBlob">Upload Basic Blob</button>  <br>
  <TodoInputBar :status="status" @update-status="updateStatus" />
  <TaskList :status="status" @update-status="updateStatus" />
</template>
