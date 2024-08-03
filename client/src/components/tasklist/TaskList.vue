<script setup>
  import axios from 'axios';
  import DaySection from './components/DaySection.vue';
  import TaskItem from './components/TaskItem.vue';
  import { watch, ref, defineEmits, defineProps } from 'vue';

  const dataOfDate = ref('');
  const tasks = ref([]);
  // const emit = defineEmits(['set-tasks']);
  const props = defineProps({
    // tasks: {
    //   type: Array,
    //   required: true,
    // },
    status: {
      type: Boolean,
    },
  });

  const emit = defineEmits(['update-status']);

  const fetchTasks = async (date) => {
    if (!date) return;

    try {
      const res = await axios.get(`http://localhost:8000/api/tasks`, {
        params: { timeRange: date },
      });
      tasks.value = res.data.body;
      // console.log(tasks.value);
      emit('update-status', false);
      // emit('set-tasks', tasks.value);
    } catch (error) {
      console.error('Lỗi khi fetch tasks:', error);
    }
  };

  watch(
    () => [dataOfDate.value, props.status],
    ([newDate, newStatus], [oldDate, oldStatus]) => {
      if (newStatus && (newDate !== oldDate || newStatus !== oldStatus)) {
        fetchTasks(newDate);
      }
    },
  );

  const handleSelectedDayUpdate = (day) => {
    console.log('Selected day updated:', day);
    dataOfDate.value = day;
    emit('update-status', true);
  };

  const updateStatus = (newstatus) => {
    emit('update-status', true);
  };
</script>

<template>
  <section class="pt-0">
    <div class="container">
      <div class="bg-white rounded-2xl p-10 grid grid-cols-10 gap-10 custom-shadow">
        <DaySection @update:selectedDay="handleSelectedDayUpdate" class="col-span-3" />
        <TaskItem  :tasks="tasks" @update-status="updateStatus" class="col-span-7 h-[40vh] overflow-y-auto" />
      </div>
    </div>
  </section>
</template>
