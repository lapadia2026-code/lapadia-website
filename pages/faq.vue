<template>
  <div class="py-8 md:py-12 max-w-4xl mx-auto px-5 md:px-8">
    <div class="text-center mb-8 md:mb-12">
      <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h1>
      <p class="text-slate-500 text-lg">Have a question? We're here to help.</p>
    </div>

    <div class="space-y-6">
      <!-- FAQ Item -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-8">
        <h3 class="text-xl font-bold text-slate-900 mb-3">How fast is delivery?</h3>
        <p class="text-slate-600 leading-relaxed">Our standard delivery arrives within 24-48 hours. If you need your groceries immediately, our express delivery option guarantees arrival within 2 hours for a small additional fee.</p>
      </div>

      <!-- FAQ Item -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-8">
        <h3 class="text-xl font-bold text-slate-900 mb-3">Where do you source your produce?</h3>
        <p class="text-slate-600 leading-relaxed">We partner directly with local farmers and trusted suppliers to bring you the freshest, highest-quality produce available. This direct relationship cuts out the middleman and reduces transit time.</p>
      </div>

      <!-- FAQ Item -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-8">
        <h3 class="text-xl font-bold text-slate-900 mb-3">How does the subscription work?</h3>
        <p class="text-slate-600 leading-relaxed">You can set up recurring deliveries for your everyday essentials. Choose your items, set a delivery frequency (weekly, bi-weekly, or monthly), and we'll automatically handle the rest. You can pause or cancel anytime.</p>
      </div>

      <!-- FAQ Item -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-8">
        <h3 class="text-xl font-bold text-slate-900 mb-3">What if an item is out of stock?</h3>
        <p class="text-slate-600 leading-relaxed">If an item becomes unavailable after you place an order, our shoppers will contact you to offer a suitable replacement or process a refund for that item.</p>
      </div>

      <!-- FAQ Item -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-8">
        <h3 class="text-xl font-bold text-slate-900 mb-3">What areas do you deliver to?</h3>
        <p class="text-slate-600 leading-relaxed">We currently deliver to the greater metropolitan area. You can enter your zip code during checkout to confirm if your specific location is within our delivery zones.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'FAQ - Lapadia Fresh',
  meta: [
    { name: 'description', content: 'Frequently Asked Questions about Lapadia Fresh' }
  ]
})
</script>
