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
          <NuxtLink to="/account/favorites" class="block px-5 md:px-8 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            My Favorites
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
        <h1 class="text-2xl font-bold text-slate-900 mb-6">My Favorites</h1>
        
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-slate-50 rounded-3xl p-4 animate-pulse" v-for="i in 3" :key="i">
            <div class="w-full h-48 bg-slate-200 rounded-2xl mb-4"></div>
            <div class="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
            <div class="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
            <div class="flex justify-between items-center">
              <div class="h-6 bg-slate-200 rounded w-1/4"></div>
              <div class="w-10 h-10 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>
        
        <div v-else-if="favorites.length === 0" class="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div class="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
            <svg class="w-12 h-12 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">No favorites yet</h3>
          <p class="text-slate-500 mb-8 max-w-sm">You haven't saved any items yet. Start exploring our menu and click the heart icon on products you love.</p>
          <NuxtLink to="/products" class="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Explore Menu
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            class="bg-slate-50 rounded-3xl p-4 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative flex flex-col" 
            v-for="product in favorites" 
            :key="product._id || product.id"
          >
            <button @click.prevent="toggleFavorite(product._id || product.id)" class="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-sm text-slate-300 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all">
              <svg class="w-5 h-5 text-rose-500 fill-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <NuxtLink :to="`/products/${product._id || product.id}`" class="block">
              <div class="relative w-full h-48 bg-white rounded-2xl mb-5 overflow-hidden flex items-center justify-center group-hover:scale-95 transition-transform duration-500 shadow-sm border border-slate-100 mix-blend-multiply">
                <img :src="getHeroImage(product)" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </NuxtLink>
            
            <div class="px-2 pb-2 flex-1 flex flex-col">
              <div class="text-xs font-bold text-[#FFCD42] uppercase tracking-widest mb-1.5">{{ product.category || 'Smoothie' }}</div>
              <NuxtLink :to="`/products/${product._id || product.id}`" class="block hover:text-[#FFCD42] transition-colors mb-3">
                <h3 class="font-black text-slate-900 text-xl leading-tight line-clamp-2">{{ product.name }}</h3>
              </NuxtLink>
              
              <div class="mt-auto flex items-end justify-between pt-4">
                <div>
                  <span class="text-2xl font-black text-slate-900">₦{{ product.price?.toLocaleString() }}</span>
                </div>
                <button @click.prevent="addToCart(product, 1)" class="w-12 h-12 bg-[#FFCD42] text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors hover:scale-105 active:scale-95 shadow-lg group-hover:-translate-y-1 font-black text-xl">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '~/composables/modules/cart/useCart';
import { useFavorites } from '~/composables/modules/favorites/useFavorites';

const router = useRouter();
const user = ref<any>(null);
const loading = ref(true);

const { addToCart } = useCart();
const { favorites, fetchFavorites, toggleFavorite } = useFavorites();

// Dynamic images for demo
const getHeroImage = (product: any) => {
  if (product.imageUrl) return product.imageUrl;
  const name = product.name?.toLowerCase() || '';
  if (name.includes('orange') || name.includes('citrus')) return '/images/hero_orange.jpg';
  if (name.includes('green') || name.includes('kale') || name.includes('spinach')) return '/images/hero_green.jpg';
  if (name.includes('apple')) return '/images/thumb_apple.jpg';
  if (name.includes('lemon')) return '/images/thumb_lemon.jpg';
  if (name.includes('berry') || name.includes('strawberry') || name.includes('acai')) return '/images/thumb_apple.jpg';
  return '/images/hero_orange.jpg';
};

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
  }
  
  await fetchFavorites();
  loading.value = false;
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
