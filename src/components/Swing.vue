<template>
  <Shape
    :height="standHeight"
    :x="sceneWidth / 2"
    :y="sceneHeight"
    :origin-y="OriginY.bottom"
    skip-viewbox
  >
    <SVGWrapper :height="standHeight">
      <Triangle fill="brown" />
    </SVGWrapper>
    <text :x="50" :y="220" fill="white" text-anchor="middle">
      Score: {{ score }}
    </text>
  </Shape>

  <Shape
    class="leverage"
    :height="leverWidth"
    :width="leverLength"
    :x="sceneWidth / 2"
    :y="sceneHeight - standHeight"
    :origin-y="OriginY.bottom"
    :rotation="props.rotation"
  >
    <Square />
  </Shape>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import Shape from './shapes/Shape.vue';
import Square from './svg/Square.vue';
import Triangle from './svg/Triangle.vue';
import { OriginY } from '../utils/origin';
import SVGWrapper from './shapes/SVGWrapper.vue';

const props = defineProps({
  rotation: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

const {
  state: {
    settings: { sceneWidth, sceneHeight, standHeight, leverWidth, leverLength },
  },
} = useStore();
</script>
