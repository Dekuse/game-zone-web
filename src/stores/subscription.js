// src/stores/subscription.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from './auth';
import dayjs from 'dayjs';

export const useSubscriptionStore = defineStore('subscription', () => {
  const authStore = useAuthStore();
  const loading = ref(false);
  const error = ref(null);

  // Computed properties for subscription
  const subscription = computed(() => authStore.user?.subscription || {});
  
  const daysLeft = computed(() => {
    if (!subscription.value.expiryDate) return 0;
    const expiry = dayjs(subscription.value.expiryDate);
    const today = dayjs();
    return expiry.diff(today, 'day');
  });

  const isActive = computed(() => {
    return subscription.value.status === 'active' && daysLeft.value > 0;
  });

  const isTrial = computed(() => {
    return subscription.value.status === 'trial' && daysLeft.value > 0;
  });

  const isExpired = computed(() => {
    return daysLeft.value <= 0;
  });

  const statusColor = computed(() => {
    if (isActive.value) return 'success';
    if (isTrial.value) return 'warning';
    return 'error';
  });

  const statusText = computed(() => {
    if (isActive.value) return `Active (${daysLeft.value} days left)`;
    if (isTrial.value) return `Trial (${daysLeft.value} days left)`;
    return 'Expired - Contact Support';
  });

  const maxConsoles = computed(() => {
    return subscription.value.maxConsoles || 1;
  });

  // Check if user can add more consoles
  const canAddConsole = computed(() => {
    if (!authStore.user?.uid) return false;
    const consoleCount = authStore.user.consoleCount || 0;
    return consoleCount < maxConsoles.value;
  });

  // Update subscription (called by admin panel)
  const updateSubscription = async (updates) => {
    try {
      loading.value = true;
      if (!authStore.user?.uid) throw new Error('Not authenticated');

      const userRef = doc(db, 'users', authStore.user.uid);
      await updateDoc(userRef, {
        subscription: {
          ...subscription.value,
          ...updates,
          updatedAt: new Date().toISOString()
        }
      });

      // Refresh user data
      await authStore.fetchUser();
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  // Check subscription status on app start
  const checkSubscriptionStatus = () => {
    if (isExpired.value && subscription.value.status !== 'expired') {
      // Auto-update to expired if days left <= 0
      updateSubscription({ status: 'expired' });
    }
  };

  return {
    loading,
    error,
    subscription,
    daysLeft,
    isActive,
    isTrial,
    isExpired,
    statusColor,
    statusText,
    maxConsoles,
    canAddConsole,
    updateSubscription,
    checkSubscriptionStatus
  };
});
