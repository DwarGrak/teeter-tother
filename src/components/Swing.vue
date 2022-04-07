<template>
  <div>
    <Shape
      :height="triangleHeight"
      :x="settings.width / 2"
      :y="settings.height"
      :origin-y="OriginY.bottom"
      color="brown"
    >
      <Triangle />
    </Shape>
    <Shape
      :height="10"
      :width="1000"
      :x="settings.width / 2"
      :y="settings.height - triangleHeight"
      :origin-y="OriginY.bottom"
    >
      <Square />
    </Shape>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import Square from './svg/Square.vue';
import Triangle from './svg/Triangle.vue';
import Shape from './shapes/Shape.vue';
import { OriginY } from '../utils/origin';

const triangleHeight = 150;

const {
  state: { settings },
} = useStore();
</script>
