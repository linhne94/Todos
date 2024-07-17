<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  const toggleTaskStatus = (taskId) => {
    console.log('taskId nè update đi: ' + taskId);
  };

  const deleteTask = (taskId) => {
    console.log('taskId nè xóa đi: ' + taskId);
  };
</script>

<template>
  <div>
    <div v-for="(item, index) in tasks" :key="index" class="border-b-2 border-gray-100">
      <div class="flex items-center gap-x-[100px] p-4 hover:bg-gray-50 group">
        <div class="w-[200px]">
          <h3
            :class="{ 'line-through text-gray-400': item.checked }"
            class="capitalize text-gray-400"
          >
            {{ item.Category?.name || item.categoryId }}
          </h3>
        </div>
        <div class="flex-1 flex items-center justify-between gap-x-[50px]">
          <h3 :class="{ 'line-through text-gray-400': item.checked }">
            {{ item.content }}
          </h3>
          <div class="flex items-center justify-center rounded-full gap-x-5">
            <input
              type="checkbox"
              v-model="item.checked"
              @change="toggleTaskStatus(item.id)"
              class="w-5 h-5 bg-gray-100 border-gray-300 rounded-full accent-pink-500 opacity-0 group-hover:opacity-100 checked:opacity-100"
            />
            <button
              type="button"
              @click="deleteTask(item.id)"
              class="border border-red-700 bg-red-700 text-white opacity-0 group-hover:opacity-100 rounded-sm"
              :class="{ 'opacity-100': item.checked }"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M10 11V17"
                    stroke="#ffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M14 11V17"
                    stroke="#ffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M4 7H20"
                    stroke="#ffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                    stroke="#ffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#ffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
