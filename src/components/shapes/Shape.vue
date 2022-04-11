<template>
  <SWGWrapper :style="style" :height="height" :width="width" :color="color">
    <slot />
  </SWGWrapper>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { OriginX, OriginY, useOrigin } from '@/utils/origin';
import SWGWrapper from './SVGWrapper.vue';

const props = defineProps({
  ...SWGWrapper.props,
  originX: {
    type: Number,
    default: OriginX.center,
  },
  originY: {
    type: Number,
    default: OriginY.center,
  },
  x: { type: Number, default: null },
  y: { type: Number, default: null },
  rotation: { type: Number, default: 0 },
});

const top = computed(() => {
  return props.y === null
    ? null
    : useOrigin(props.y, props.height, props.originY);
});
const left = computed(() => {
  return props.x === null
    ? null
    : useOrigin(props.x, props.width, props.originX);
});
const style = computed(() => {
  const position = props.x !== null || props.y !== null ? 'absolute' : 'static';
  return {
    position,
    left: left.value,
    top: top.value,
    transform: `rotate(${-props.rotation}rad)`,
    'transform-origin': `${OriginX[props.originX]} ${OriginY[props.originY]}`,
  };
});
</script>
