<template>
  <div class="bg-[#F9F6F0] min-h-screen font-sans">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-400 text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/20 blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-yellow-200/20 blur-3xl"></div>
      </div>
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div class="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-bold mb-4 tracking-wide">
          🎉 Community & Culture
        </div>
        <h1 class="text-xl md:text-3xl md:text-6xl font-black tracking-tight mb-4" >
          Events
        </h1>
        <p class="text-xl text-orange-100 max-w-xl font-medium leading-relaxed">
          Tastings, pop-ups, wellness workshops, and more. Come hang out with the Lapadia community.
        </p>
      </div>
    </div>

    <!-- Events Grid -->
    <div class="max-w-6xl mx-auto px-6 py-16">
      <!-- Status Filter Pills -->
      <div class="flex flex-wrap items-center gap-3 mb-10">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[ 'px-5 py-2 rounded-full text-sm font-bold transition-all border', activeTab === tab.value ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="loading" class="space-y-6">
        <div v-for="i in 4" :key="i" class="animate-pulse flex gap-6 bg-white p-6 rounded-2xl">
          <div class="w-24 h-24 bg-slate-200 rounded-xl flex-shrink-0"></div>
          <div class="flex-1 space-y-3">
            <div class="h-6 bg-slate-200 rounded w-1/2"></div>
            <div class="h-4 bg-slate-200 rounded w-3/4"></div>
            <div class="h-4 bg-slate-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredEvents.length === 0" class="text-center py-24">
        <div class="text-3xl md:text-6xl mb-4">🗓️</div>
        <h2 class="text-xl md:text-3xl font-black text-slate-900 mb-3" >No Events Yet</h2>
        <p class="text-slate-500 font-medium max-w-md mx-auto">We're planning something exciting. Stay tuned for upcoming events and community gatherings!</p>
      </div>

      <div v-else class="space-y-6">
        <NuxtLink
          v-for="event in filteredEvents"
          :key="event._id"
          :to="`/events/${event.slug}`"
          class="flex flex-col md:flex-row gap-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <!-- Event Image / Date Block -->
          <div class="w-full md:w-56 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
            <img 
              v-if="event.image" 
              :src="event.image" 
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-amber-100 to-orange-50 flex flex-col items-center justify-center">
              <div class="text-2xl md:text-4xl font-black text-amber-600">{{ getDay(event.date) }}</div>
              <div class="text-sm font-bold text-amber-500 uppercase tracking-widest">{{ getMonth(event.date) }}</div>
            </div>
          </div>

          <!-- Event Details -->
          <div class="flex-1 py-6 pr-6 pl-6 md:pl-0">
            <div class="flex items-center gap-3 mb-3">
              <span :class="[ 'px-3 py-1 rounded-full text-xs font-bold border capitalize', event.status === 'upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' : event.status === 'ongoing' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200' ]">
                {{ event.status }}
              </span>
            </div>

            <h2 class="text-2xl font-black text-slate-900 group-hover:text-amber-700 transition-colors mb-2" >
              {{ event.title }}
            </h2>

            <p class="text-slate-500 font-medium text-sm mb-4 line-clamp-2">
              {{ event.description }}
            </p>

            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {{ formatDate(event.date) }}
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {{ event.time }}
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ event.location }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const events = ref<any[]>([]);
const loading = ref(true);
const activeTab = ref('all');

const tabs = [
  { label: 'All Events', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Past', value: 'past' },
];

const filteredEvents = computed(() => {
  if (activeTab.value === 'all') return events.value;
  return events.value.filter(e => e.status === activeTab.value);
});

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
    const res = await GATEWAY_ENDPOINT.get('/events');
    events.value = res.data;
  } catch (error) {
    console.error('Failed to fetch events', error);
  } finally {
    loading.value = false;
  }
});
</script>
