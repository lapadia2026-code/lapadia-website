<template>
  <div class="bg-[#F9F6F0] min-h-screen font-sans">
    <!-- Loading -->
    <div v-if="loading" class="max-w-3xl mx-auto px-6 py-20 animate-pulse">
      <div class="h-10 bg-slate-200 rounded w-3/4 mb-6"></div>
      <div class="h-6 bg-slate-200 rounded w-1/3 mb-12"></div>
      <div class="aspect-video bg-slate-200 rounded-2xl mb-12"></div>
      <div class="space-y-4">
        <div class="h-4 bg-slate-200 rounded w-full"></div>
        <div class="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>
    </div>

    <!-- Event Details -->
    <div v-else-if="event" class="pb-24">
      <!-- Cover Image -->
      <div v-if="event.image" class="w-full max-h-[450px] overflow-hidden">
        <img :src="event.image" :alt="event.title" class="w-full h-full object-cover" />
      </div>
      <div v-else class="w-full h-64 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
        <div class="text-center text-white">
          <div class="text-3xl md:text-6xl font-black">{{ getDay(event.date) }}</div>
          <div class="text-xl font-bold uppercase tracking-widest">{{ getMonth(event.date) }}</div>
        </div>
      </div>

      <div class="max-w-3xl mx-auto px-6 pt-12">
        <NuxtLink to="/events" class="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-2 w-fit transition-colors mb-8">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Events
        </NuxtLink>

        <span :class="[ 'px-5 md:px-8 py-1.5 rounded-full text-xs font-bold border capitalize inline-block mb-4', event.status === 'upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' : event.status === 'ongoing' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200' ]">
          {{ event.status }}
        </span>

        <h1 class="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]" >
          {{ event.title }}
        </h1>

        <!-- Event Info Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div class="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date</div>
            <div class="font-bold text-slate-900">{{ formatDate(event.date) }}</div>
          </div>
          <div class="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Time</div>
            <div class="font-bold text-slate-900">{{ event.time }}</div>
          </div>
          <div class="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Location</div>
            <div class="font-bold text-slate-900">{{ event.location }}</div>
          </div>
        </div>

        <!-- Description -->
        <div class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <h2 class="text-lg font-black text-slate-900 mb-4">About This Event</h2>
          <p class="text-slate-600 font-medium leading-relaxed whitespace-pre-line">{{ event.description }}</p>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-24 max-w-3xl mx-auto px-6">
      <h2 class="text-xl md:text-3xl font-black text-slate-900 mb-4" >Event Not Found</h2>
      <p class="text-slate-500 mb-8 font-medium">This event might have been removed or doesn't exist.</p>
      <NuxtLink to="/events" class="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors">Return to Events</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const route = useRoute();
const event = ref<any>(null);
const loading = ref(true);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const getDay = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).getDate();
};

const getMonth = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' });
};

onMounted(async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get(`/events/${route.params.slug}`);
    event.value = res.data;
    
    useSeoMeta({
      title: `${event.value.title} - Lapadia Events`,
      description: event.value.description,
      ogTitle: `${event.value.title} - Lapadia Events`,
      ogDescription: event.value.description,
      ogImage: event.value.image || 'https://lapadia.org/images/logo.jpg',
      twitterTitle: `${event.value.title} - Lapadia Events`,
      twitterDescription: event.value.description,
      twitterImage: event.value.image || 'https://lapadia.org/images/logo.jpg'
    });
  } catch (error) {
    console.error('Failed to fetch event', error);
  } finally {
    loading.value = false;
  }
});
</script>
