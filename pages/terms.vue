<template>
  <div class="py-8 md:py-12 max-w-4xl mx-auto px-4">
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-12">
      <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
      <div class="prose prose-slate prose-lg max-w-none text-slate-600">
        <p class="font-medium text-slate-500 mb-8">Last updated: {{ new Date().toLocaleDateString() }}</p>
        
        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Introduction</h2>
        <p>Welcome to Lapadia Fresh. By accessing our website and using our grocery delivery services, you agree to be bound by these Terms of Service. Please read them carefully.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Use of Service</h2>
        <p>Lapadia Fresh provides an online platform to purchase fresh groceries and everyday essentials. You must be at least 18 years old to use our service. You agree to provide accurate and complete information when registering an account.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Ordering and Delivery</h2>
        <p>All orders are subject to product availability. We reserve the right to limit the quantity of items purchased per person or per order. Delivery times are estimates and may vary due to external factors such as traffic or weather.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Pricing and Payment</h2>
        <p>Prices are subject to change without notice. We make every effort to ensure accurate pricing, but errors may occur. Payments are processed securely via our trusted payment partners.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Account Security</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Modifications to Terms</h2>
        <p>We may modify these terms at any time. Continued use of Lapadia Fresh after any such changes constitutes your acceptance of the new terms.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Terms of Service - Lapadia Fresh',
  meta: [
    { name: 'description', content: 'Terms of Service for Lapadia Fresh' }
  ]
})
</script>
