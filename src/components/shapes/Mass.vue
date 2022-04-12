<template>
  <Shape v-bind="props" :origin-y="1" skip-viewbox>
    <SVGWrapper :height="height" :width="width" :color="color">
      <slot />
    </SVGWrapper>
    <text :x="width / 2" :y="height * 0.6" fill="black" text-anchor="middle">
      {{ props.mass }}kg
    </text>
  </Shape>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Shape from './Shape.vue';
import SVGWrapper from './SVGWrapper.vue';

const props = defineProps({
  ...Shape.props,
  mass: { type: Number, require: true },
});
</script>
