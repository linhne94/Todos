<script setup>
  import SearchBar from '@components/SearchBar.vue';
  import TaskList from '@components/tasklist/TaskList.vue';
  import { ref } from 'vue';

  const tasks = ref([]);

  const setTasks = (newTasks) => {
    tasks.value = newTasks;
  };

  const addTask = (newTask) => {
    tasks.value.push(newTask);
  };
</script>

<template>
  <SearchBar @add-task="addTask" />
  <TaskList :tasks="tasks" @set-tasks="setTasks" />
</template>
