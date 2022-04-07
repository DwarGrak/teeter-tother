<template>
  <SWGWrapper :style="style" :height="height" :width="width" :color="color">
    <slot />
  </SWGWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SWGWrapper from './SVGWrapper.vue';

export default defineComponent({
  name: 'Shape',
  components: {
    SWGWrapper,
  },
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    color: { type: String, default: 'black' },
    x: { type: Number, default: null },
    y: { type: Number, default: null },
    rotation: { type: Number, default: 0 },
  },
  computed: {
    style() {
      const position =
        this.x !== null || this.y !== null ? 'absolute' : 'static';
      return {
        position,
        left: this.x,
        top: this.y,
        transform: `rotate(-${this.rotation}deg)`,
      };
    },
  },
});
</script>
