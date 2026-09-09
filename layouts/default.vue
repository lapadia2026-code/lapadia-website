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
              <!-- Social Icons -->
              <a href="https://www.instagram.com/lapadia_ng?stkn=cTRjanpqaW1iNjBy&utm_source=qr" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"><span class="sr-only">Instagram</span>📸</a>
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

    <!-- WhatsApp Support Chat -->
    <a href="https://wa.me/2348099431789" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 left-6 z-[90] bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center group">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
      <span class="absolute left-full ml-4 whitespace-nowrap bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with Support
      </span>
    </a>

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
