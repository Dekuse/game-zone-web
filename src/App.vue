<!-- src/App.vue -->
<template>
  <AppLayout v-if="authStore.isAuthenticated" />
  <router-view v-else />
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import AppLayout from './components/Layout/AppLayout.vue';

const authStore = useAuthStore();

onMounted(() => {
  // Check auth state on app load
  authStore.checkAuthState();
});
</script>
