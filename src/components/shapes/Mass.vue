<template>
  <Shape v-bind="props" :origin-y="1">
    <slot />
    <text :x="50" :y="70" fill="black" text-anchor="middle">
      {{ props.mass }}kg
    </text>
  </Shape>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Shape from './Shape.vue';

const props = defineProps({
  ...Shape.props,
  mass: { type: Number, require: true },
});
</script>
