<template>
  <div class="bg-[#F9F6F0] min-h-screen pb-24 font-sans relative">
    
    <!-- Decorative background element -->
    <div class="absolute top-0 right-0 w-1/3 h-[700px] hidden lg:block z-0 rounded-bl-[100px] bg-[#FFCD42]"></div>

    <div class="pt-6 md:pt-10 max-w-7xl mx-auto px-6 relative z-10">
      <div class="mb-8">
        <NuxtLink to="/products" class="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2 w-fit transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Menu
        </NuxtLink>
      </div>

      <div v-if="loading" class="animate-pulse flex flex-col md:flex-row gap-12 md:gap-20">
        <div class="w-full md:w-1/2 h-[500px] bg-slate-200/50 rounded-3xl"></div>
        <div class="w-full md:w-1/2 space-y-6 pt-12">
          <div class="h-12 bg-slate-200/50 rounded w-3/4"></div>
          <div class="h-8 bg-slate-200/50 rounded w-1/4"></div>
          <div class="h-24 bg-slate-200/50 rounded w-full"></div>
          <div class="h-12 bg-slate-200/50 rounded w-1/3 mt-8"></div>
        </div>
      </div>

      <div v-else-if="product" class="flex flex-col md:flex-row gap-12 md:gap-20 lg:gap-20">
        <!-- Product Image (Hero style with Carousel) -->
        <div class="w-full md:w-1/2 flex flex-col items-center justify-center relative min-h-[400px] md:min-h-[600px]">
          <div 
            class="relative w-full max-w-[500px] mx-auto z-10 group cursor-crosshair"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
          >
            <!-- Background glow behind bottle -->
            <div class="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-75 transform -z-10"></div>
            
            <div 
              class="w-full h-full transition-transform duration-200 ease-out flex items-center justify-center mix-blend-multiply filter drop-shadow-2xl"
              :style="zoomStyle"
            >
              <img :src="carouselImages[currentImageIndex]" :alt="product.name" class="w-[85%] h-auto object-contain animate-float" />
            </div>

            <!-- Carousel Navigation Arrows -->
            <button v-if="carouselImages.length > 1" @click.stop="prevImage" class="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-slate-800 z-20">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button v-if="carouselImages.length > 1" @click.stop="nextImage" class="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-slate-800 z-20">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          
          <!-- Carousel Dots -->
          <div v-if="carouselImages.length > 1" class="flex items-center gap-2 mt-6">
            <button v-for="(img, idx) in carouselImages" :key="idx" @click="currentImageIndex = idx" :class="['w-2.5 h-2.5 rounded-full transition-all', currentImageIndex === idx ? 'bg-slate-800 scale-125' : 'bg-slate-300 hover:bg-slate-400']"></button>
          </div>
        </div>
        
        <!-- Product Details -->
        <div class="w-full md:w-1/2 flex flex-col justify-center pt-8 md:pt-0">
          <div class="flex items-center justify-between mb-4">
            <div class="text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-full bg-white/50">
              {{ product.category || 'Blend' }}
            </div>
            <button @click="toggleFavorite" class="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm text-slate-300 hover:text-rose-500 transition-colors" :title="isFavorite ? 'Remove from Favorites' : 'Add to Favorites'">
              <svg class="w-5 h-5" :class="{ 'text-rose-500 fill-rose-500': isFavorite }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          <h1 class="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-[1.1]" >
            {{ product.name }}
          </h1>
          
          <div class="text-xl md:text-3xl font-black text-slate-800 mb-6 flex items-end gap-3">
            ₦{{ product.price?.toLocaleString() }}
            <span class="text-xl text-slate-400 font-medium line-through mb-1">₦{{ (product.price * 1.2).toLocaleString() }}</span>
          </div>
          
          <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg font-medium">
            {{ product.description }}
          </p>
          
          <div v-if="product.stock <= 0" class="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-bold">
            Out of Stock
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center gap-4 mb-12">
            <!-- Quantity Selector -->
            <div class="flex items-center border border-slate-300 rounded-xl bg-white shadow-sm overflow-hidden h-14" :class="{ 'opacity-50 pointer-events-none': product.stock <= 0 }">
              <button @click="quantity > 1 ? quantity-- : null" class="w-14 h-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-medium text-2xl transition-colors">-</button>
              <span class="w-12 text-center font-bold text-slate-900 text-lg">{{ quantity }}</span>
              <button @click="quantity++" class="w-14 h-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-medium text-xl transition-colors">+</button>
            </div>
            
            <!-- Add to Cart Button (Refined) -->
            <button @click="handleAddToCart" :disabled="product.stock <= 0" class="h-14 px-8 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0">
              <span>{{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}</span>
              <span v-if="product.stock > 0" class="w-1 h-1 rounded-full bg-slate-600"></span>
              <span v-if="product.stock > 0" class="text-slate-300 text-sm">₦{{ (product.price * quantity).toLocaleString() }}</span>
            </button>
          </div>

          <!-- Ingredients & Allergens -->
          <div class="space-y-6">
            <div v-if="product.ingredients && product.ingredients.length > 0">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">Made With</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="ingredient in product.ingredients" :key="ingredient" class="bg-white/60 border border-slate-200 text-slate-700 px-5 md:px-8 py-2 rounded-lg text-sm font-semibold shadow-sm backdrop-blur-sm">
                  {{ ingredient }}
                </span>
              </div>
            </div>

            <div v-if="product.allergens && product.allergens.length > 0" class="bg-rose-50/50 border border-rose-100 rounded-xl p-4 max-w-lg">
              <h3 class="text-xs font-bold text-rose-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
                Contains Allergens
              </h3>
              <p class="text-sm font-medium text-rose-700">{{ product.allergens.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Redesigned Nutrition Facts -->
      <!-- <div v-if="product && product.nutritionalInfo" class="mt-20 max-w-4xl">
        <div class="flex items-end justify-between border-b border-slate-200 pb-4 mb-8">
          <h2 class="text-xl md:text-3xl font-black text-slate-900">Nutrition Profile</h2>
          <p class="text-sm font-bold text-slate-500 uppercase tracking-wider">Per {{ product.nutritionalInfo.servingSize || '450ml' }}</p>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          <div class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div class="text-xl md:text-3xl font-black text-slate-800 mb-1 group-hover:scale-110 transition-transform">{{ product.nutritionalInfo.calories }}</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Calories</div>
          </div>
          
          <div class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div class="absolute bottom-0 left-0 w-full h-1 bg-blue-400"></div>
            <div class="text-xl md:text-3xl font-black text-slate-800 mb-1 group-hover:scale-110 transition-transform">{{ product.nutritionalInfo.protein }}g</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Protein</div>
          </div>
          
          <div class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
             <div class="absolute bottom-0 left-0 w-full h-1 bg-amber-400"></div>
            <div class="text-xl md:text-3xl font-black text-slate-800 mb-1 group-hover:scale-110 transition-transform">{{ product.nutritionalInfo.carbs }}g</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Carbs</div>
          </div>
          
          <div class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
             <div class="absolute bottom-0 left-0 w-full h-1 bg-rose-400"></div>
            <div class="text-xl md:text-3xl font-black text-slate-800 mb-1 group-hover:scale-110 transition-transform">{{ product.nutritionalInfo.fat }}g</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Fat</div>
          </div>
          
          <div class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
             <div class="absolute bottom-0 left-0 w-full h-1 bg-emerald-400"></div>
            <div class="text-xl md:text-3xl font-black text-slate-800 mb-1 group-hover:scale-110 transition-transform">{{ product.nutritionalInfo.fiber }}g</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Fiber</div>
          </div>
          
          <div class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
             <div class="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            <div class="text-xl md:text-3xl font-black text-slate-800 mb-1 group-hover:scale-110 transition-transform">{{ product.nutritionalInfo.sugar }}g</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Sugar</div>
          </div>
        </div>
      </div> -->

      <div v-if="!loading && !product" class="text-center py-24">
        <h2 class="text-xl md:text-3xl font-black text-slate-900 mb-4">Product Not Found</h2>
        <p class="text-slate-500 mb-8 font-medium">The blend you're looking for might have been removed or doesn't exist.</p>
        <NuxtLink to="/products" class="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors">Return to Menu</NuxtLink>
      </div>

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

const currentImageIndex = ref(0);

// Map specific products to our custom AI generated images
const getHeroImage = (prod: any) => {
  if (!prod) return '';
  const name = prod.name.toLowerCase();
  if (name.includes('orange') || name.includes('citrus')) return '/images/hero_orange.jpg';
  if (name.includes('green') || name.includes('kale') || name.includes('spinach')) return '/images/hero_green.jpg';
  if (name.includes('apple')) return '/images/thumb_apple.jpg';
  if (name.includes('lemon')) return '/images/thumb_lemon.jpg';
  if (name.includes('berry') || name.includes('strawberry') || name.includes('acai')) return '/images/thumb_apple.jpg'; // Fallback to apple (red)
  
  return prod.imageUrl || '/images/hero_orange.jpg'; // Fallback
};

const carouselImages = computed(() => {
  if (product.value?.images && product.value.images.length > 0) {
    return product.value.images;
  } else if (product.value?.imageUrl) {
    return [getHeroImage(product.value)]; // Fallback
  }
  return ['/images/hero_orange.jpg'];
});

const nextImage = () => {
  if (currentImageIndex.value < carouselImages.value.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = carouselImages.value.length - 1;
  }
};



// Zoom logic for the hero image
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
  return `transform: scale(1.3); transform-origin: ${mouseX.value}% ${mouseY.value}%;`;
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
    
    useSeoMeta({
      title: `${product.value.name} - Lapadia Fresh`,
      description: product.value.description,
      ogTitle: `${product.value.name} - Lapadia Fresh`,
      ogDescription: product.value.description,
      ogImage: getHeroImage(product.value),
      twitterTitle: `${product.value.name} - Lapadia Fresh`,
      twitterDescription: product.value.description,
      twitterImage: getHeroImage(product.value)
    });
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

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
