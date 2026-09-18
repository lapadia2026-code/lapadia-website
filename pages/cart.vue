<template>
  <div class="py-6 md:py-10 pb-16 max-w-7xl mx-auto px-5 md:px-8 min-h-screen">
    <h1 class="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Your Cart</h1>
    
    <div v-if="cart.length === 0" class="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100">
      <div class="text-3xl md:text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
      <p class="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added any fresh groceries to your cart yet.</p>
      <NuxtLink to="/products" class="px-5 md:px-8 md:px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-slate-800 transition-colors">
        Start Shopping
      </NuxtLink>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-12 md:gap-20">
      <!-- Cart Items -->
      <div class="flex-1 space-y-6">
        <div v-for="item in cart" :key="item.product._id" class="flex gap-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm items-center">
          <div class="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center text-2xl md:text-4xl shrink-0">
            <img v-if="item.product.imageUrl" :src="item.product.imageUrl" :alt="item.product.name" class="w-full h-full object-cover" />
            <span v-else>{{ item.product.icon || '📦' }}</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-slate-900 text-lg mb-1">{{ item.product.name }}</h3>
            <div class="text-emerald-600 font-medium mb-3">₦{{ Number(item.product.price).toLocaleString() }}</div>
            <div class="flex items-center gap-4">
              <div class="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                <button @click="updateQuantity(item.product._id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium">-</button>
                <span class="w-10 text-center font-medium text-sm text-slate-900">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.product._id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium">+</button>
              </div>
              <button @click="removeFromCart(item.product._id)" class="text-sm text-rose-500 hover:text-rose-700 font-medium p-2 hover:bg-rose-50 rounded transition-colors" title="Remove item">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
          <div class="text-xl font-bold text-slate-900 text-right shrink-0">
            ₦{{ (item.product.price * item.quantity).toLocaleString() }}
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-96">
        <div class="bg-slate-50 rounded-3xl p-4 md:p-8 border border-slate-100 sticky top-24">
          <h2 class="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-slate-600">
              <span>Subtotal ({{ cartItemCount }} items)</span>
              <span class="font-medium text-slate-900">₦{{ Number(cartTotal).toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span class="font-medium text-emerald-600">Free</span>
            </div>
            <div class="border-t border-slate-200 pt-4 flex justify-between items-end mt-4">
              <span class="text-slate-900 font-bold">Total</span>
              <span class="text-xl md:text-3xl font-extrabold text-slate-900">₦{{ Number(cartTotal).toLocaleString() }}</span>
            </div>
          </div>
          <NuxtLink to="/checkout" class="block w-full py-3 text-center bg-blue-600 text-white rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
            Proceed to Checkout
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/modules/cart/useCart';

const { cart, removeFromCart, updateQuantity, cartTotal, cartItemCount } = useCart();
</script>
