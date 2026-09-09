<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
    <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10" title="Close">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-4 md:p-8">
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-2">{{ isLogin ? 'Sign in' : 'Create an account' }}</h2>
        <p class="text-center text-sm text-slate-500 font-medium mb-8">
          To continue with checkout, please {{ isLogin ? 'sign in' : 'create an account' }}.
        </p>
        
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
          <span v-if="googleLoading" class="w-5 h-5 border-2 border-slate-300 border-t-emerald-600 rounded-full animate-spin"></span>
          <span>{{ googleLoading ? 'Connecting to Google...' : (isLogin ? 'Continue with Google' : 'Register with Google') }}</span>
        </button>

        <div class="relative flex items-center py-6">
          <div class="flex-grow border-t border-slate-200"></div>
          <span class="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium uppercase tracking-wider">or with email</span>
          <div class="flex-grow border-t border-slate-200"></div>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div v-if="!isLogin">
            <label for="modal-name" class="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
            <input id="modal-name" name="name" type="text" required v-model="form.name"
              class="appearance-none block w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 sm:text-sm font-medium transition-all"
              placeholder="John Doe" />
          </div>
          <div>
            <label for="modal-email" class="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
            <input id="modal-email" name="email" type="email" autocomplete="email" required v-model="form.email"
              class="appearance-none block w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 sm:text-sm font-medium transition-all"
              placeholder="you@example.com" />
          </div>
          <div>
            <label for="modal-password" class="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
            <div class="relative">
              <input id="modal-password" name="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required v-model="form.password"
                class="appearance-none block w-full px-4 py-3.5 pr-12 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 sm:text-sm font-medium transition-all"
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

          <div class="pt-4">
            <button type="submit" :disabled="loading"
              class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0">
              <span v-if="loading" class="absolute left-4 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-if="loading">{{ isLogin ? 'Signing in...' : 'Creating Account...' }}</span>
              <span v-else>{{ isLogin ? 'Sign In to Continue' : 'Create Account & Continue' }}</span>
            </button>
          </div>
          
          <div class="text-center mt-4">
            <button type="button" @click="toggleMode" class="text-sm text-emerald-600 font-bold hover:text-emerald-700 hover:underline">
              {{ isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in" }}
            </button>
          </div>
          
          <div v-if="error" class="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-xl flex items-center gap-3 font-semibold shadow-sm mt-4">
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
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';
import { signInWithGoogle } from '~/utils/firebase';
import { useAuth } from '~/composables/core/useAuth';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['success', 'close']);
const { setAuth } = useAuth();

const isLogin = ref(true);
const form = ref({ name: '', email: '', password: '' });
const loading = ref(false);
const googleLoading = ref(false);
const error = ref('');
const showPassword = ref(false);

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  error.value = '';
  form.value.password = '';
};

const handleSuccess = (token: string, user: any) => {
  setAuth(token, user);
  emit('success', user);
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  try {
    const endpoint = isLogin.value ? '/auth/login' : '/auth/register';
    const res = await GATEWAY_ENDPOINT.post(endpoint, form.value);
    if (res.data && res.data.access_token) {
      handleSuccess(res.data.access_token, res.data.user);
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || (isLogin.value ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.');
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = async () => {
  googleLoading.value = true;
  error.value = '';
  try {
    const token = await signInWithGoogle();
    const res = await GATEWAY_ENDPOINT.post('/auth/firebase', { token });
    if (res.data && res.data.access_token) {
      handleSuccess(res.data.access_token, res.data.user);
    }
  } catch (err: any) {
    console.error(err);
    error.value = 'Google authentication failed or was cancelled.';
  } finally {
    googleLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
</style>
