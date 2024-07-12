<script setup>
import { reactive, onMounted } from 'vue';
import { getUser } from '@/services/user';

// Define reactive state
const state = reactive({
  userData: null,
  error: null,
});

// Function to fetch user data
const getUserNe = async () => {
  try {
    const response = await getUser(); // Replace with your API endpoint
    console.log(response)
    state.userData = response.data[0]; // Assuming your response has a data property
  } catch (error) {
    state.error = error.message;
  }
};

// Fetch user data when component is mounted
onMounted(getUserNe);
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div v-if="state.userData">
      <p>User Name: {{ state.userData.name }}</p> <!-- Adjust this based on your API response structure -->
      <p>Email: {{ state.userData.email }}</p> <!-- Adjust this based on your API response structure -->
    </div>
    <p v-if="state.error" class="error-message">{{ state.error }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.error-message {
  color: red;
}
</style>
