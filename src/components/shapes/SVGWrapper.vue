<template>
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    v-bind="$props"
    :fill="color"
  >
    <slot />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SWGWrapper',
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    color: { type: String, default: 'black' },
  },
});
</script>
