<template>
  <svg
    :viewBox="skipViewbox ? undefined : '0 0 100 100'"
    preserveAspectRatio="none"
    v-bind="$props"
    :fill="color"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  width: { type: Number, default: 100 },
  height: { type: Number, default: 100 },
  color: { type: String, default: 'black' },
  skipViewbox: { type: Boolean, default: false },
});
</script>
