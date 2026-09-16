<template>
  <div class="py-8 md:py-12 max-w-4xl mx-auto px-5 md:px-8">
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-12">
      <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Refund Policy</h1>
      <div class="prose prose-slate prose-lg max-w-none text-slate-600">
        <p class="font-medium text-slate-500 mb-8">Last updated: {{ new Date().toLocaleDateString() }}</p>
        
        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Freshness Guarantee</h2>
        <p>At Lapadia Fresh, we pride ourselves on the quality of our produce. If you receive any item that is spoiled, damaged, or not up to standard, we offer a 100% money-back guarantee on that item if reported within 24 hours of delivery.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Missing Items</h2>
        <p>If an item you ordered is missing from your delivery, please contact our support team immediately. We will issue a refund for the missing item to your original payment method.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Return Process</h2>
        <p>Because groceries are perishable, we generally do not require you to physically return the item. Simply take a photo of the damaged or spoiled item and send it to our support team along with your order number.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Refund Timeline</h2>
        <p>Once a refund is approved, it will be processed immediately. However, it may take 3-5 business days for the funds to appear on your bank or credit card statement, depending on your financial institution.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Subscription Cancellations</h2>
        <p>You can cancel your subscription at any time. If you cancel before a scheduled delivery is processed, you will not be charged. Deliveries that have already been dispatched are non-refundable.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Refund Policy - Lapadia Fresh',
  meta: [
    { name: 'description', content: 'Refund Policy for Lapadia Fresh' }
  ]
})
</script>
