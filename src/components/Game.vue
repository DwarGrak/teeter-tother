<template>
  <Scene :swingRotation="swingRotation" :attachedMasses="attachedMasses" />
</template>

<script setup lang="ts">
import Scene from './Scene.vue';
import AttachedMass from '../interfaces/AttachedMass';

const swingRotation = 15;
const attachedMasses: AttachedMass[] = [
  { id: 1, mass: 10, type: 'triangle', color: 'red', position: 100 },
  { id: 2, mass: 5, type: 'square', color: 'blue', position: 300 },
];
</script>
