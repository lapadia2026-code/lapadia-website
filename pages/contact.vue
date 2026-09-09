<template>
  <div class="py-8 md:py-12 max-w-6xl mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      
      <!-- Contact Information -->
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
        <p class="text-lg text-slate-600 mb-12">Whether you have a question about your order, our subscription plans, or anything else, our team is ready to answer all your questions.</p>
        
        <div class="space-y-8">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Email Support</h3>
              <p class="text-slate-500 mb-2">Our team responds within 24 hours.</p>
              <a href="mailto:support@lapadia.com" class="text-blue-600 font-bold hover:underline">support@lapadia.com</a>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Phone</h3>
              <p class="text-slate-500 mb-2">Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+2348000000000" class="text-blue-600 font-bold hover:underline">+234 (800) 000-0000</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-8 md:p-10">
        <h3 class="text-2xl font-bold text-slate-900 mb-8">Send a Message</h3>
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <input type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Jane Doe" />
          </div>
          
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input type="email" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" placeholder="jane@example.com" />
          </div>
          
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">Subject</label>
            <input type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Where is my order?" />
          </div>
          
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">Message</label>
            <textarea required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium resize-none" rows="4" placeholder="How can we help you?"></textarea>
          </div>
          
          <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]">
            Send Message
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomToast } from '~/composables/core/useCustomToast';

useHead({
  title: 'Contact Support - Lapadia Fresh',
  meta: [
    { name: 'description', content: 'Contact Lapadia Fresh Support' }
  ]
});

const { showToast } = useCustomToast();

const submitForm = () => {
  showToast({
    title: 'Message Sent!',
    message: 'We have received your message and will get back to you shortly.',
    type: 'success'
  });
};
</script>
