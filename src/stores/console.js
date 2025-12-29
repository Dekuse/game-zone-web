// src/stores/console.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  getDocs,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from './auth';

export const useConsoleStore = defineStore('console', () => {
  const authStore = useAuthStore();
  const consoles = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Get consoles collection reference for current owner
  const getConsolesRef = () => {
    if (!authStore.user?.uid) return null;
    return collection(db, 'users', authStore.user.uid, 'consoles');
  };

  // Fetch all consoles
  const fetchConsoles = async () => {
    try {
      loading.value = true;
      const consolesRef = getConsolesRef();
      if (!consolesRef) return;

      const querySnapshot = await getDocs(consolesRef);
      consoles.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Real-time listener for consoles
  const subscribeToConsoles = () => {
    const consolesRef = getConsolesRef();
    if (!consolesRef) return;

    return onSnapshot(consolesRef, (snapshot) => {
      consoles.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  };

  // Add new console
  const addConsole = async (consoleData) => {
    try {
      // Check subscription limit
      if (consoles.value.length >= authStore.user?.subscription?.maxConsoles) {
        throw new Error(`Subscription limit reached. You can only add ${authStore.user.subscription.maxConsoles} console(s).`);
      }

      const consolesRef = getConsolesRef();
      if (!consolesRef) throw new Error('Not authenticated');

      const newConsole = {
        ...consoleData,
        status: 'available',
        totalHours: 0,
        totalEarnings: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(consolesRef, newConsole);
      return { success: true, id: docRef.id };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    }
  };

  // Update console
  const updateConsole = async (consoleId, updates) => {
    try {
      if (!authStore.user?.uid) throw new Error('Not authenticated');
      
      const consoleRef = doc(db, 'users', authStore.user.uid, 'consoles', consoleId);
      await updateDoc(consoleRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    }
  };

  // Delete console
  const deleteConsole = async (consoleId) => {
    try {
      if (!authStore.user?.uid) throw new Error('Not authenticated');
      
      const consoleRef = doc(db, 'users', authStore.user.uid, 'consoles', consoleId);
      await deleteDoc(consoleRef);
      
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    }
  };

  // Get available consoles
  const availableConsoles = computed(() => 
    consoles.value.filter(c => c.status === 'available')
  );

  // Get busy consoles
  const busyConsoles = computed(() => 
    consoles.value.filter(c => c.status === 'busy')
  );

  return {
    consoles,
    loading,
    error,
    fetchConsoles,
    subscribeToConsoles,
    addConsole,
    updateConsole,
    deleteConsole,
    availableConsoles,
    busyConsoles
  };
});
