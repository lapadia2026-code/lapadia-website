<template>
  <div class="py-6 md:py-10 pb-16 max-w-7xl mx-auto px-4">
    <div class="mb-10">
      <NuxtLink to="/cart" class="text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-2 w-fit mb-4 transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Cart
      </NuxtLink>
      <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Secure Checkout</h1>
      <p class="text-slate-500 mt-2 font-medium">Complete your details below to place your order.</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
      <!-- Checkout Form -->
      <form @submit.prevent="handleCheckout" class="lg:col-span-2 space-y-8">
        
        <!-- Login Prompt if Not Authenticated (removed, using modal instead) -->

        <!-- Delivery Details -->
        <section class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">1</span>
            Delivery Details
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Full Name</label>
              <input v-model="orderData.fullName" required type="text" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="John Doe" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Email Address</label>
              <input v-model="orderData.email" required type="email" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="john@example.com" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Phone Number <span class="text-rose-500">*</span></label>
              <div class="flex gap-2 relative z-20">
                <CountryCodeSelect v-model="orderData.phoneCode" class="w-32" />
                <input v-model="orderData.phone" required type="tel" class="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="800 000 0000" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Alternative Phone Number <span class="text-slate-400 font-normal">(WhatsApp)</span></label>
              <div class="flex gap-2 relative z-10">
                <CountryCodeSelect v-model="orderData.altPhoneCode" class="w-32" />
                <input v-model="orderData.altPhone" type="tel" class="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="800 000 0000" />
              </div>
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="text-sm font-bold text-slate-700">Delivery Address <span class="text-rose-500">*</span></label>
              <textarea v-model="orderData.deliveryAddress" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium resize-none" rows="3" placeholder="Enter your full delivery address..."></textarea>
            </div>
            
            <div class="md:col-span-2">
              <label class="flex items-start gap-3 cursor-pointer group bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                <input v-model="orderData.saveDeliveryOptions" type="checkbox" class="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300" />
                <div>
                  <span class="block text-sm font-bold text-slate-800">Save delivery details for future use</span>
                  <span class="block text-xs text-slate-500 mt-1 font-medium">We'll auto-fill these details next time you shop.</span>
                </div>
              </label>
            </div>
          </div>
        </section>

        <!-- Delivery Time Flexibility -->
        <section class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
            Delivery Options
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label :class="['relative flex flex-col p-6 rounded-2xl cursor-pointer transition-all border-2', orderData.deliveryTime === 'standard' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-200 bg-white']">
              <input v-model="orderData.deliveryTime" value="standard" type="radio" name="delivery_time" class="absolute right-5 top-5 text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" />
              <span class="font-extrabold text-slate-900 mb-1 text-lg">Standard Delivery</span>
              <span class="text-sm text-slate-500 font-medium">Delivered within 24-48 hours</span>
              <span class="mt-4 text-sm font-bold text-emerald-600 bg-emerald-100 w-fit px-3 py-1 rounded-md">Free</span>
            </label>
            <label :class="['relative flex flex-col p-6 rounded-2xl cursor-pointer transition-all border-2', orderData.deliveryTime === 'express' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-200 bg-white']">
              <input v-model="orderData.deliveryTime" value="express" type="radio" name="delivery_time" class="absolute right-5 top-5 text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" />
              <span class="font-extrabold text-slate-900 mb-1 text-lg">Express Delivery</span>
              <span class="text-sm text-slate-500 font-medium">Delivered within 2 hours</span>
              <span class="mt-4 text-sm font-bold text-slate-700 bg-slate-100 w-fit px-3 py-1 rounded-md">+₦{{ settings.expressDeliveryFee?.toLocaleString() || '1,500' }}</span>
            </label>
          </div>
        </section>

        <!-- Payment Method -->
        <section class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">3</span>
            Secure Payment
          </h2>
          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-slate-600 font-medium">You will be securely redirected to Paystack to complete your payment.</p>
              <!-- Paystack logo placeholder / cards -->
              <div class="flex items-center gap-2">
                <div class="w-10 h-6 bg-slate-200 rounded shadow-sm"></div>
                <div class="w-10 h-6 bg-slate-200 rounded shadow-sm"></div>
              </div>
            </div>
            
            <!-- Tokenization / Subscription Opt-In -->
            <label v-if="!route.query.planId" class="flex items-start gap-3 mt-6 cursor-pointer group bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
              <input v-model="orderData.isSubscription" type="checkbox" class="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300" />
              <div>
                <span class="block text-sm font-bold text-slate-800">Make this a recurring subscription</span>
                <span class="block text-xs text-slate-500 mt-1 font-medium">Get these exact items delivered on a schedule.</span>
              </div>
            </label>

            <div v-if="orderData.isSubscription && !route.query.planId" class="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 relative">
              <label class="text-sm font-bold text-slate-800 block mb-2">How often?</label>
              
              <!-- Custom Dropdown -->
              <div class="relative">
                <button 
                  type="button"
                  @click="isFrequencyDropdownOpen = !isFrequencyDropdownOpen" 
                  class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                >
                  <span class="font-medium text-slate-700 capitalize">{{ orderData.subscriptionFrequency }}</span>
                  <svg :class="['w-5 h-5 text-slate-400 transition-transform', isFrequencyDropdownOpen ? 'rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div v-if="isFrequencyDropdownOpen" class="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl py-2 overflow-hidden">
                  <button type="button" @click="orderData.subscriptionFrequency = 'weekly'; isFrequencyDropdownOpen = false" class="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <span class="font-medium text-slate-700">Weekly</span>
                    <svg v-if="orderData.subscriptionFrequency === 'weekly'" class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </button>
                  <button type="button" @click="orderData.subscriptionFrequency = 'monthly'; isFrequencyDropdownOpen = false" class="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <span class="font-medium text-slate-700">Monthly</span>
                    <svg v-if="orderData.subscriptionFrequency === 'monthly'" class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <label class="flex items-start gap-3 mt-6 cursor-pointer group bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
              <input v-model="orderData.saveCard" type="checkbox" class="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300" />
              <div>
                <span class="block text-sm font-bold text-slate-800">Save my card for future purchases</span>
                <span class="block text-xs text-slate-500 mt-1 font-medium">Required if you want to turn this order into a recurring subscription later.</span>
              </div>
            </label>
          </div>
          
          <button type="submit" :disabled="loading || (!isSubscriptionCheckout && cart.length === 0 && !route.query.planId) || !isFormValid" class="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black py-4 px-6 rounded-xl transition-all shadow-xl hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 text-lg">
            <span v-if="loading" class="w-6 h-6 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span>
            <span v-if="loading">Processing Order...</span>
            <span v-else>Pay ₦{{ finalTotal.toLocaleString() }}</span>
            <svg v-if="!loading" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </section>
      </form>

      <!-- Order Summary Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
          <h3 class="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Order Summary</h3>
          
          <div v-if="!isSubscriptionCheckout && cart.length === 0" class="text-center py-8">
            <div class="text-4xl mb-4">🛒</div>
            <p class="text-slate-500 font-medium">Your cart is empty.</p>
            <NuxtLink to="/products" class="text-emerald-600 hover:text-emerald-500 font-bold mt-4 inline-block">Browse Products</NuxtLink>
          </div>
          
          <div v-else-if="route.query.planId && subscriptionPlan">
            <div class="mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-sm flex-shrink-0 text-2xl">
                  🔁
                </div>
                <div>
                  <span class="text-sm font-bold text-slate-800 block truncate w-32" :title="subscriptionPlan.name">{{ subscriptionPlan.name }}</span>
                  <span class="text-xs text-slate-500 capitalize">{{ subscriptionPlan.frequency }} plan</span>
                </div>
                <div class="ml-auto font-bold text-slate-900">₦{{ subscriptionPlan.price.toLocaleString() }}</div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              <div class="flex justify-between items-center" v-for="item in cart" :key="item.product._id">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                    <img v-if="item.product.imageUrl" :src="item.product.imageUrl" class="w-full h-full object-cover rounded-lg" />
                    <span v-else>{{ item.product.icon || '📦' }}</span>
                  </div>
                  <div>
                    <span class="text-sm font-bold text-slate-800 block truncate w-32" :title="item.product.name">{{ item.product.name }}</span>
                    <div class="flex items-center gap-3 mt-1">
                      <div class="flex items-center border border-slate-200 rounded bg-white overflow-hidden w-fit">
                        <button type="button" @click.stop="updateQuantity(item.product._id, item.quantity - 1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium text-xs">-</button>
                        <span class="w-6 text-center font-medium text-xs text-slate-900">{{ item.quantity }}</span>
                        <button type="button" @click.stop="updateQuantity(item.product._id, item.quantity + 1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium text-xs">+</button>
                      </div>
                      <button type="button" @click.stop="removeFromCart(item.product._id)" class="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50" title="Remove">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
                <span class="font-bold text-slate-900">₦{{ (item.product.price * item.quantity).toLocaleString() }}</span>
              </div>
            </div>
            
            <div class="border-t border-slate-100 pt-6 space-y-3">
              <div class="flex justify-between text-slate-500 text-sm font-medium">
                <span>Subtotal</span>
                <span class="text-slate-900">₦{{ cartTotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-slate-500 text-sm font-medium">
                <span>Delivery Fee</span>
                <span class="text-slate-900">{{ orderData.deliveryTime === 'express' ? `₦${settings.expressDeliveryFee?.toLocaleString() || '1,500'}` : 'Free' }}</span>
              </div>
              <div class="flex justify-between text-lg font-black text-slate-900 mt-4 pt-4 border-t border-slate-100">
                <span>Total</span>
                <span class="text-emerald-600">₦{{ finalTotal.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AuthModal :isOpen="showAuthModal" @success="handleAuthSuccess" @close="showAuthModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCreateOrder } from '~/composables/modules/orders/useCreateOrder';
import { useCart } from '~/composables/modules/cart/useCart';
import { useSettings } from '~/composables/modules/settings/useSettings';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';
import { useCustomToast } from '~/composables/core/useCustomToast';

const route = useRoute();
const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
const { loading, createOrder } = useCreateOrder();
const { showToast } = useCustomToast();
const { settings, getSettings } = useSettings();

const isSubscriptionCheckout = computed(() => !!route.query.planId || orderData.value.isSubscription);
const subscriptionPlan = ref<any>(null);

const isAuthenticated = ref(false);
const showAuthModal = ref(false);
const isFrequencyDropdownOpen = ref(false);

const orderData = ref({
  fullName: '',
  email: '',
  phoneCode: '+234',
  phone: '',
  altPhoneCode: '+234',
  altPhone: '',
  deliveryAddress: '',
  deliveryTime: 'standard',
  saveCard: false,
  saveDeliveryOptions: false,
  isSubscription: false,
  subscriptionFrequency: 'weekly'
});

const isFormValid = computed(() => {
  return (
    orderData.value.fullName.trim() !== '' &&
    orderData.value.email.trim() !== '' &&
    orderData.value.phone.trim().length >= 7 &&
    orderData.value.deliveryAddress.trim() !== ''
  );
});

onMounted(async () => {
  await getSettings();
  
  if (isSubscriptionCheckout.value) {
    try {
      // Fetch all plans and find the one requested (since we didn't add a single GET /plans/:id route)
      const res = await GATEWAY_ENDPOINT.get('/subscriptions/plans');
      subscriptionPlan.value = res.data.find((p: any) => p._id === route.query.planId);
    } catch (e) {
      console.error(e);
    }
  }

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (token && userStr) {
    isAuthenticated.value = true;
    try {
      const user = JSON.parse(userStr);
      orderData.value.fullName = user.name || '';
      orderData.value.email = user.email || '';
    } catch (e) {
      console.error(e);
    }
  } else {
    showAuthModal.value = true;
  }
});

const handleAuthSuccess = (user: any) => {
  isAuthenticated.value = true;
  showAuthModal.value = false;
  orderData.value.fullName = user.name || '';
  orderData.value.email = user.email || '';
  showToast({ title: 'Success', message: 'You have been securely signed in.', type: 'success' });
};

const finalTotal = computed(() => {
  let baseTotal = isSubscriptionCheckout.value && subscriptionPlan.value ? subscriptionPlan.value.price : cartTotal.value;
  return orderData.value.deliveryTime === 'express' ? baseTotal + (settings.value.expressDeliveryFee || 1500) : baseTotal;
});

const handleCheckout = async () => {
  if (!isSubscriptionCheckout.value && cart.value.length === 0) {
    showToast({ title: 'Cart Empty', message: 'Please add items to your cart before checking out.', type: 'warning' });
    return;
  }

  const payload = {
    ...orderData.value,
    phone: `${orderData.value.phoneCode}${orderData.value.phone}`,
    altPhone: orderData.value.altPhone ? `${orderData.value.altPhoneCode}${orderData.value.altPhone}` : '',
    totalAmount: finalTotal.value,
    items: (isSubscriptionCheckout.value && route.query.planId) ? [] : cart.value.map(item => ({
      productId: item.product._id,
      quantity: item.quantity,
      priceAtPurchase: item.product.price
    })),
    isSubscription: isSubscriptionCheckout.value,
    subscriptionFrequency: route.query.planId ? undefined : orderData.value.subscriptionFrequency,
    planId: route.query.planId ? route.query.planId : undefined
  };

  try {
    const result = await createOrder(payload);
    if (result && result.authorization_url) {
      // Clear cart before redirecting since order is essentially created
      // In a real app, clear cart ONLY on successful callback, but this is a demo
      localStorage.removeItem('cart'); 
      window.location.href = result.authorization_url;
    } else {
      showToast({ title: 'Checkout Failed', message: 'Failed to initialize payment with Paystack.', type: 'error' });
    }
  } catch (err: any) {
    console.error(err);
    showToast({ title: 'Error', message: err.response?.data?.message || 'An error occurred during checkout.', type: 'error' });
  }
};
</script>
