// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useSubscriptionStore } from '@/stores/subscription';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false, public: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresAuth: false, public: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/consoles',
    name: 'consoles',
    component: () => import('@/views/ConsolesView.vue'),
    meta: { requiresAuth: true, requiresOwner: false }
  },
  {
    path: '/rental/new',
    name: 'new-rental',
    component: () => import('@/views/NewRentalView.vue'),
    meta: { requiresAuth: true, requiresOwner: false }
  },
  {
    path: '/rental/active',
    name: 'active-rentals',
    component: () => import('@/views/ActiveRentalsView.vue'),
    meta: { requiresAuth: true, requiresOwner: false }
  },
  {
    path: '/rental/history',
    name: 'rental-history',
    component: () => import('@/views/RentalHistoryView.vue'),
    meta: { requiresAuth: true, requiresOwner: false }
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/ReportsView.vue'),
    meta: { requiresAuth: true, requiresOwner: true } // Only owners
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import('@/views/StaffView.vue'),
    meta: { requiresAuth: true, requiresOwner: true } // Only owners
  },
  {
    path: '/subscription',
    name: 'subscription',
    component: () => import('@/views/SubscriptionView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contact-support',
    name: 'contact-support',
    component: () => import('@/views/ContactSupportView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const subscriptionStore = useSubscriptionStore();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
    return;
  }

  // Check if user is authenticated
  if (authStore.isAuthenticated) {
    // Check subscription status
    subscriptionStore.checkSubscriptionStatus();

    // Redirect from public pages if logged in
    if (to.meta.public) {
      next('/dashboard');
      return;
    }

    // Check if route requires owner role
    if (to.meta.requiresOwner && !authStore.isOwner) {
      // Staff members can't access owner-only pages
      next('/dashboard');
      return;
    }

    // Check if subscription expired (except subscription page)
    if (subscriptionStore.isExpired && to.name !== 'subscription' && to.name !== 'contact-support') {
      next('/subscription');
      return;
    }
  }

  next();
});

export default router;
