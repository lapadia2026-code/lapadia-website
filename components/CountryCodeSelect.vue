<template>
  <div class="relative" ref="dropdownRef">
    <button type="button" @click="isOpen = !isOpen" class="flex items-center justify-between w-full h-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm text-slate-700">
      <span class="flex items-center gap-2">
        <span class="text-lg leading-none">{{ selectedOption.flag }}</span>
        <span>{{ selectedOption.code }}</span>
      </span>
      <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-if="isOpen" class="absolute z-50 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-2xl py-2 max-h-60 overflow-y-auto left-0">
      <div 
        v-for="opt in options" 
        :key="opt.code"
        @click="selectOption(opt)"
        class="px-4 py-3 hover:bg-emerald-50 cursor-pointer flex items-center gap-3 transition-colors text-sm border-b border-slate-50 last:border-0"
        :class="{'bg-emerald-50 text-emerald-700 font-bold': modelValue === opt.code}"
      >
        <span class="text-xl leading-none">{{ opt.flag }}</span>
        <span class="font-medium text-slate-700">{{ opt.name }} <span class="text-slate-400">({{ opt.code }})</span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '+234' }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const options = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
];

const selectedOption = computed(() => {
  return options.find(o => o.code === props.modelValue) || options[0];
});

const selectOption = (opt: any) => {
  emit('update:modelValue', opt.code);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
