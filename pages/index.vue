<template>
  <div class="bg-[#F9F6F0] min-h-screen overflow-hidden font-sans relative">
    
    <!-- Dynamic Split Background -->
    <div class="absolute top-0 right-0 w-1/3 h-[900px] hidden lg:block z-0 rounded-bl-[100px] transition-colors duration-1000" :style="{ backgroundColor: activeColor }"></div>

    <!-- Hero Section -->
    <section class="relative pt-24 lg:pt-32 pb-20 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-20 z-10 min-h-[800px]">
      
      <div v-if="activeProduct" class="flex flex-col lg:flex-row items-center justify-between">
        
        <!-- Left Content -->
        <div class="w-full lg:w-1/2 pr-0 lg:pr-12 relative z-20">
          
          <!-- Dynamic Category Pills -->
          <div class="flex flex-wrap gap-3 mb-8 animate-fade-in-up">
            <button 
              v-for="cat in uniqueCategories" 
              :key="cat"
              :class="['px-5 py-2 rounded-lg font-semibold text-sm transition-colors', activeProduct.category === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-white/60 border border-slate-200 text-slate-600 hover:bg-white' ]"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Main Typography & Info with Transitions -->
          <div class="min-h-[220px]">
            <transition name="slide-up" mode="out-in">
              <div :key="activeProduct._id || activeProduct.id">
                <h1 class="text-2xl md:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]" >
                  {{ activeProduct.name }}
                </h1>
                
                <p class="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium line-clamp-4">
                  {{ activeProduct.description }}
                </p>
                
                <!-- Price & CTA -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-12">
                  <div class="text-2xl md:text-4xl font-black text-slate-800">
                    ₦{{ activeProduct.price?.toLocaleString() }} 
                    <span class="text-2xl text-slate-400 font-medium line-through ml-2">₦{{ (activeProduct.price * 1.2).toLocaleString() }}</span>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <button @click.prevent="addToCart(activeProduct, 1)" class="px-6 py-3 border-2 border-slate-900 rounded-xl font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-2">
                      Add to cart
                    </button>
                    <NuxtLink :to="`/products/${activeProduct._id || activeProduct.id}`" class="px-6 py-3 rounded-xl font-bold text-slate-900 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all flex items-center gap-2" :style="{ backgroundColor: activeColor, boxShadow: `0 10px 15px -3px ${activeColor}40` }">
                      Buy Now
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- You Might Also Like -->
          <div>
            <h3 class="text-lg font-bold text-slate-800 mb-4 italic">You might also like:</h3>
            <transition-group name="list" tag="div" class="flex flex-wrap gap-4 relative">
              <NuxtLink 
                v-for="suggested in suggestedProducts" 
                :key="suggested._id || suggested.id"
                :to="`/products/${suggested._id || suggested.id}`" 
                class="flex items-center gap-4 bg-white/70 backdrop-blur-md p-3 pr-8 rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group w-full sm:w-auto"
              >
                <div class="w-16 h-20 bg-white rounded-xl overflow-hidden shadow-inner flex-shrink-0 relative mix-blend-multiply">
                  <img :src="getHeroImage(suggested)" :alt="suggested.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 leading-tight w-24 truncate">{{ suggested.name }}</h4>
                  <div class="text-xs text-slate-500 mt-1 mb-1">250ml</div>
                  <div class="font-black text-slate-900">₦{{ suggested.price?.toLocaleString() }}</div>
                </div>
                <button @click.prevent="toggleFav(suggested._id || suggested.id)" class="absolute top-3 right-3 text-slate-300 hover:text-rose-500 transition-colors z-10">
                   <svg class="w-5 h-5" :class="{ 'text-rose-500 fill-rose-500': checkFavorite(suggested._id || suggested.id) }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </NuxtLink>
            </transition-group>
          </div>
          
          <!-- Carousel Indicators -->
          <div class="flex gap-2 mt-8">
            <button 
              v-for="(_, index) in heroProducts" 
              :key="index"
              @click="setActiveIndex(index)"
              class="h-2 rounded-full transition-all duration-500"
              :class="activeIndex === index ? 'w-10 bg-slate-900' : 'w-2 bg-slate-300 hover:bg-slate-400'"
            ></button>
          </div>
        </div>
        
        <!-- Right Image (Hero Bottle) -->
        <div class="w-full lg:w-1/2 relative mt-16 lg:mt-0 z-10 flex justify-center lg:justify-end min-h-[500px]">
          <div class="relative w-[100%] max-w-[650px] flex justify-center">
            <img 
              v-for="(product, index) in heroProducts"
              :key="'img-'+(product._id || product.id)"
              :src="getHeroImage(product)" 
              :alt="product.name" 
              class="absolute top-0 left-0 w-full h-full object-contain mix-blend-multiply filter drop-shadow-2xl animate-float transition-opacity duration-700 ease-in-out"
              :class="activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
            />
            <!-- Placeholder to maintain correct height -->
            <img 
              v-if="heroProducts.length > 0"
              :src="getHeroImage(heroProducts[0])" 
              class="w-full h-auto object-contain opacity-0 pointer-events-none" 
              alt="placeholder" 
            />
          </div>
          
          <!-- Small text callout -->
          <div class="absolute bottom-10 -left-10 lg:left-0 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-xl max-w-[220px] hidden md:block">
            <p class="text-sm font-bold text-slate-800 leading-tight">
              Freshly Blended From The Choicest Fruits. No Preservatives, Just Pure Nature.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- Explore Products Section -->
    <section class="py-24 bg-white relative z-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.03)] mt-12">
      <div class="max-w-[1400px] mx-auto px-5 md:px-4 md:px-12 lg:px-20">
        <div class="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div>
            <div class="text-[#FFCD42] font-black tracking-wider uppercase text-sm mb-2">Our Menu</div>
            <h2 class="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Trending Blends</h2>
          </div>
          <NuxtLink to="/products" class="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
            View Full Menu
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <template v-if="loading">
            <div class="bg-slate-50 rounded-3xl p-4 animate-pulse" v-for="i in 4" :key="i">
              <div class="w-full h-48 bg-slate-200 rounded-2xl mb-4"></div>
              <div class="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
              <div class="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
              <div class="flex justify-between items-center">
                <div class="h-6 bg-slate-200 rounded w-1/4"></div>
                <div class="w-10 h-10 bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          </template>
          
          <template v-else-if="products && products.length > 0">
            <div 
              class="bg-slate-50 rounded-3xl p-4 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative flex flex-col" 
              v-for="product in products" 
              :key="product._id || product.id"
            >
              <button @click.prevent="toggleFav(product._id || product.id)" class="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-sm text-slate-300 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all">
                <svg class="w-5 h-5" :class="{ 'text-rose-500 fill-rose-500': checkFavorite(product._id || product.id) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <NuxtLink :to="`/products/${product._id || product.id}`" class="block">
                <div class="relative w-full h-48 bg-white rounded-2xl mb-5 overflow-hidden flex items-center justify-center text-3xl md:text-5xl group-hover:scale-95 transition-transform duration-500 shadow-sm border border-slate-100 mix-blend-multiply">
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
          </template>
        </div>
      </div>
    </section>

    <!-- Welcome Modal -->
    <WelcomeSubscriptionModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useGetProducts } from '~/composables/modules/products/useGetProducts';
import { useCart } from '~/composables/modules/cart/useCart';
import { useFavorites } from '~/composables/modules/favorites/useFavorites';
import WelcomeSubscriptionModal from '~/components/WelcomeSubscriptionModal.vue';

const { loading, error, products, getProducts } = useGetProducts();
const { addToCart } = useCart();
const { toggleFavorite: toggleFav, isFavorite: checkFavorite } = useFavorites();

useSeoMeta({
  title: 'Lapadia Fresh - Groceries Delivered in Minutes',
  description: 'Shop fresh fruits, vegetables, and daily essentials with Lapadia Fresh. Lightning-fast delivery right to your door.',
  ogTitle: 'Lapadia Fresh - Groceries Delivered in Minutes',
  ogDescription: 'Shop fresh fruits, vegetables, and daily essentials with Lapadia Fresh. Lightning-fast delivery right to your door.'
});

// Carousel State
const activeIndex = ref(0);
let carouselInterval: any = null;

import heroData from '~/data/hero-products.json';

// Product subsets
const heroProducts = ref(heroData);

const activeProduct = computed(() => {
  if (!heroProducts.value.length) return null;
  return heroProducts.value[activeIndex.value];
});

const suggestedProducts = computed(() => {
  if (!heroProducts.value.length) return [];
  // Get other products not currently active
  return heroProducts.value.filter((_, idx) => idx !== activeIndex.value).slice(0, 2);
});

// Extract unique categories for pills
const uniqueCategories = computed(() => {
  if (!products.value) return [];
  const cats = new Set(products.value.map(p => p.category).filter(Boolean));
  // Add some fallback mock ones if backend only has 1-2 categories for now
  if (cats.size < 4) {
    ['Smoothies', 'Juices', 'Detox', 'Fruits', 'Melon'].forEach(c => cats.add(c));
  }
  return Array.from(cats).slice(0, 6); // Max 6 pills
});

// Dynamic Colors for the split background
const colors = ['#FFCD42', '#a7f3d0', '#fbcfe8', '#bfdbfe']; // Yellow, Mint, Pink, Blue
const activeColor = computed(() => {
  return colors[activeIndex.value % colors.length];
});

// Map specific products to our custom AI generated images
const getHeroImage = (product: any) => {
  // If the product has a database image URL, prioritize it
  if (product.imageUrl) return product.imageUrl;
  
  const name = product.name.toLowerCase();
  if (name.includes('orange') || name.includes('citrus')) return '/images/hero_orange.jpg';
  if (name.includes('green') || name.includes('kale') || name.includes('spinach')) return '/images/hero_green.jpg';
  if (name.includes('apple')) return '/images/thumb_apple.jpg';
  if (name.includes('lemon')) return '/images/thumb_lemon.jpg';
  if (name.includes('berry') || name.includes('strawberry') || name.includes('acai')) return '/images/thumb_apple.jpg';
  
  return '/images/hero_orange.jpg'; // Ultimate Fallback
};

// Carousel Controls
const setActiveIndex = (index: number) => {
  activeIndex.value = index;
  resetInterval();
};

const nextSlide = () => {
  if (!heroProducts.value.length) return;
  activeIndex.value = (activeIndex.value + 1) % heroProducts.value.length;
};

const resetInterval = () => {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
};

onMounted(async () => {
  await getProducts({ limit: 12, trending: true });
  resetInterval();
});

onUnmounted(() => {
  if (carouselInterval) clearInterval(carouselInterval);
});
</script>

<style scoped>
/* Vue Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

/* Animations */
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-1000 { animation-delay: 1000ms; }
</style>
