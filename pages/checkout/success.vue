<template>
  <div class="py-6 md:py-10 pb-16 max-w-2xl mx-auto px-4 min-h-screen">
    <div v-if="loading" class="bg-white p-4 md:p-8 rounded-3xl border border-slate-100 shadow-xl flex flex-col items-center justify-center text-center animate-pulse">
      <div class="w-24 h-24 bg-slate-200 rounded-full mb-6"></div>
      <div class="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
      <div class="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-slate-200 rounded w-2/4"></div>
    </div>
    
    <div v-else-if="success" class="bg-white p-12 rounded-3xl border border-slate-100 shadow-xl text-center">
      <div class="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
        <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Payment Successful!</h1>
      <p class="text-lg text-slate-500 mb-8">Your order has been confirmed and is now being processed. You will receive an email confirmation shortly.</p>
      <NuxtLink to="/products" class="inline-block px-4 md:px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-slate-800 transition-colors">
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-else class="bg-white p-12 rounded-3xl border border-rose-100 shadow-xl text-center">
      <div class="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
        <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">Payment Verification Failed</h1>
      <p class="text-slate-500 mb-8">We could not verify your payment. If you were charged, please contact support.</p>
      <NuxtLink to="/cart" class="inline-block px-4 md:px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-slate-800 transition-colors">
        Return to Cart
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '~/composables/modules/cart/useCart';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const route = useRoute();
const router = useRouter();
const { clearCart } = useCart();

const loading = ref(true);
const success = ref(false);

onMounted(async () => {
  const reference = route.query.reference;
  const trxref = route.query.trxref; // Paystack returns this too

  if (!reference && !trxref) {
    loading.value = false;
    return;
  }

  try {
    const res = await GATEWAY_ENDPOINT.get(`/orders/verify?reference=${reference || trxref}`);
    if (res.data.success) {
      success.value = true;
      clearCart();
    }
  } catch (error) {
    console.error('Verification failed', error);
  } finally {
    loading.value = false;
  }
});
</script>
