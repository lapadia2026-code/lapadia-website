<template>
  <div class="relative w-full" ref="containerRef">
    <label v-if="label" class="block text-sm font-bold text-slate-700 mb-2">{{ label }}</label>
    
    <div 
      @click="isOpen = !isOpen"
      class="w-full px-4 md:px-6 py-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all font-medium text-slate-900 cursor-pointer flex items-center justify-between"
    >
      <span v-if="modelValue">{{ formattedDate }}</span>
      <span v-else class="text-slate-400">DD/MM/YYYY</span>
      
      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <div v-if="isOpen" class="absolute z-50 top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-72">
      <div class="flex items-center justify-between mb-4">
        <div class="font-bold text-slate-900 flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
          {{ monthNames[currentMonth] }} {{ currentYear }}
          <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <div class="flex gap-2">
          <button @click.stop="prevMonth" class="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" /></svg>
          </button>
          <button @click.stop="nextMonth" class="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </div>
      
      <!-- Days Header -->
      <div class="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-bold text-slate-800">
        <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
      </div>
      
      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-1 text-center text-sm mb-4">
        <div v-for="blank in blankDays" :key="'blank-'+blank" class="h-9"></div>
        <button 
          v-for="day in daysInMonth" 
          :key="'day-'+day"
          @click.stop="selectDate(day)"
          :disabled="isDateDisabled(day)"
          class="h-9 w-9 mx-auto rounded flex items-center justify-center transition-colors font-medium"
          :class="[
            isSelected(day) ? 'bg-blue-600 text-white font-bold' : '',
            !isSelected(day) && !isDateDisabled(day) ? 'hover:bg-slate-100 text-slate-700' : '',
            isDateDisabled(day) ? 'text-slate-300 cursor-not-allowed font-normal' : 'cursor-pointer'
          ]"
        >
          {{ day }}
        </button>
      </div>
      
      <!-- Footer Actions -->
      <div class="flex items-center justify-between pt-3 border-t border-slate-100 text-sm font-bold text-blue-600">
        <button @click.stop="clearDate" class="hover:text-blue-800 transition-colors px-2 py-1">Clear</button>
        <button @click.stop="setToday" class="hover:text-blue-800 transition-colors px-2 py-1">Today</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  modelValue: string; // Expected format: YYYY-MM-DD
  label?: string;
  required?: boolean;
  min?: string;
  max?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const containerRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Compute how many days are in the selected month
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

// Compute the number of blank spots before the 1st of the month
const blankDays = computed(() => {
  let dayOfWeek = new Date(currentYear.value, currentMonth.value, 1).getDay();
  // JS getDay(): 0 = Sun, 1 = Mon ... 6 = Sat
  // Our UI: 0 = Mon, 1 = Tue ... 6 = Sun
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
});

// Format date for display: DD/MM/YYYY
const formattedDate = computed(() => {
  if (!props.modelValue) return '';
  const [year, month, day] = props.modelValue.split('-');
  if (!year || !month || !day) return '';
  return `${day}/${month}/${year}`;
});

const isSelected = (day: number) => {
  if (!props.modelValue) return false;
  const [year, month, d] = props.modelValue.split('-').map(Number);
  return year === currentYear.value && month === currentMonth.value + 1 && d === day;
};

const isDateDisabled = (day: number) => {
  const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  if (props.min && dateStr < props.min) return true;
  if (props.max && dateStr > props.max) return true;
  return false;
};

const selectDate = (day: number) => {
  if (isDateDisabled(day)) return;
  const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  emit('update:modelValue', dateStr);
  isOpen.value = false;
};

const clearDate = () => {
  emit('update:modelValue', '');
  isOpen.value = false;
};

const setToday = () => {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  if (props.min && dateStr < props.min) return;
  if (props.max && dateStr > props.max) return;
  
  currentYear.value = today.getFullYear();
  currentMonth.value = today.getMonth();
  
  emit('update:modelValue', dateStr);
  isOpen.value = false;
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  if (props.modelValue) {
    const [year, month] = props.modelValue.split('-').map(Number);
    if (year && month) {
      currentYear.value = year;
      currentMonth.value = month - 1;
    }
  }
});

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    const [year, month] = newVal.split('-').map(Number);
    if (year && month) {
      currentYear.value = year;
      currentMonth.value = month - 1;
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
