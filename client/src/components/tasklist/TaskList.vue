<script setup>
  import axios from 'axios';
  import DaySection from './components/DaySection.vue';
  import TaskItem from './components/TaskItem.vue';
  import { watch, ref } from 'vue';

  const dataOfDate = ref('');
  const tasks = ref([]);
  const emit = defineEmits(['set-tasks']);
  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  const fetchTasks = async (date) => {
    if (!date) return;

    try {
      const res = await axios.get(`http://localhost:8000/api/tasks`, {
        params: { timeRange: date },
      });
      tasks.value = res.data.body;
      emit('set-tasks', tasks.value);
      // console.log(tasks.value);
    } catch (error) {
      console.error('Lỗi khi fetch tasks:', error);
    }
  };

  watch(dataOfDate, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      fetchTasks(newValue);
    }
  });

  const handleSelectedDayUpdate = (day) => {
    console.log('Selected day updated:', day);
    dataOfDate.value = day;
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
