<template>
  <div>
    <Shape :width="50"><Triangle /></Shape>
    <Shape color="red" :x="300" :y="200"><Circle /></Shape>
    <Shape :height="10" :rotation="45"><Square /></Shape>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Circle from './svg/Circle.vue';
import Square from './svg/Square.vue';
import Triangle from './svg/Triangle.vue';
import Shape from './shapes/Shape.vue';

export default defineComponent({
  name: 'Scene',
  components: {
    Circle,
    Square,
    Triangle,
    Shape,
  },
});
</script>
