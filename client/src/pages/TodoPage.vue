<script setup>
  import SearchBar from '@components/SearchBar.vue';
  import TaskList from '@components/tasklist/TaskList.vue';
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
</script>

<template>
  <!-- <SearchBar @add-task="addTask" />
  <TaskList :tasks="tasks" @set-tasks="setTasks" /> -->
  <SearchBar :status="status" @update-status="updateStatus" />
  <TaskList :status="status" @update-status="updateStatus" />
</template>
