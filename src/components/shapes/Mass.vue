<template>
  <Shape v-bind="shapeProps">
    <slot />
    <text
      :x="props.width * 0.5"
      :y="props.height * 0.7"
      fill="white"
      text-anchor="middle"
      >{{ props.mass }}kg</text
    >
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
