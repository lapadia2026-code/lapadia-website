<template>
  <div class="py-8 md:py-12 max-w-4xl mx-auto px-4">
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-12">
      <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
      <div class="prose prose-slate prose-lg max-w-none text-slate-600">
        <p class="font-medium text-slate-500 mb-8">Last updated: {{ new Date().toLocaleDateString() }}</p>
        
        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
        <p>When you use Lapadia Fresh, we collect information that you provide to us directly, such as your name, email address, delivery address, and payment information. We also collect data automatically, including your IP address, browser type, and interaction with our website.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Process and deliver your orders</li>
          <li>Communicate with you about your account and orders</li>
          <li>Improve our website, services, and customer experience</li>
          <li>Prevent fraud and ensure the security of our platform</li>
        </ul>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Data Sharing</h2>
        <p>We do not sell your personal data. We may share your information with trusted third-party service providers (like payment processors and delivery drivers) solely for the purpose of fulfilling your orders.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. You can manage your account details through your profile settings or by contacting our support team.</p>

        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Cookies</h2>
        <p>Our website uses cookies to enhance your browsing experience and remember your preferences. You can disable cookies in your browser settings, though some features of our site may not function properly.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Privacy Policy - Lapadia Fresh',
  meta: [
    { name: 'description', content: 'Privacy Policy for Lapadia Fresh' }
  ]
})
</script>
