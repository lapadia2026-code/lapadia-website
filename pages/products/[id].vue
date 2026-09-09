<template>
  <div class="py-6 md:py-10 pb-16 max-w-7xl mx-auto px-4">
    <div class="mb-8">
      <NuxtLink to="/products" class="text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-2 w-fit transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Products
      </NuxtLink>
    </div>
    <div v-if="loading" class="animate-pulse flex flex-col md:flex-row gap-12">
      <div class="w-full md:w-1/2 h-96 bg-slate-200 rounded-3xl"></div>
      <div class="w-full md:w-1/2 space-y-6">
        <div class="h-8 bg-slate-200 rounded w-3/4"></div>
        <div class="h-6 bg-slate-200 rounded w-1/4"></div>
        <div class="h-24 bg-slate-200 rounded w-full"></div>
        <div class="h-12 bg-slate-200 rounded w-1/3"></div>
      </div>
    </div>
    <div v-else-if="product" class="flex flex-col md:flex-row gap-12">
      <!-- Product Image with Zoom -->
      <div 
        class="w-full md:w-1/2 h-96 md:h-[500px] bg-slate-100 rounded-3xl flex items-center justify-center text-8xl shadow-sm border border-slate-100 overflow-hidden relative group cursor-crosshair"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <div 
          class="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
          :style="zoomStyle"
        >
          <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="w-full h-full object-cover" />
          <span v-else class="text-9xl">{{ product.icon || '📦' }}</span>
        </div>
      </div>
      
      <div class="w-full md:w-1/2 flex flex-col justify-center">
        <div class="flex items-center justify-between mb-2">
          <div class="text-sm font-semibold text-blue-600 uppercase tracking-wider">{{ product.category }}</div>
          <button @click="toggleFavorite" class="w-12 h-12 rounded-full flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors shadow-sm" :title="isFavorite ? 'Remove from Favorites' : 'Add to Favorites'">
            <svg class="w-6 h-6" :fill="isFavorite ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{{ product.name }}</h1>
        <div class="text-3xl font-bold text-slate-900 mb-6">₦{{ product.price }}</div>
        <p class="text-lg text-slate-500 mb-8 leading-relaxed">{{ product.description }}</p>
        
        <div class="flex items-center gap-6 mb-8">
          <div class="flex items-center border-2 border-slate-200 rounded-full bg-white">
            <button @click="quantity > 1 ? quantity-- : null" class="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-slate-900 font-medium text-xl">-</button>
            <span class="w-12 text-center font-bold text-slate-900">{{ quantity }}</span>
            <button @click="quantity++" class="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-slate-900 font-medium text-xl">+</button>
          </div>
          <span class="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">{{ product.stock || 0 }} in stock</span>
        </div>

        <button @click="handleAddToCart" class="w-full py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1">
          Add to Cart
        </button>
      </div>
    </div>
    <div v-else class="text-center py-24">
      <h2 class="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
      <p class="text-slate-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/products" class="text-blue-600 font-medium hover:underline">Return to Products</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '~/composables/modules/cart/useCart';
import { useFavorites } from '~/composables/modules/favorites/useFavorites';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { toggleFavorite: toggleFav, isFavorite: checkFavorite } = useFavorites();

const loading = ref(true);
const product = ref<any>(null);
const quantity = ref(1);

// Zoom logic
const mouseX = ref(50);
const mouseY = ref(50);
const isHovering = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  if (!target) return;
  const { left, top, width, height } = target.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  mouseX.value = x;
  mouseY.value = y;
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
};

const zoomStyle = computed(() => {
  if (!isHovering.value) return 'transform: scale(1); transform-origin: center center;';
  return `transform: scale(1.5); transform-origin: ${mouseX.value}% ${mouseY.value}%;`;
});

// Favorites logic
const isFavorite = computed(() => product.value ? checkFavorite(product.value._id) : false);

const toggleFavorite = async () => {
  if (product.value) {
    await toggleFav(product.value._id);
  }
};

onMounted(async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get(`/products/${route.params.id}`);
    product.value = res.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value, quantity.value);
    router.push('/cart');
  }
};
</script>
