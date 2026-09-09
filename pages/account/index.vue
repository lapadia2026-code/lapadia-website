<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <aside class="w-full md:w-64 shrink-0">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-2">
          <div class="pb-4 mb-4 border-b border-slate-100">
            <h2 class="font-bold text-lg text-slate-900">My Account</h2>
            <p class="text-sm text-slate-500">{{ user?.email || 'customer@lapadia.com' }}</p>
          </div>
          <NuxtLink to="/account" class="block px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            Profile Details
          </NuxtLink>
          <NuxtLink to="/account/orders" class="block px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            Order History
          </NuxtLink>
          <NuxtLink to="/account/subscriptions" class="block px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            My Subscriptions
          </NuxtLink>
          <button @click="showLogoutModal = true" class="w-full text-left mt-4 block px-4 py-2 rounded-lg font-medium text-rose-600 hover:bg-rose-50 transition-colors">
            Logout
          </button>
        </div>
      </aside>

      <!-- Logout Confirmation Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showLogoutModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showLogoutModal = false"></div>
            <div class="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 max-w-sm w-full transform transition-all">
              <div class="flex flex-col items-center text-center">
                <div class="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-5">
                  <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Sign out?</h3>
                <p class="text-slate-500 text-sm mb-8">Are you sure you want to log out of your Lapadia Fresh account?</p>
                <div class="flex gap-3 w-full">
                  <button @click="showLogoutModal = false" class="flex-1 px-5 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                  <button @click="confirmLogout" class="flex-1 px-5 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/25">
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Main Content -->
      <main class="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h1 class="text-2xl font-bold text-slate-900 mb-6">Profile Details</h1>
        
        <form @submit.prevent="updateProfile" class="space-y-6 max-w-lg">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" v-model="form.name" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Email Address</label>
            <input type="email" :value="user?.email || 'customer@lapadia.com'" disabled class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Phone Number</label>
            <input type="tel" v-model="form.phone" placeholder="Enter your phone number" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>
          
          <div class="pt-6 border-t border-slate-100">
            <h2 class="text-lg font-bold text-slate-900 mb-4">Saved Addresses</h2>
            
            <div class="space-y-3 mb-4">
              <div v-for="(address, index) in form.savedAddresses" :key="index" class="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50">
                <span class="text-sm font-medium text-slate-800 flex-1">{{ address }}</span>
                <button type="button" @click="removeAddress(index)" class="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50 ml-2" title="Remove">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              <p v-if="form.savedAddresses.length === 0" class="text-sm text-slate-500 italic">No saved addresses yet.</p>
            </div>
            
            <div class="flex gap-2">
              <input type="text" v-model="newAddress" placeholder="Enter a new address..." class="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm" @keydown.enter.prevent="addAddress" />
              <button type="button" @click="addAddress" class="px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors text-sm">
                Add
              </button>
            </div>
          </div>
          
          <button :disabled="saving" class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 mt-6">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { GATEWAY_ENDPOINT_WITH_AUTH } from '~/api_factory/axios.config';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { useAuth } from '~/composables/core/useAuth';

const router = useRouter();
const { setAuth } = useAuth();
const { showToast } = useCustomToast();
const user = ref<any>(null);
const saving = ref(false);

const form = reactive({
  name: '',
  phone: '',
  savedAddresses: [] as string[]
});

const newAddress = ref('');

const addAddress = () => {
  if (newAddress.value.trim()) {
    form.savedAddresses.push(newAddress.value.trim());
    newAddress.value = '';
  }
};

const removeAddress = (index: number) => {
  form.savedAddresses.splice(index, 1);
};

onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        user.value = JSON.parse(userStr);
        form.name = user.value.name || '';
        form.phone = user.value.phone || '';
        form.savedAddresses = user.value.savedAddresses || [];
      } catch(e) {}
    }
  }
});

const updateProfile = async () => {
  saving.value = true;
  try {
    const res = await GATEWAY_ENDPOINT_WITH_AUTH.post('/users/profile', {
      name: form.name,
      phone: form.phone,
      savedAddresses: form.savedAddresses
    });
    
    user.value = res.data;
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(token, res.data); // Update global state and localStorage
    }
    
    showToast({ title: 'Success', message: 'Profile updated successfully!', type: 'success' });
  } catch (error) {
    showToast({ title: 'Error', message: 'Failed to update profile. Please try again.', type: 'error' });
  } finally {
    saving.value = false;
  }
};

const showLogoutModal = ref(false);

const confirmLogout = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  showLogoutModal.value = false;
  router.push('/auth/login');
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-blue-50 text-blue-600;
}
</style>
