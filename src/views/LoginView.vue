<!-- src/views/LoginView.vue -->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center">
            <h2 class="text-h4">Game Zone Manager</h2>
            <p class="text-subtitle-1">Login to your account</p>
          </v-card-title>
          
          <v-card-text>
            <v-form @submit.prevent="handleLogin" v-if="!isRegistering">
              <v-text-field
                v-model="loginForm.email"
                label="Email"
                type="email"
                required
                :error-messages="loginErrors.email"
                outlined
                class="mb-4"
              />
              
              <v-text-field
                v-model="loginForm.password"
                label="Password"
                type="password"
                required
                :error-messages="loginErrors.password"
                outlined
                class="mb-4"
              />
              
              <v-btn
                color="primary"
                type="submit"
                block
                size="large"
                :loading="authStore.loading"
              >
                Login
              </v-btn>
              
              <div class="text-center mt-4">
                <a href="#" @click="isRegistering = true" class="text-decoration-none">
                  Don't have an account? Register
                </a>
              </div>
            </v-form>
            
            <!-- Registration Form -->
            <v-form @submit.prevent="handleRegister" v-else>
              <v-text-field
                v-model="registerForm.businessName"
                label="Business Name"
                required
                :error-messages="registerErrors.businessName"
                outlined
                class="mb-3"
              />
              
              <v-text-field
                v-model="registerForm.email"
                label="Email"
                type="email"
                required
                :error-messages="registerErrors.email"
                outlined
                class="mb-3"
              />
              
              <v-text-field
                v-model="registerForm.phone"
                label="Phone Number"
                required
                :error-messages="registerErrors.phone"
                outlined
                class="mb-3"
              />
              
              <v-text-field
                v-model="registerForm.password"
                label="Password"
                type="password"
                required
                :error-messages="registerErrors.password"
                outlined
                class="mb-3"
              />
              
              <v-text-field
                v-model="registerForm.confirmPassword"
                label="Confirm Password"
                type="password"
                required
                :error-messages="registerErrors.confirmPassword"
                outlined
                class="mb-3"
              />
              
              <v-checkbox
                v-model="registerForm.terms"
                label="I agree to terms and conditions"
                required
                :error-messages="registerErrors.terms"
              />
              
              <v-btn
                color="primary"
                type="submit"
                block
                size="large"
                :loading="authStore.loading"
              >
                Register
              </v-btn>
              
              <div class="text-center mt-4">
                <a href="#" @click="isRegistering = false" class="text-decoration-none">
                  Already have an account? Login
                </a>
              </div>
            </v-form>
            
            <!-- Error Display -->
            <v-alert
              v-if="authStore.error"
              type="error"
              class="mt-4"
            >
              {{ authStore.error }}
            </v-alert>
          </v-card-text>
        </v-card>
        
        <!-- Trial Info Card -->
        <v-card class="mt-4">
          <v-card-text class="text-center">
            <v-icon color="primary" class="mb-2">mdi-star</v-icon>
            <h3 class="text-h6">5-Day Free Trial</h3>
            <p class="text-body-2">
              Get full access for 5 days. No credit card required.
              After trial, contact support to activate subscription.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isRegistering = ref(false);

// Login form
const loginForm = reactive({
  email: '',
  password: ''
});

const loginErrors = reactive({
  email: '',
  password: ''
});

// Registration form
const registerForm = reactive({
  businessName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  terms: false
});

const registerErrors = reactive({
  businessName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  terms: ''
});

// Form validation
const validateLogin = () => {
  let valid = true;
  loginErrors.email = '';
  loginErrors.password = '';
  
  if (!loginForm.email) {
    loginErrors.email = 'Email is required';
    valid = false;
  }
  
  if (!loginForm.password) {
    loginErrors.password = 'Password is required';
    valid = false;
  }
  
  return valid;
};

const validateRegister = () => {
  let valid = true;
  
  // Reset errors
  Object.keys(registerErrors).forEach(key => {
    registerErrors[key] = '';
  });
  
  if (!registerForm.businessName) {
    registerErrors.businessName = 'Business name is required';
    valid = false;
  }
  
  if (!registerForm.email) {
    registerErrors.email = 'Email is required';
    valid = false;
  }
  
  if (!registerForm.phone) {
    registerErrors.phone = 'Phone number is required';
    valid = false;
  }
  
  if (!registerForm.password) {
    registerErrors.password = 'Password is required';
    valid = false;
  } else if (registerForm.password.length < 6) {
    registerErrors.password = 'Password must be at least 6 characters';
    valid = false;
  }
  
  if (registerForm.password !== registerForm.confirmPassword) {
    registerErrors.confirmPassword = 'Passwords do not match';
    valid = false;
  }
  
  if (!registerForm.terms) {
    registerErrors.terms = 'You must accept the terms';
    valid = false;
  }
  
  return valid;
};

// Handle login
const handleLogin = async () => {
  if (!validateLogin()) return;
  
  const result = await authStore.login(loginForm.email, loginForm.password);
  
  if (result.success) {
    router.push('/dashboard');
  }
};

// Handle registration
const handleRegister = async () => {
  if (!validateRegister()) return;
  
  const result = await authStore.register({
    businessName: registerForm.businessName,
    email: registerForm.email,
    phone: registerForm.phone,
    password: registerForm.password
  });
  
  if (result.success) {
    router.push('/dashboard');
  }
};
</script>
