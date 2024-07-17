<script setup>
  import avatar from '@/assets/defaultAvatar.jpg';
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-full">
      <img :src="avatar" alt="" class="rounded-full" />
    </div>
    <div class="mt-6">
      <ul class="flex flex-col gap-2">
        <li class="font-semibold"><a href="">Today</a></li>
        <li class="text-gray-400"><a href="">Tomorrow</a></li>
        <li class="text-gray-400"><a href="">This Week</a></li>
        <li class="text-gray-400"><a href="">Next Weeks</a></li>
      </ul>
    </div>
  </div>
</template>
