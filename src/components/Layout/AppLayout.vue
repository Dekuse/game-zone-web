<!-- src/components/Layout/AppLayout.vue -->
<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon 
        @click="drawer = !drawer" 
        v-if="authStore.isAuthenticated"
      />
      <v-app-bar-title>{{ appTitle }}</v-app-bar-title>
      <v-spacer />
      
      <!-- Subscription Status Badge -->
      <v-chip 
        v-if="authStore.isAuthenticated"
        :color="subscriptionStore.statusColor"
        class="mr-2"
        size="small"
      >
        {{ subscriptionStore.statusText }}
      </v-chip>
      
      <!-- User Menu -->
      <v-menu v-if="authStore.isAuthenticated">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push('/settings')">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer 
      v-model="drawer" 
      app 
      temporary
      v-if="authStore.isAuthenticated"
    >
      <v-list>
        <!-- Owner-only Items -->
        <template v-if="authStore.isOwner">
          <v-list-item 
            prepend-icon="mdi-view-dashboard" 
            title="Dashboard" 
            value="dashboard"
            @click="$router.push('/dashboard')"
          />
          <v-list-item 
            prepend-icon="mdi-gamepad" 
            title="Consoles" 
            value="consoles"
            @click="$router.push('/consoles')"
          />
          <v-list-item 
            prepend-icon="mdi-chart-bar" 
            title="Reports" 
            value="reports"
            @click="$router.push('/reports')"
          />
          <v-list-item 
            prepend-icon="mdi-account-group" 
            title="Staff" 
            value="staff"
            @click="$router.push('/staff')"
          />
        </template>

        <!-- Shared Items (Owner & Staff) -->
        <v-list-item 
          prepend-icon="mdi-play" 
          title="Start Rental" 
          value="new-rental"
          @click="$router.push('/rental/new')"
        />
        <v-list-item 
          prepend-icon="mdi-clock" 
          title="Active Rentals" 
          value="active-rentals"
          @click="$router.push('/rental/active')"
        />
        <v-list-item 
          prepend-icon="mdi-history" 
          title="History" 
          value="history"
          @click="$router.push('/rental/history')"
        />
        <v-list-item 
          prepend-icon="mdi-cash" 
          title="Subscription" 
          value="subscription"
          @click="$router.push('/subscription')"
        />
        <v-list-item 
          prepend-icon="mdi-help-circle" 
          title="Contact Support" 
          value="support"
          @click="$router.push('/contact-support')"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>

    <!-- Global Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useSubscriptionStore } from '@/stores/subscription';

const router = useRouter();
const authStore = useAuthStore();
const subscriptionStore = useSubscriptionStore();

const drawer = ref(false);
const appTitle = ref('Game Zone Manager');

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success'
});

const showSnackbar = (message, color = 'success') => {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
};

const logout = async () => {
  await authStore.logout();
  router.push('/');
  showSnackbar('Logged out successfully');
};
</script>
