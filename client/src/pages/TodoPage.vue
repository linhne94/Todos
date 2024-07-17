<script setup>
  import { getTask } from '@/services/todo';
  import SearchBar from '@components/SearchBar.vue';
  import TaskList from '@components/tasklist/TaskList.vue';

  import { onMounted, ref } from 'vue';

  const tasks = ref([]);

  const fetchTasks = async () => {
    try {
      const res = await getTask();
      console.log(res);
      tasks.value = res.data;
    } catch (error) {
      console.error('Lỗi khi fetch tasks:', error);
    }
  };

  onMounted(() => {
    fetchTasks();
  });
</script>

<template>
  <SearchBar :tasks="tasks" />
  <TaskList :tasks="tasks" />
</template>
