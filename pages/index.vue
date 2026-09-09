<template>
  <div>
    <!-- Enhanced Hero Section with Parallax and Staggered Animations -->
    <section class="relative pt-24 pb-20 md:pb-32 overflow-hidden bg-white">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')] opacity-50 animate-[pan_60s_linear_infinite]"></div>
      
      <!-- Glowing Orbs -->
      <div class="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-1/3 -right-20 w-64 md:w-96 h-64 md:h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50/80 backdrop-blur-sm text-blue-600 font-bold text-xs md:text-sm mb-6 md:mb-8 border border-blue-100 shadow-sm animate-fade-in-up hover:scale-105 transition-transform cursor-default">
          <span class="relative flex h-2 w-2 md:h-3 md:w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-blue-500"></span>
          </span>
          Next-Gen Grocery Delivery
        </div>
        
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-4 md:mb-6 leading-tight max-w-5xl animate-fade-in-up animation-delay-200">
          Fresh from the farm to your <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 animate-gradient-x">front door.</span>
        </h1>
        
        <p class="text-base md:text-xl text-slate-500 max-w-2xl md:max-w-3xl mb-8 md:mb-12 animate-fade-in-up animation-delay-400 font-medium leading-relaxed">
          Automate your life. Subscribe to your essential groceries and never run out again. Experience unparalleled quality and seamless delivery.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600 w-full sm:w-auto">
          <NuxtLink to="/products" class="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold md:font-black text-base md:text-lg shadow-xl md:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 md:hover:-translate-y-2 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 group">
            Start Shopping
            <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </NuxtLink>
          <NuxtLink to="/subscriptions" class="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl md:rounded-2xl font-bold md:font-black text-base md:text-lg hover:border-blue-200 hover:bg-blue-50 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3">
            <svg class="w-5 h-5 md:w-6 md:h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Explore Plans
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden">
      <!-- Decorative background lines -->
      <div class="absolute inset-0 opacity-5">
        <div class="h-px w-full bg-slate-900 absolute top-1/4"></div>
        <div class="h-px w-full bg-slate-900 absolute top-2/4"></div>
        <div class="h-px w-full bg-slate-900 absolute top-3/4"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-10 md:mb-16 animate-fade-in-up">
          <h2 class="text-3xl md:text-4xl font-black mb-3 md:mb-4">How Lapadia Works</h2>
          <p class="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">Three simple steps to automate your grocery shopping forever.</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          <!-- Step 1 -->
          <div class="text-center group animate-fade-in-up animation-delay-200">
            <div class="w-16 h-16 md:w-20 md:h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4 md:mb-6 border border-blue-100 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 group-hover:rotate-6">
              <svg class="w-8 h-8 md:w-10 md:h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-3">1. Build Your Box</h3>
            <p class="text-sm md:text-base text-slate-500 leading-relaxed">Select your favorite fresh produce, pantry staples, and household items from our vast catalog.</p>
          </div>
          
          <!-- Step 2 -->
          <div class="text-center group animate-fade-in-up animation-delay-400">
            <div class="w-16 h-16 md:w-20 md:h-20 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 md:mb-6 border border-emerald-100 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300 group-hover:-rotate-6">
              <svg class="w-8 h-8 md:w-10 md:h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-3">2. Set Schedule</h3>
            <p class="text-sm md:text-base text-slate-500 leading-relaxed">Choose whether you want your items delivered weekly or monthly. We handle the recurring billing.</p>
          </div>
          
          <!-- Step 3 -->
          <div class="text-center group animate-fade-in-up animation-delay-600">
            <div class="w-16 h-16 md:w-20 md:h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4 md:mb-6 border border-blue-100 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 group-hover:rotate-6">
              <svg class="w-8 h-8 md:w-10 md:h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-3">3. Unbox & Enjoy</h3>
            <p class="text-sm md:text-base text-slate-500 leading-relaxed">Receive farm-fresh groceries right at your doorstep exactly when you need them.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Featured Products -->
    <section class="py-16 md:py-24 bg-slate-50 relative">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-12 gap-4">
          <div>
            <div class="text-blue-600 font-bold tracking-wider uppercase text-xs md:text-sm mb-1 md:mb-2">Curated Selection</div>
            <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Trending Items</h2>
          </div>
          <NuxtLink to="/products" class="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1 group text-sm md:text-base">
            Explore entire catalog 
            <span class="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          <template v-if="loading">
            <div class="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm animate-pulse" v-for="i in 4" :key="i">
              <div class="w-full h-40 bg-slate-200 rounded-xl mb-3"></div>
              <div class="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
              <div class="h-5 bg-slate-200 rounded w-2/3 mb-3"></div>
              <div class="flex justify-between items-center">
                <div class="h-5 bg-slate-200 rounded w-1/4"></div>
                <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </template>
          
          <template v-else-if="products && products.length > 0">
            <div 
              class="bg-white rounded-2xl md:rounded-[1.5rem] p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-lg md:hover:shadow-xl hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-500 group relative flex flex-col animate-fade-in-up" 
              v-for="(product, index) in products" 
              :key="product._id || product.id"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <!-- Add to Favorites Button -->
              <button @click.prevent="toggleFav(product._id || product.id)" class="absolute top-4 md:top-5 right-4 md:right-5 z-10 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-sm text-slate-300 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all">
                <svg class="w-4 h-4 md:w-5 md:h-5" :class="{ 'text-rose-500 fill-rose-500': checkFavorite(product._id || product.id) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <NuxtLink :to="`/products/${product._id || product.id}`" class="block">
                <div class="relative w-full h-32 md:h-48 bg-slate-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center text-4xl md:text-5xl group-hover:bg-blue-50 transition-colors duration-500">
                  <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span v-else class="group-hover:scale-110 transition-transform duration-500">{{ product.icon || '📦' }}</span>
                </div>
              </NuxtLink>
              
              <div class="px-1 md:px-2 pb-1 md:pb-2 flex-1 flex flex-col">
                <div class="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{{ product.category || 'Item' }}</div>
                <NuxtLink :to="`/products/${product._id || product.id}`" class="block hover:text-blue-600 transition-colors mb-2 md:mb-3">
                  <h3 class="font-bold md:font-black text-slate-900 text-sm md:text-lg leading-tight line-clamp-2">{{ product.name }}</h3>
                </NuxtLink>
                
                <div class="mt-auto flex items-end justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span class="text-xs text-slate-500 block mb-0.5">Price</span>
                    <span class="text-lg md:text-xl font-black text-slate-900">₦{{ product.price?.toLocaleString() }}</span>
                  </div>
                  <button @click.prevent="addToCart(product, 1)" class="w-10 h-10 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10 md:shadow-slate-900/20 group-hover:-translate-y-1">
                    <svg class="w-5 h-5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Clean Premium Subscription Banner -->
    <section class="py-16 md:py-24 relative overflow-hidden bg-blue-600 text-white">
      <!-- Soft Brand Gradient Background -->
      <div class="absolute inset-0 opacity-80">
        <div class="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500 mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div class="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500 mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs md:text-sm mb-4 md:mb-6 border border-white/30">
            <span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse"></span>
            Set & Forget
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">Put your grocery shopping on <span class="text-emerald-300">autopilot.</span></h2>
          <p class="text-blue-50 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            Create custom boxes of your essential items. We'll automatically bill your saved card and deliver them on a schedule that fits your life.
          </p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
            <div class="flex items-center gap-3 md:gap-4 bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/20 backdrop-blur-sm">
              <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/20 flex items-center justify-center shadow-lg"><svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
              <span class="font-bold text-base md:text-lg">Cancel Anytime</span>
            </div>
            <div class="flex items-center gap-3 md:gap-4 bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/20 backdrop-blur-sm">
              <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/20 flex items-center justify-center shadow-lg"><svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
              <span class="font-bold text-base md:text-lg">Free Delivery</span>
            </div>
          </div>
          
          <NuxtLink to="/subscriptions" class="w-full sm:w-auto text-center inline-block bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-slate-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] md:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] md:hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1">
            Explore Plans
          </NuxtLink>
        </div>
        
        <div class="relative animate-fade-in-up animation-delay-400 mt-8 lg:mt-0">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-400/50 to-emerald-400/50 rounded-3xl md:rounded-[3rem] filter blur-xl transform -rotate-6 scale-105 hidden sm:block"></div>
          
          <!-- Floating Mock UI -->
          <div class="bg-white/20 backdrop-blur-xl p-5 md:p-8 rounded-3xl md:rounded-[3rem] border border-white/30 shadow-2xl relative z-10">
            <div class="flex items-center justify-between mb-6 border-b border-white/20 pb-4">
              <div>
                <h3 class="font-black text-xl md:text-2xl">My Weekly Box</h3>
                <p class="text-blue-100 text-sm md:text-base">Renews every Monday</p>
              </div>
              <div class="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            
            <div class="space-y-3 md:space-y-4 relative">
              <div class="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 text-slate-900 shadow-xl hover:-translate-y-1 transition-transform cursor-pointer relative z-30" style="animation: float 6s ease-in-out infinite;">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl">🥛</div>
                <div class="flex-1">
                  <h4 class="font-bold md:font-black text-sm md:text-base">Fresh Milk Gallon</h4>
                  <p class="text-xs md:text-sm font-medium text-slate-500">Qty: 2 • ₦4,500</p>
                </div>
              </div>
              
              <div class="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 text-slate-900 shadow-xl hover:-translate-y-1 transition-transform cursor-pointer relative z-20" style="animation: float 6s ease-in-out infinite 1s;">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl">🍎</div>
                <div class="flex-1">
                  <h4 class="font-bold md:font-black text-sm md:text-base">Organic Apples</h4>
                  <p class="text-xs md:text-sm font-medium text-slate-500">Qty: 1 • ₦3,200</p>
                </div>
              </div>

              <div class="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 text-slate-900 shadow-xl hover:-translate-y-1 transition-transform cursor-pointer relative z-10" style="animation: float 6s ease-in-out infinite 2s;">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl">🍞</div>
                <div class="flex-1">
                  <h4 class="font-bold md:font-black text-sm md:text-base">Whole Wheat Bread</h4>
                  <p class="text-xs md:text-sm font-medium text-slate-500">Qty: 2 • ₦1,800</p>
                </div>
              </div>
            </div>
            
            <div class="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/20 flex justify-between items-end">
              <span class="text-blue-100 font-medium text-sm md:text-base">Total Billed</span>
              <span class="text-xl md:text-3xl font-black text-white">₦9,500</span>
            </div>
          </div>
        </div>
      </div>
    </section>
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
  await getProducts({ limit: 8, trending: true });
});
</script>

<style scoped>
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes pan {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-2000 { animation-delay: 2000ms; }
.animation-delay-4000 { animation-delay: 4000ms; }
</style>
