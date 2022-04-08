<template>
  <div>
    <Shape
      :height="standHeight"
      :x="sceneWidth / 2"
      :y="sceneHeight"
      :origin-y="OriginY.bottom"
      color="brown"
    >
      <Triangle />
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, useStore } from 'vuex';
import Shape from './shapes/Shape.vue';
import Square from './svg/Square.vue';
import Triangle from './svg/Triangle.vue';
import { OriginY } from '../utils/origin';

const props = defineProps({
  rotation: { type: Number, default: 0 },
});

const {
  state: {
    settings: { sceneWidth, sceneHeight, standHeight, leverWidth, leverLength },
  },
} = useStore();
</script>
