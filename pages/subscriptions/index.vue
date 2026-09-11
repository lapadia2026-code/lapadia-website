<template>
  <div class="py-6 md:py-10 pb-16 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <div class="mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Never run out of essentials.</h1>
        <p class="text-xl text-slate-500 max-w-2xl mx-auto">Choose a plan that fits your household. We'll automatically deliver your groceries exactly when you need them.</p>
      </div>

      <!-- Dynamic Pricing Plans Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto py-10">
        <div v-for="i in 3" :key="i" class="bg-white rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm flex flex-col h-[500px] animate-pulse">
          <div class="w-24 h-4 bg-slate-200 rounded mb-4"></div>
          <div class="w-48 h-10 bg-slate-200 rounded mb-6"></div>
          <div class="w-full h-16 bg-slate-200 rounded mb-8"></div>
          <div class="space-y-4 flex-1">
            <div class="w-full h-4 bg-slate-200 rounded"></div>
            <div class="w-5/6 h-4 bg-slate-200 rounded"></div>
            <div class="w-4/6 h-4 bg-slate-200 rounded"></div>
          </div>
          <div class="w-full h-14 bg-slate-200 rounded-xl mt-8"></div>
        </div>
      </div>

      <div v-else-if="plans.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto py-10">
        <div 
          v-for="(plan, index) in plans" 
          :key="plan._id" 
          :class="[
            plan.isPopular 
              ? 'bg-slate-900 rounded-3xl p-4 md:p-8 shadow-2xl flex flex-col text-left relative transform md:-translate-y-4' 
              : 'bg-white rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm flex flex-col text-left'
          ]"
        >
          <div v-if="plan.isPopular" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
            Most Popular
          </div>
          
          <div class="mb-8">
            <span :class="[plan.isPopular ? 'text-blue-400' : 'text-blue-600', 'font-bold tracking-wider uppercase text-sm mb-2 block']">{{ plan.name }}</span>
            <div class="flex items-baseline gap-1">
              <span :class="[plan.isPopular ? 'text-white' : 'text-slate-900', 'text-4xl font-extrabold tracking-tight']">₦{{ plan.price?.toLocaleString() }}</span>
              <span :class="[plan.isPopular ? 'text-slate-400' : 'text-slate-500', 'font-medium lowercase']">/{{ plan.frequency }}</span>
            </div>
            <p :class="[plan.isPopular ? 'text-slate-400' : 'text-slate-500', 'mt-4 text-sm leading-relaxed']">{{ plan.description }}</p>
          </div>

          <!-- Linked Products -->
          <div v-if="getLinkedProducts(plan).length > 0" class="mb-6 relative">
            <p :class="[plan.isPopular ? 'text-slate-500' : 'text-slate-400', 'text-xs font-bold uppercase tracking-wider mb-3']">What's Included</p>
            <div class="space-y-2 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
              <div 
                v-for="prod in getLinkedProducts(plan)" 
                :key="prod._id"
                :class="[
                  'flex items-center gap-3 p-2 rounded-xl border',
                  plan.isPopular ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'
                ]"
              >
                <img 
                  v-if="prod.images?.[0]" 
                  :src="prod.images[0]" 
                  :alt="prod.name"
                  class="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div v-else :class="['w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', plan.isPopular ? 'bg-white/10' : 'bg-slate-200']">
                  <span class="text-lg">🍹</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div :class="[plan.isPopular ? 'text-white' : 'text-slate-800', 'text-sm font-semibold truncate']">{{ prod.name }}</div>
                  <div :class="[plan.isPopular ? 'text-slate-400' : 'text-slate-400', 'text-xs']">₦{{ prod.price?.toLocaleString() }}</div>
                </div>
              </div>
            </div>
            <!-- Fade out effect at the bottom for long lists -->
            <div v-if="getLinkedProducts(plan).length > 3" :class="[plan.isPopular ? 'from-slate-900' : 'from-white', 'absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t to-transparent pointer-events-none']"></div>
          </div>
          
          <ul class="space-y-4 mb-8 flex-1">
            <li v-for="(feature, fIndex) in plan.features" :key="fIndex" class="flex items-start gap-3" :class="plan.isPopular ? 'text-slate-300' : 'text-slate-700'">
              <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
          
          <button @click="selectPlan(plan)" :class="[
            plan.isPopular 
              ? 'w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50' 
              : 'w-full py-4 rounded-xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-colors'
          ]">
            Select Plan
          </button>
        </div>
      </div>
      
      <div v-else class="text-center py-24 bg-white rounded-3xl border border-slate-100 max-w-3xl mx-auto shadow-sm">
        <div class="text-6xl mb-6">📦</div>
        <h3 class="text-2xl font-bold text-slate-900 mb-2">No Plans Available</h3>
        <p class="text-slate-500">We're currently updating our subscription offerings. Check back soon!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const router = useRouter();
const plans = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get('/subscriptions/plans');
    plans.value = res.data;
  } catch (error) {
    console.error('Failed to load subscription plans:', error);
  } finally {
    loading.value = false;
  }
});

const getLinkedProducts = (plan: any) => {
  // Prefer new productIds array, fallback to legacy single productId
  if (plan.productIds && plan.productIds.length > 0) {
    return plan.productIds.filter((p: any) => p && p._id);
  }
  if (plan.productId && plan.productId._id) {
    return [plan.productId];
  }
  return [];
};

const selectPlan = (plan: any) => {
  router.push(`/checkout?planId=${plan._id}`);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
.bg-slate-900 .custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-700;
}
</style>
