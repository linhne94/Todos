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
  const handleSelectedDayUpdate = (day) => {
    console.log('Selected day updated:', day);
    // Perform any logic here based on the selected day if needed
  };
</script>

<template>
  <section class="pt-0">
    <div class="container">
      <div class="bg-white rounded-2xl p-10 grid grid-cols-10 gap-10 custom-shadow">
        <DaySection @update:selectedDay="handleSelectedDayUpdate" class="col-span-3" />
        <TaskItem :tasks="tasks" class="col-span-7" />
      </div>
    </div>
  </section>
</template>
