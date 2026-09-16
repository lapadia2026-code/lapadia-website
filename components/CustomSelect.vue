<template>
  <div class="relative" ref="dropdownRef">
    <label v-if="label" class="block text-sm font-bold text-slate-700 mb-2">{{ label }}</label>
    
    <button
      type="button"
      @click="toggleDropdown"
      class="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-left font-medium"
      :class="{ 'ring-4 ring-blue-500/10 border-blue-500': isOpen }"
    >
      <span :class="{'text-slate-400': !selectedOption, 'text-slate-900': selectedOption}">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>
      <svg
        class="w-5 h-5 text-slate-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="isOpen"
        class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 max-h-60 overflow-y-auto py-1 text-base focus:outline-none sm:text-sm"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="cursor-pointer select-none relative py-3 pl-4 pr-9 hover:bg-blue-50 transition-colors flex items-center justify-between"
          :class="{
            'bg-blue-50 text-blue-900 font-bold': selectedOption?.value === option.value,
            'text-slate-700': selectedOption?.value !== option.value
          }"
        >
          <span class="block truncate font-medium">{{ option.label }}</span>
          <span v-if="selectedOption?.value === option.value" class="text-blue-600 flex items-center">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Option {
  label: string;
  value: any;
}

const props = defineProps<{
  modelValue: any;
  options: Option[];
  placeholder?: string;
  label?: string;
}>();

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue) || null;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
