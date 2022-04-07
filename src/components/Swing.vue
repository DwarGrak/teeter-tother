<template>
  <div>
    <Shape
      :width="50"
      :x="width / 2"
      :y="500"
      :origin-y="OriginYList.top"
      color="red"
    >
      <Triangle />
    </Shape>
    <Shape :width="50" :x="width / 2" :y="500" :origin-y="OriginYList.bottom">
      <Triangle />
    </Shape>
    <Shape
      :width="50"
      :x="width / 2"
      :y="500"
      :origin-y="OriginYList.center"
      color="blue"
    >
      <Triangle />
    </Shape>
    <Shape
      :width="50"
      :x="width / 2"
      :y="500"
      :origin-x="OriginXList.left"
      color="blue"
    >
      <Triangle />
    </Shape>
    <Shape
      :width="50"
      :x="width / 2"
      :y="500"
      :origin-x="OriginXList.right"
      color="blue"
    >
      <Triangle />
    </Shape>
    <Shape color="red" :x="300" :y="200" :origin-y="OriginYList.top">
      <Circle />
    </Shape>
    <Shape :height="10" :rotation="45"><Square /></Shape>
  </div>
</template>

<script setup lang="ts">
import Circle from './svg/Circle.vue';
import Square from './svg/Square.vue';
import Triangle from './svg/Triangle.vue';
import Shape from './shapes/Shape.vue';
import { OriginXList, OriginYList } from '../utils/origin';

const width = 800;
//const height = 800;
</script>
