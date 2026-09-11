<template>
  <div class="py-6 md:py-10 pb-16 max-w-7xl mx-auto px-4">
    <div class="mb-12">
      <h1 class="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">All Products</h1>
      <p class="text-lg text-slate-500 max-w-2xl">Browse our entire catalog of fresh groceries, pantry staples, and household items. Add directly to your cart or subscribe for recurring delivery.</p>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-8 overflow-x-auto pb-2">
      <button class="px-6 py-2 rounded-full bg-slate-900 text-white font-medium whitespace-nowrap">All</button>
      <button class="px-6 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium whitespace-nowrap transition-colors">Produce</button>
      <button class="px-6 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium whitespace-nowrap transition-colors">Dairy</button>
      <button class="px-6 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium whitespace-nowrap transition-colors">Pantry</button>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <template v-if="loading">
        <div class="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm animate-pulse" v-for="i in 8" :key="i">
          <div class="w-full h-48 bg-slate-200 rounded-2xl mb-4"></div>
          <div class="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
          <div class="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
          <div class="flex justify-between items-center">
            <div class="h-6 bg-slate-200 rounded w-1/4"></div>
            <div class="w-10 h-10 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      </template>
      <template v-else-if="products && products.length > 0">
        <div class="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group relative" v-for="product in products" :key="product._id || product.id">
          <!-- Add to Favorites Button (Absolute) -->
          <button @click.prevent="toggleFav(product._id || product.id)" class="absolute top-7 right-7 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-rose-500 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all">
            <svg class="w-5 h-5" :fill="checkFavorite(product._id || product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <NuxtLink :to="`/products/${product._id || product.id}`" class="block">
            <div class="relative w-full h-48 bg-slate-100 rounded-2xl mb-4 overflow-hidden flex items-center justify-center text-2xl md:text-4xl">
              <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="w-full h-full object-cover" />
              <span v-else>{{ product.icon || '📦' }}</span>
            </div>
          </NuxtLink>

          <div class="px-2">
            <div class="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{{ product.category || 'Item' }}</div>
            <NuxtLink :to="`/products/${product._id || product.id}`" class="block hover:text-blue-600 transition-colors">
              <h3 class="font-bold text-slate-900 text-lg mb-1 truncate">{{ product.name }}</h3>
            </NuxtLink>
            <div class="flex items-center justify-between mt-4">
              <span class="text-xl font-extrabold text-slate-900">₦{{ product.price }}</span>
              <button @click.prevent="addToCart(product, 1)" class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors hover:scale-110 active:scale-95 shadow-md">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col-span-full py-12 text-center text-slate-500">
          No products found. Check back later!
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGetProducts } from '~/composables/modules/products/useGetProducts';
import { useCart } from '~/composables/modules/cart/useCart';
import { useFavorites } from '~/composables/modules/favorites/useFavorites';

const { loading, error, products, getProducts } = useGetProducts();
const { addToCart } = useCart();
const { toggleFavorite: toggleFav, isFavorite: checkFavorite } = useFavorites();

onMounted(async () => {
  await getProducts();
});
</script>
