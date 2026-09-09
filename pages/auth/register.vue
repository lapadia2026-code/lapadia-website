<template>
  <div class="min-h-screen flex">
    <!-- Left Section: Branding & Visuals -->
    <div class="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-800 opacity-90 z-0"></div>
      <!-- Decorative Elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div class="relative z-10 p-12 max-w-lg text-white">
        <div class="mb-8 flex items-center gap-3">
          <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 text-2xl font-bold shadow-lg">L</div>
          <span class="text-3xl font-extrabold tracking-tight">Lapadia<span class="text-blue-200">Fresh</span></span>
        </div>
        <h1 class="text-5xl font-black mb-6 leading-tight">Start your fresh journey.</h1>
        <p class="text-blue-50 text-xl font-medium leading-relaxed opacity-90">Join Lapadia Fresh to get access to farm-fresh groceries delivered to your door in minutes.</p>
        
        <div class="mt-12 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-blue-500/50 flex items-center justify-center flex-shrink-0">🚀</div>
            <p class="text-lg font-medium text-blue-50">Fastest delivery in the city</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-blue-500/50 flex items-center justify-center flex-shrink-0">🍎</div>
            <p class="text-lg font-medium text-blue-50">100% freshness guarantee</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Section: Register Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 sm:p-12 bg-slate-50 overflow-y-auto">
      <div class="max-w-md w-full space-y-8 my-auto">
        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
          <p class="mt-2 text-sm text-slate-500 font-medium">
            Already have an account? 
            <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-500 font-bold underline decoration-blue-200 underline-offset-4 transition-colors">Sign in here</NuxtLink>
          </p>
        </div>
        
        <!-- Google Sign In Button -->
        <button 
          @click="handleGoogleLogin" 
          :disabled="googleLoading"
          class="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 py-3.5 px-4 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          <svg v-if="!googleLoading" class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span v-if="googleLoading" class="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></span>
          <span>{{ googleLoading ? 'Connecting to Google...' : 'Register with Google' }}</span>
        </button>

        <div class="relative flex items-center py-2">
          <div class="flex-grow border-t border-slate-200"></div>
          <span class="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium uppercase tracking-wider">or register with email</span>
          <div class="flex-grow border-t border-slate-200"></div>
        </div>

        <form class="space-y-5" @submit.prevent="handleRegister">
          <div>
            <label for="name" class="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
            <input id="name" name="name" type="text" required v-model="form.name"
              class="appearance-none block w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm font-medium transition-all"
              placeholder="John Doe" />
          </div>
          <div>
            <label for="email-address" class="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="form.email"
              class="appearance-none block w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm font-medium transition-all"
              placeholder="you@example.com" />
          </div>
          <div>
            <label for="password" class="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
            <div class="relative">
              <input id="password" name="password" :type="showPassword ? 'text' : 'password'" required v-model="form.password"
                class="appearance-none block w-full px-4 py-3.5 pr-12 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm font-medium transition-all"
                placeholder="••••••••" />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="pt-2">
            <button type="submit" :disabled="loading"
              class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0">
              <span v-if="loading" class="absolute left-4 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-if="loading">Creating Account...</span>
              <span v-else>Register Account</span>
            </button>
          </div>
          
          <div v-if="error" class="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-xl flex items-center gap-3 font-semibold shadow-sm">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';
import { signInWithGoogle } from '~/utils/firebase';
import { useAuth } from '~/composables/core/useAuth';

const router = useRouter();
const { setAuth } = useAuth();
const form = ref({ name: '', email: '', password: '' });
const loading = ref(false);
const googleLoading = ref(false);
const error = ref('');
const showPassword = ref(false);

// To apply the layout override
definePageMeta({
  layout: false // Remove standard header/footer for auth page
});

const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await GATEWAY_ENDPOINT.post('/auth/register', form.value);
    if (res.data && res.data.access_token) {
      setAuth(res.data.access_token, res.data.user);
      router.push('/products');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = async () => {
  googleLoading.value = true;
  error.value = '';
  try {
    const token = await signInWithGoogle();
    
    // Send token to our NestJS backend
    const res = await GATEWAY_ENDPOINT.post('/auth/firebase', { token });
    if (res.data && res.data.access_token) {
      setAuth(res.data.access_token, res.data.user);
      router.push('/products');
    }
  } catch (err: any) {
    console.error(err);
    error.value = 'Google registration failed or was cancelled.';
  } finally {
    googleLoading.value = false;
  }
};
</script>
