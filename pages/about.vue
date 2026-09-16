<template>
  <div class="py-8 md:py-12 max-w-5xl mx-auto px-5 md:px-8">
    <!-- Hero Section -->
    <div class="text-center mb-10 md:mb-16">
      <h1 class="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Redefining Grocery Delivery</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Lapadia Fresh was founded on a simple premise: everyone deserves access to fresh, high-quality food without the hassle of the supermarket.
      </p>
    </div>

    <!-- Image Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
      <div class="h-80 bg-slate-200 rounded-3xl overflow-hidden shadow-md">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Fresh Produce" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
      <div class="h-80 bg-slate-200 rounded-3xl overflow-hidden shadow-md">
        <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80" alt="Grocery Delivery" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
    </div>

    <!-- Content Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-20">
      <div>
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">🌱</div>
        <h2 class="text-xl md:text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
        <p class="text-slate-600 text-lg leading-relaxed mb-6">
          To build a sustainable, efficient, and reliable bridge between local farms, premium suppliers, and your kitchen. We believe that buying groceries shouldn't take hours out of your week.
        </p>
      </div>
      <div>
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">🤝</div>
        <h2 class="text-xl md:text-3xl font-bold text-slate-900 mb-4">Our Promise</h2>
        <p class="text-slate-600 text-lg leading-relaxed">
          Quality is non-negotiable. If an apple is bruised, we don't pack it. If a delivery is late, we make it right. Our 100% freshness guarantee ensures you never pay for produce you wouldn't pick yourself.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About Us - Lapadia Fresh',
  meta: [
    { name: 'description', content: 'Learn more about Lapadia Fresh' }
  ]
})
</script>
