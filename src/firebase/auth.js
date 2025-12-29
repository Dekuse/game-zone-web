// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Subscribe to auth state changes
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        user.value = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userDoc.data()
        };
      }
    } else {
      user.value = null;
    }
  });

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const isOwner = computed(() => user.value?.role === 'owner');
  const isStaff = computed(() => user.value?.role === 'staff');

  // Actions
  const register = async (userData) => {
    try {
      loading.value = true;
      error.value = null;

      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );

      // 2. Create user document in Firestore
      const userDoc = {
        email: userData.email,
        businessName: userData.businessName,
        phone: userData.phone,
        role: 'owner',
        subscription: {
          status: 'trial',
          plan: 'trial',
          startDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0],
          maxConsoles: 1,
          paymentMethod: 'manual'
        },
        trial: {
          used: true,
          started: new Date().toISOString().split('T')[0],
          ends: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0]
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);

      // 3. Update local user
      user.value = {
        uid: userCredential.user.uid,
        ...userDoc
      };

      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const login = async (email, password) => {
    try {
      loading.value = true;
      error.value = null;

      const userCredential = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );

      // User data will be loaded by onAuthStateChanged
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isOwner,
    isStaff,
    register,
    login,
    logout
  };
});
