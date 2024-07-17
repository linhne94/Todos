<script setup>
  import avatar from '@/assets/defaultAvatar.jpg';
  import { ref, defineEmits } from 'vue';
  const emits = defineEmits(['update:selectedDay']);
  const days = ref([
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This Week', value: 'this-week' },
    { label: 'Next Weeks', value: 'next-weeks' },
  ]);
  const selectedDay = ref(days.value[0].value);
  emits('update:selectedDay', selectedDay.value);

  const handleDayClick = (day) => {
    selectedDay.value = day.value;
    emits('update:selectedDay', selectedDay.value);
  };

  const isActive = (day) => {
    return day.value === selectedDay.value ? 'font-semibold' : 'text-gray-400';
  };
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-full">
      <img :src="avatar" alt="" class="rounded-full" />
    </div>
    <div class="mt-6">
      <ul class="flex flex-col gap-2">
        <li v-for="day in days" :key="day.value">
          <a href="#" @click="handleDayClick(day)" :class="isActive(day)">
            {{ day.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
