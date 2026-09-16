<template>
  <div class="max-w-7xl mx-auto px-5 md:px-8 py-12">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <aside class="w-full md:w-64 shrink-0">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 space-y-2">
          <div class="pb-4 mb-4 border-b border-slate-100">
            <h2 class="font-bold text-lg text-slate-900">My Account</h2>
            <p class="text-sm text-slate-500">{{ user?.email || 'customer@lapadia.com' }}</p>
          </div>
          <NuxtLink to="/account" class="block px-5 md:px-8 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            Profile Details
          </NuxtLink>
          <NuxtLink to="/account/orders" class="block px-5 md:px-8 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            Order History
          </NuxtLink>
          <NuxtLink to="/account/subscriptions" class="block px-5 md:px-8 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            My Subscriptions
          </NuxtLink>
          <button @click="showLogoutModal = true" class="w-full text-left mt-4 block px-5 md:px-8 py-2 rounded-lg font-medium text-rose-600 hover:bg-rose-50 transition-colors">
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
      <main class="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-8">
        <h1 class="text-2xl font-bold text-slate-900 mb-6">Order History</h1>
        
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-24 bg-slate-100 rounded-xl animate-pulse"></div>
        </div>
        
        <div v-else-if="orders.length > 0" class="space-y-6">
          <div v-for="order in orders" :key="order._id" class="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors">
            <div class="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Order ID</p>
                <p class="font-medium text-slate-900">#ORD-{{ order._id.substring(order._id.length - 6).toUpperCase() }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Date</p>
                <p class="font-medium text-slate-900">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Amount</p>
                <p class="font-bold text-emerald-600">₦{{ order.totalAmount?.toLocaleString() || '0' }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Status</p>
                <span :class="[ 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border mt-1', order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200' ]">
                  {{ order.paymentStatus }}
                </span>
              </div>
              <div class="mt-4 md:mt-0 md:ml-auto">
                <button v-if="order.paymentStatus === 'pending'" @click="payOrder(order._id)" class="px-5 md:px-8 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors text-sm shadow-sm">
                  Pay Now
                </button>
              </div>
            </div>
            <div class="p-4">
              <h4 class="text-sm font-semibold text-slate-700 mb-3">Items ({{ order.items?.length || 0 }})</h4>
              <ul class="space-y-2">
                <li v-for="(item, idx) in order.items" :key="idx" class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-3">
                    <span class="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-lg">{{ item.productId?.icon || '📦' }}</span>
                    <span class="font-medium text-slate-800">{{ item.productId?.name || 'Product' }}</span>
                    <span class="text-slate-500">x{{ item.quantity }}</span>
                  </div>
                  <span class="font-medium text-slate-600">₦{{ (item.priceAtPurchase || item.productId?.price || 0).toLocaleString() }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <div class="text-2xl md:text-4xl mb-4">🛒</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">No orders yet</h3>
          <p class="text-slate-500 mb-6">Looks like you haven't placed any orders yet.</p>
          <NuxtLink to="/products" class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            Start Shopping
          </NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ordersApi } from '~/api_factory/modules/orders';

const router = useRouter();
const user = ref(null);
const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
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
      } catch(e) {}
    }

    try {
      // In a real app, you'd filter by userId. 
      // But we will just fetch all orders and filter on the frontend for simplicity here,
      // or if backend supports it. For now, assuming GET /orders returns user orders if authenticated,
      // or we just show them all since it's a demo. Let's just fetch them.
      const res = await ordersApi.getOrders();
      // Filter orders belonging to the user safely checking _id, id, and email
      const userOrders = res.data.filter((o: any) => {
        const u = user.value as any;
        if (!u) return false;
        
        return (
          (o.userId && (o.userId._id === u._id || o.userId._id === u.id)) ||
          o.userId === u._id ||
          o.userId === u.id ||
          (o.userId && o.userId.email === u.email) ||
          o.guestEmail === u.email
        );
      });
      orders.value = userOrders;
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
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

const payOrder = async (orderId: string) => {
  try {
    const res = await ordersApi.payOrder(orderId);
    if (res.data && res.data.authorization_url) {
      window.location.href = res.data.authorization_url;
    }
  } catch (err) {
    console.error('Failed to initiate payment', err);
    alert('Failed to initiate payment. Please try again.');
  }
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-blue-50 text-blue-600;
}
</style>
