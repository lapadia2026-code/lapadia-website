<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col">
    <!-- Navbar -->
    <header class="fixed top-0 inset-x-0 h-20 glass z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600 tracking-tight">
          <img src="@/assets/img/logo.jpg" class="h-20 w-auto rounded-full" />
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-8 font-medium">
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Home</NuxtLink>
          <NuxtLink to="/products" class="hover:text-blue-600 transition-colors">Shop</NuxtLink>
          <NuxtLink to="/subscriptions" class="hover:text-blue-600 transition-colors">Subscriptions</NuxtLink>
        </nav>
        <div class="flex items-center gap-4">
          <NuxtLink to="/cart" class="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartItemCount > 0" class="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm">{{ cartItemCount }}</span>
          </NuxtLink>
          
          <ClientOnly>
            <template v-if="isLoggedIn">
              <NuxtLink to="/account" class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-full font-medium transition-colors">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  {{ user?.name ? user.name.substring(0, 1) : 'U' }}
                </div>
                <span>My Account</span>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors">
                Sign In
              </NuxtLink>
            </template>
            <template #fallback>
              <div class="w-24 h-10 bg-slate-200 animate-pulse rounded-full"></div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 mt-20">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 pt-16 pb-8 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div class="lg:col-span-2">
            <NuxtLink to="/" class="flex items-center gap-3 mb-6 inline-block">
              <img src="@/assets/img/logo.jpg" class="h-20 w-auto rounded-full" />
            </NuxtLink>
            <p class="text-slate-400 leading-relaxed max-w-sm mb-8">
              Farm-fresh groceries and everyday essentials delivered directly to your doorstep in minutes. Experience the new standard of fresh.
            </p>
            <div class="flex gap-4">
              <!-- Social Icons Placeholder -->
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"><span class="sr-only">Twitter</span>𝕏</a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"><span class="sr-only">Instagram</span>📸</a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"><span class="sr-only">Facebook</span>f</a>
            </div>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul class="space-y-4 text-slate-400">
              <li><NuxtLink to="/products" class="hover:text-blue-400 transition-colors font-medium">All Products</NuxtLink></li>
              <li><NuxtLink to="/subscriptions" class="hover:text-blue-400 transition-colors font-medium">Subscriptions</NuxtLink></li>
              <li><NuxtLink to="/cart" class="hover:text-blue-400 transition-colors font-medium">Your Cart</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul class="space-y-4 text-slate-400">
              <li><NuxtLink to="/about" class="hover:text-blue-400 transition-colors font-medium">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-blue-400 transition-colors font-medium">Contact Support</NuxtLink></li>
              <li><NuxtLink to="/faq" class="hover:text-blue-400 transition-colors font-medium">FAQ</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul class="space-y-4 text-slate-400">
              <li><NuxtLink to="/terms" class="hover:text-blue-400 transition-colors font-medium">Terms of Service</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="hover:text-blue-400 transition-colors font-medium">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/refund" class="hover:text-blue-400 transition-colors font-medium">Refund Policy</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-slate-500 text-sm font-medium">
            &copy; {{ new Date().getFullYear() }} Lapadia Fresh. All rights reserved.
          </p>
          <div class="flex items-center gap-6 text-slate-500 text-sm font-medium">
            <span class="flex items-center gap-2">🟢 System Operational</span>
            <span class="flex items-center gap-2">🔒 Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
    <!-- Global Toast Container -->
    <div class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <div v-for="toast in toasts" :key="toast.id" 
           class="pointer-events-auto w-80 bg-white border border-slate-100 shadow-xl rounded-xl p-4 transform transition-all duration-300 translate-y-0 opacity-100 flex items-start gap-3"
           :class="{
             'border-l-4 border-l-emerald-500': toast.type === 'success',
             'border-l-4 border-l-rose-500': toast.type === 'error',
             'border-l-4 border-l-blue-500': toast.type === 'info',
             'border-l-4 border-l-amber-500': toast.type === 'warning'
           }">
        <div class="flex-1">
          <h4 class="text-sm font-bold text-slate-900">{{ toast.title }}</h4>
          <p class="text-sm text-slate-500 mt-1">{{ toast.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { useCart } from '~/composables/modules/cart/useCart';
import { useAuth } from '~/composables/core/useAuth';

const { toasts } = useCustomToast();
const { cartItemCount } = useCart();
const { isLoggedIn, user, initAuth } = useAuth();

onMounted(() => {
  initAuth();
  window.addEventListener('storage', initAuth);
});
</script>
