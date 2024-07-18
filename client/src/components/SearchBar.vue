<script setup>
  import { ref, computed, onMounted } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { defineProps, defineEmits } from 'vue';
  import { getCategories } from '../services/categories';
  import { createTask } from '@/services/todo';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(['add-task']);

  // const emit = defineEmits(['addTask']);

  const date = ref(new Date());
  const taskTitle = ref('');
  const currentCategory = ref('');
  const cateId = ref('');

  const categories = ref([]);
  const opened = ref(false);

  const dayOfMonthWithSuffix = computed(() => {
    const dayOfMonth = date.value.getDate();
    const weekday = date.value.toLocaleDateString('en-US', { weekday: 'long' });
    return `${weekday} ${dayOfMonth}${getDaySuffix(dayOfMonth)}`;
  });

  const month = computed(() => {
    return date.value.toLocaleDateString('en-US', { month: 'long' });
  });

  const taskDataInput = computed(() => ({
    dueDate: date.value.toISOString().split('T')[0],
    content: taskTitle.value,
    categoryId: cateId.value || null,
  }));

  const taskDataInputUpdate = computed(() => ({
    dueDate: date.value.toISOString().split('T')[0],
    content: taskTitle.value,
    Category: { name: currentCategory.value } || null,
  }));

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  const toggleDropdown = () => {
    opened.value = !opened.value;
  };

  const closeDropdown = () => {
    opened.value = false;
  };

  const selectCategory = (category) => {
    currentCategory.value = category.name;
    cateId.value = category.id;
    opened.value = false;
  };

  const outsideClickHandler = (event) => {
    if (!opened.value) return;
    const dropdownMenu = event.target.closest('.relative.text-nowrap');
    if (!dropdownMenu) {
      opened.value = false;
    }
  };

  const addNewTask = () => {
    if (!cateId.value) {
      toast.error(`Please choose a category`);
      return
    }
    createTask(taskDataInput.value)
      .then((data) => {
        console.log(data);
        emit('add-task', taskDataInputUpdate.value);
        taskTitle.value = '';
        toast.success(`Add new task successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onMounted(async () => {
    try {
      const res = await getCategories();
      categories.value = res.data.body;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    document.addEventListener('click', outsideClickHandler);
  });
</script>

<template>
  <section>
    <div class="container text-center">
      <div class="inline-block cursor-pointer">
        <VueDatePicker
          v-model="date"
          :enable-time-picker="false"
          :auto-apply="true"
          :min-date="new Date()"
        >
          <template #trigger>
            <div class="flex gap-x-2">
              <p class="text-[36px] font-bold">{{ dayOfMonthWithSuffix }},</p>
              <p class="text-[36px] font-bold text-gray-400">
                {{ month }}
              </p>
            </div>
          </template>
        </VueDatePicker>
      </div>
      <div>
        <form @submit.prevent="addNewTask" class="max-w-xl mx-auto p-5">
          <div class="flex justify-center custom-shadow rounded-2xl">
            <div class="relative text-nowrap">
              <button
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                class="flex-shrink-0 bg-white z-10 inline-flex items-center justify-center py-2.5 px-4 text-sm font-medium text-center border border-e-0 rounded-s-2xl focus:outline-none capitalize w-40"
                type="button"
                @click="toggleDropdown"
                :aria-expanded="opened.toString()"
              >
                {{ currentCategory || 'All categories' }}
                <svg
                  class="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
                class="z-10 bg-white divide-y-2 divide-gray-100 rounded-2xl shadow w-40 absolute top-12"
                :class="{ hidden: !opened, block: opened }"
                ref="dropdownMenu"
                @keydown.escape="closeDropdown"
              >
                <ul class="text-sm" role="none">
                  <li
                    class="hover:font-semibold"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-50 capitalize"
                      :class="{
                        'rounded-t-2xl': index === 0,
                        'rounded-b-2xl': index === categories.length - 1,
                      }"
                      @click="selectCategory(category)"
                    >
                      {{ category.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="relative w-full">
              <input
                type="text"
                id="search-dropdown"
                v-model="taskTitle"
                class="block p-2.5 w-full z-20 text-sm rounded-e-2xl rounded-s-gray-100 rounded-s-2 border focus:outline-none pr-11"
                placeholder="Add new task"
                required
              />
              <button
                type="submit"
                class="absolute top-0 h-full end-0 p-2.5 text-sm font-medium bg-gray-300 border border-e-0 rounded-e-2xl rounded-s-gray-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4 12H20M12 4V20"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
