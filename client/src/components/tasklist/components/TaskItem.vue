<script setup>
  import { deleteTask, updateTask } from '@/services/todo';
  import { defineProps, ref } from 'vue';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  const toggleTaskStatus = (taskId, isCompleted, content) => {
    updateTask(taskId, { isCompleted: !isCompleted })
      .then(() => {
        if (isCompleted) {
          toast.info(`Task ${content} marked as uncompleted`);
        } else {
          toast.success(`Task ${content} marked as completed`);
        }
      })
      .catch((error) => {
        console.error(`Error completed task with ID ${id}:`, error);
        toast.error(`Task ${content} failed}`);
      });
  };

  const handleDelete = (id, content) => {
    deleteTask(id)
      .then(() => {
        toast.success(`Task ${content} is deleted`);
      })
      .catch((error) => {
        console.error(`Error deleting task with ID ${id}:`, error);
        toast.error(`Task ${content} failed}`);
      });
  };
</script>

<template>
  <div>
    <div v-for="(item, index) in tasks" :key="index" class="border-b-2 border-gray-100">
      <div class="flex items-center gap-x-[100px] p-4 hover:bg-gray-50 group">
        <div class="w-[200px]">
          <h3
            :class="{ 'line-through text-gray-400': item.isCompleted }"
            class="capitalize text-gray-400"
          >
            {{ item.Category?.name || item.categoryId }}
          </h3>
        </div>
        <div class="flex-1 flex items-center justify-between gap-x-[50px]">
          <h3 :class="{ 'line-through text-gray-400': item.isCompleted }">
            {{ item.content }}
          </h3>
          <div class="flex items-center justify-center rounded-full gap-x-5">
            <div class="checkbox-wrapper">
              <input
                v-model="item.isCompleted"
                type="checkbox"
                class="check"
                :id="'check-' + item.id"
                @click="toggleTaskStatus(item.id, item.isCompleted, item.content)"
              />
              <label :for="'check-' + item.id" class="label">
                <svg width="45" height="45" viewBox="0 0 95 95">
                  <rect x="30" y="20" width="45" height="45" stroke="black" fill="none"></rect>
                  <g transform="translate(0,-952.36222)">
                    <path
                      d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                      stroke="black"
                      stroke-width="3"
                      fill="none"
                      class="path1"
                    ></path>
                  </g>
                </svg>
              </label>
            </div>
            <button
              type="button"
              @click="handleDelete(item.id, item.content)"
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

<style scoped>
  .checkbox-wrapper input[type='checkbox'] {
    visibility: hidden;
    display: none;
  }

  .checkbox-wrapper *,
  .checkbox-wrapper ::after,
  .checkbox-wrapper ::before {
    box-sizing: border-box;
    user-select: none;
  }

  .checkbox-wrapper {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .checkbox-wrapper .label {
    cursor: pointer;
  }

  .checkbox-wrapper .check {
    width: 50px;
    height: 50px;
    position: absolute;
    opacity: 0;
  }

  .checkbox-wrapper .label svg {
    vertical-align: middle;
  }

  .checkbox-wrapper .path1 {
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    transition: 0.5s stroke-dashoffset;
    opacity: 0;
  }

  .checkbox-wrapper .check:checked + label svg g path {
    stroke-dashoffset: 0;
    opacity: 1;
  }
</style>
