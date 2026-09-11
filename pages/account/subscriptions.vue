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
        <h1 class="text-2xl font-bold text-slate-900 mb-6">My Subscriptions</h1>
        
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 2" :key="i" class="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
        </div>

        <div v-else-if="subscriptions.length === 0" class="text-center py-12">
          <div class="text-2xl md:text-4xl mb-4">🔁</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">No active subscriptions</h3>
          <p class="text-slate-500 mb-6">You are not subscribed to any recurring deliveries yet.</p>
          <NuxtLink to="/subscriptions" class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            Explore Plans
          </NuxtLink>
        </div>

        <div v-else class="space-y-6">
          <div v-for="sub in subscriptions" :key="sub._id" class="border border-slate-200 rounded-2xl p-6 relative">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-bold text-lg text-slate-900">{{ sub.planId?.name || 'Custom Subscription Box' }}</h3>
                <p class="text-sm text-slate-500 capitalize">{{ sub.frequency }} Plan &bull; ₦{{ (sub.totalAmount || (sub.planId?.price * sub.quantity) || 0).toLocaleString() }}</p>
              </div>
              <span :class="['px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide', sub.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">
                {{ sub.status }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-xl">
              <div>
                <p class="text-xs text-slate-500 font-medium">Started On</p>
                <p class="text-sm font-bold text-slate-900">{{ new Date(sub.createdAt).toLocaleDateString() }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-500 font-medium">Next Billing Date</p>
                <p class="text-sm font-bold text-slate-900">{{ new Date(sub.nextBillingDate).toLocaleDateString() }}</p>
              </div>
            </div>

            <div v-if="sub.items && sub.items.length > 0" class="mb-6 p-4">
              <h4 class="text-sm font-semibold text-slate-700 mb-3">Subscription Items ({{ sub.items.length }})</h4>
              <ul class="space-y-2">
                <li v-for="(item, idx) in sub.items" :key="idx" class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-3">
                    <span class="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-lg">{{ item.productId?.icon || '📦' }}</span>
                    <span class="font-medium text-slate-800">{{ item.productId?.name || 'Product' }}</span>
                    <span class="text-slate-500">x{{ item.quantity }}</span>
                  </div>
                  <span class="font-medium text-slate-600">₦{{ (item.priceAtPurchase || item.productId?.price || 0).toLocaleString() }}</span>
                </li>
              </ul>
            </div>

            <div class="flex justify-end gap-3 border-t border-slate-100 pt-4" v-if="sub.status === 'active'">
              <button v-if="sub.planId?.allowSwaps !== false && getSwappableProducts(sub).length > 0" @click="openSwapModal(sub)" class="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2">
                Swap Products
              </button>
              <button @click="openCancelModal(sub)" class="px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Swap Products Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showSwapModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showSwapModal = false"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full flex flex-col max-h-[90vh]">
            <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <h2 class="text-xl font-bold text-slate-900">Swap Products</h2>
              <button @click="showSwapModal = false" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div class="p-6 overflow-y-auto flex-1 bg-slate-50/50">
              <p class="text-sm text-slate-500 mb-4">Select the products you'd like to receive in your upcoming deliveries.</p>
              
              <div v-if="swapAvailableProducts.length > 0" class="space-y-3">
                <label v-for="prod in swapAvailableProducts" :key="prod._id" class="flex items-center gap-4 p-3 border border-slate-200 rounded-xl bg-white cursor-pointer hover:border-blue-300 transition-colors" :class="{ 'border-blue-500 ring-1 ring-blue-500': selectedSwapProductIds.includes(prod._id) }">
                  <input type="checkbox" :value="prod._id" v-model="selectedSwapProductIds" class="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <div class="flex-1 flex items-center gap-3">
                    <img v-if="prod.images?.[0]" :src="prod.images[0]" class="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                    <div v-else class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">{{ prod.icon || '📦' }}</div>
                    <div>
                      <h4 class="font-bold text-slate-900 text-sm">{{ prod.name }}</h4>
                      <p class="text-xs text-slate-500">₦{{ prod.price?.toLocaleString() }}</p>
                    </div>
                  </div>
                </label>
              </div>
              <div v-else class="text-center py-8">
                <div class="text-xl md:text-3xl mb-3">📦</div>
                <p class="text-slate-500 text-sm">No swappable products available for this plan.</p>
              </div>
            </div>

            <div class="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white rounded-b-2xl">
              <button type="button" @click="showSwapModal = false" class="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
              <button type="button" @click="confirmSwap" :disabled="isSwapping || selectedSwapProductIds.length === 0" class="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50">
                <span v-if="isSwapping" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Cancel Subscription Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showCancelModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showCancelModal = false"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full flex flex-col">
            <div class="p-6 text-center">
              <div class="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Cancel Subscription?</h3>
              <p class="text-slate-500 text-sm mb-6">Are you sure you want to cancel this subscription? You will not receive any further deliveries.</p>
              
              <div class="text-left mb-6">
                <label class="block text-sm font-semibold text-slate-700 mb-2">Reason for cancellation (optional)</label>
                <textarea v-model="cancelReason" rows="3" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition-all text-sm" placeholder="Tell us why you are leaving..."></textarea>
              </div>

              <div class="flex gap-3">
                <button type="button" @click="showCancelModal = false" class="flex-1 px-5 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Keep It
                </button>
                <button type="button" @click="confirmCancelSubscription" :disabled="isCancelling" class="flex-1 px-5 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/25 flex justify-center items-center gap-2 disabled:opacity-50">
                  <span v-if="isCancelling" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { GATEWAY_ENDPOINT_WITH_AUTH } from '~/api_factory/axios.config';
import { useCustomToast } from '~/composables/core/useCustomToast';

const router = useRouter();
const user = ref(null);
const subscriptions = ref<any[]>([]);
const loading = ref(true);
const actionLoading = ref<string | null>(null);
const { showToast } = useCustomToast();

const fetchSubscriptions = async () => {
  loading.value = true;
  try {
    const res = await GATEWAY_ENDPOINT_WITH_AUTH.get('/subscriptions/user');
    subscriptions.value = res.data;
  } catch (error) {
    console.error('Failed to fetch subscriptions', error);
  } finally {
    loading.value = false;
  }
};

const showCancelModal = ref(false);
const subToCancel = ref<any>(null);
const cancelReason = ref('');
const isCancelling = ref(false);

const openCancelModal = (sub: any) => {
  subToCancel.value = sub;
  cancelReason.value = '';
  showCancelModal.value = true;
};

const confirmCancelSubscription = async () => {
  if (!subToCancel.value) return;
  
  isCancelling.value = true;
  try {
    await GATEWAY_ENDPOINT_WITH_AUTH.put(`/subscriptions/user/${subToCancel.value._id}/cancel`, {
      reason: cancelReason.value
    });
    showToast({ title: 'Success', message: 'Subscription has been cancelled.', type: 'success' });
    showCancelModal.value = false;
    await fetchSubscriptions();
  } catch (error: any) {
    showToast({ title: 'Error', message: error.response?.data?.message || 'Failed to cancel subscription.', type: 'error' });
  } finally {
    isCancelling.value = false;
  }
};

const showSwapModal = ref(false);
const currentSwapSub = ref<any>(null);
const selectedSwapProductIds = ref<string[]>([]);
const isSwapping = ref(false);

const getSwappableProducts = (sub: any) => {
  if (!sub || !sub.planId) return [];
  // Use swappableProductIds if available, otherwise fallback to productIds
  return sub.planId.swappableProductIds?.length > 0 ? sub.planId.swappableProductIds : (sub.planId.productIds || []);
};

const swapAvailableProducts = computed(() => {
  if (!currentSwapSub.value) return [];
  return getSwappableProducts(currentSwapSub.value);
});

const openSwapModal = (sub: any) => {
  currentSwapSub.value = sub;
  // Pre-select currently active items
  selectedSwapProductIds.value = sub.items.map((item: any) => item.productId?._id || item.productId).filter(Boolean);
  showSwapModal.value = true;
};

const confirmSwap = async () => {
  if (!currentSwapSub.value || selectedSwapProductIds.value.length === 0) return;
  
  isSwapping.value = true;
  try {
    const planProducts = swapAvailableProducts.value;
    
    // Map selected IDs to item objects
    const newItems = selectedSwapProductIds.value.map(id => {
      const prodDetails = planProducts.find((p: any) => p._id === id);
      return {
        productId: id,
        quantity: 1,
        priceAtPurchase: prodDetails ? prodDetails.price : 0
      };
    });

    await GATEWAY_ENDPOINT_WITH_AUTH.put(`/subscriptions/user/${currentSwapSub.value._id}/swap`, {
      items: newItems
    });
    
    showToast({ title: 'Success', message: 'Subscription products updated successfully.', type: 'success' });
    showSwapModal.value = false;
    await fetchSubscriptions();
  } catch (error: any) {
    showToast({ title: 'Error', message: error.response?.data?.message || 'Failed to update products.', type: 'error' });
  } finally {
    isSwapping.value = false;
  }
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
        fetchSubscriptions();
      } catch(e) {}
    }
  }
});

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
