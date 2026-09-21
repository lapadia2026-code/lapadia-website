<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Modal Content -->
    <div class="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all animate-modal-enter">
      <!-- Close Button -->
      <button 
        @click="closeModal" 
        class="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white shadow-sm transition-all"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Left Side: Welcome Graphic -->
      <div class="hidden md:flex md:w-5/12 bg-emerald-600 relative overflow-hidden items-center justify-center p-8 text-center text-white">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-800 opacity-90"></div>
        <img src="/img/auth-bg.jpg" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" />
        
        <div class="relative z-10 space-y-6">
          <div class="rounded-2xl mx-auto flex items-center justify-center text-emerald-600 text-3xl font-black shadow-xl">
            <img src="@/assets/img/logo.jpg" class="h-20 w-auto rounded-full" />
          </div>
          <div>
            <h2 class="text-3xl font-black tracking-tight mb-3" v-html="welcomeModalConfig.title || 'Welcome to Lapadia<span class=\'text-emerald-200\'>Fresh</span>'"></h2>
            <p class="text-emerald-50 text-lg font-medium leading-relaxed">{{ welcomeModalConfig.subtitle || 'Elevate your healthy lifestyle with our premium fruit subscriptions. Freshness delivered exactly when you need it.' }}</p>
          </div>
        </div>
      </div>

      <!-- Right Side: Carousel -->
      <div class="w-full md:w-7/12 p-6 md:p-8 flex flex-col relative bg-slate-50">
        <div class="text-center mb-6">
          <h3 class="text-xl md:text-2xl font-black text-slate-900">{{ welcomeModalConfig.carouselTitle || 'Explore Our Subscriptions' }}</h3>
          <p class="text-sm text-slate-500 font-medium mt-1">{{ welcomeModalConfig.carouselSubtitle || 'Swipe to see what\'s trending' }}</p>
        </div>

        <div v-if="loading" class="flex-1 flex items-center justify-center min-h-[300px]">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
        </div>

        <div v-else-if="plans.length === 0" class="flex-1 flex flex-col items-center justify-center text-center min-h-[300px]">
          <span class="text-4xl mb-4">📦</span>
          <p class="text-slate-500 font-medium">No active subscriptions available right now.</p>
        </div>

        <div v-else class="relative flex-1 flex items-center min-h-[300px]">
          <!-- Prev Button -->
          <button 
            @click="prevSlide" 
            class="absolute left-0 z-10 -ml-3 w-10 h-10 bg-white border border-slate-100 rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-all focus:outline-none"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Carousel Container -->
          <div class="w-full overflow-hidden px-4">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div 
                v-for="plan in plans" 
                :key="plan._id"
                class="w-full flex-shrink-0 px-2"
              >
                <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full flex flex-col">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <span v-if="plan.isPopular" class="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-md mb-2">Most Popular</span>
                      <h4 class="text-lg font-bold text-slate-900">{{ plan.name }}</h4>
                    </div>
                    <div class="text-right">
                      <div class="text-xl font-black text-slate-900">₦{{ plan.price?.toLocaleString() }}</div>
                      <div v-if="plan.frequency" class="text-xs font-medium text-slate-500">/ {{ plan.frequency }}</div>
                    </div>
                  </div>
                  
                  <p class="text-sm text-slate-600 mb-6 line-clamp-3">{{ plan.description }}</p>

                  <div class="mt-auto">
                    <NuxtLink 
                      v-if="plan.frequency"
                      :to="`/checkout?planId=${plan._id || plan.id}`" 
                      class="block w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold rounded-xl transition-colors shadow-lg shadow-emerald-600/30 active:scale-95"
                    >
                      Subscribe Now
                    </NuxtLink>
                    <NuxtLink 
                      v-else
                      :to="`/products/${plan._id || plan.id}`" 
                      class="block w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-center font-bold rounded-xl transition-colors shadow-lg shadow-slate-900/30 active:scale-95"
                    >
                      View Product
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <button 
            @click="nextSlide" 
            class="absolute right-0 z-10 -mr-3 w-10 h-10 bg-white border border-slate-100 rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-all focus:outline-none"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Carousel Indicators -->
        <div v-if="plans.length > 1" class="flex justify-center gap-2 mt-6">
          <button 
            v-for="(_, index) in plans" 
            :key="index"
            @click="currentIndex = index"
            class="h-2 rounded-full transition-all duration-300 focus:outline-none"
            :class="currentIndex === index ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-300 hover:bg-slate-400'"
          ></button>
        </div>

      </div>
    </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';
import { useSettings } from '~/composables/modules/settings/useSettings';

const { settings, getSettings } = useSettings();
const welcomeModalConfig = computed(() => settings.value?.welcomeModalConfig || {});

const isOpen = ref(false);
const plans = ref<any[]>([]);
const loading = ref(true);
const currentIndex = ref(0);

onMounted(async () => {
  // Check if user has already seen the modal this session
  const hasSeen = localStorage.getItem('hasSeenWelcomeModal');
  
  if (!hasSeen) {
    // Small delay before showing modal
    setTimeout(async () => {
      isOpen.value = true;
      await getSettings();
      await fetchPlans();
      localStorage.setItem('hasSeenWelcomeModal', 'true');
    }, 2500);
  }
});

const fetchPlans = async () => {
  try {
    const [plansRes, productsRes] = await Promise.all([
      GATEWAY_ENDPOINT.get('/subscriptions/plans').catch(() => ({ data: [] })),
      GATEWAY_ENDPOINT.get('/products').catch(() => ({ data: { data: [] } }))
    ]);
    
    const allPlans = plansRes.data || [];
    const allProducts = productsRes.data?.data || productsRes.data || [];
    
    const combined = [...allPlans, ...allProducts];
    
    if (welcomeModalConfig.value.featuredItems && welcomeModalConfig.value.featuredItems.length > 0) {
      plans.value = combined.filter((p: any) => welcomeModalConfig.value.featuredItems.includes(p._id || p.id));
    } else {
      plans.value = allPlans
        .sort((a: any, b: any) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
        .slice(0, 5);
    }
  } catch (error) {
    console.error('Failed to load items for modal:', error);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  isOpen.value = false;
};

const nextSlide = () => {
  if (plans.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % plans.value.length;
};

const prevSlide = () => {
  if (plans.value.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + plans.value.length) % plans.value.length;
};
</script>

<style scoped>
.animate-modal-enter {
  animation: modal-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modal-enter {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
