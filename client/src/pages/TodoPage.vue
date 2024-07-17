<script setup>
  import SearchBar from '@components/SearchBar.vue';
  import TaskList from '@components/tasklist/TaskList.vue';

  import { ref } from 'vue';

  const tasks = ref([
    { category: 'daily habits', title: 'Categories', checked: false },
    { category: 'personal projects', title: 'Write for at least 30 minutes', checked: false },
    { category: 'work', title: 'Exercise for 20 minutes', checked: false },
    { category: 'daily habits', title: 'Read a book for 1 hour', checked: false },
  ]);
  const categories = ref(['All categories', 'daily habits', 'personal projects', 'work']);
</script>

<template>
  <SearchBar :tasks="tasks" :categories="categories" />
  <TaskList :tasks="tasks" />
</template>
