<script setup>
  import DaySection from './components/DaySection.vue';
  import TaskItem from './components/TaskItem.vue';

  import { defineProps } from 'vue';

  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <section class="pt-0">
    <div class="container">
      <div class="bg-white rounded-2xl p-10 grid grid-cols-10 gap-10 custom-shadow">
        <DaySection class="col-span-3" />
        <TaskItem :tasks="tasks" class="col-span-7" />
      </div>
    </div>
  </section>
</template>
