<template>
  <div class="relative w-full">
    <label v-if="label" class="block text-sm font-bold text-slate-700 mb-2">{{ label }}</label>
    <div class="relative">
      <input
        type="date"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900 appearance-none"
        :required="required"
        :min="min"
        :max="max"
      />
      <!-- Custom calendar icon to replace native one if possible, though native date input behavior varies -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  required?: boolean;
  min?: string;
  max?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
/* Hide the default calendar icon in webkit browsers */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>
