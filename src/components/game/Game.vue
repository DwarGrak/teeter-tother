<template>
  <GlobalEvents
    @keydown.left="startMoveLeft"
    @keydown.right="startMoveRight"
    @keyup="stopMove"
  />
  <Scene
    :swingRotation="swingRotation"
    :attachedMasses="attachedMasses"
    :clenchedMass="clenchedMass"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { GlobalEvents } from 'vue-global-events';
import MassX from '@/interfaces/MassX';
import Scene from '../Scene.vue';
import useClenchedMove from './useClenchedMove';

const {
  state: {
    settings: { sceneWidth, leverLength },
  },
} = useStore();

const swingRotation = 15;

const attachedMasses: MassX[] = [
  { id: 1, mass: 10, size: 70, type: 'triangle', color: 'red', x: 100 },
  { id: 2, mass: 5, size: 50, type: 'square', color: 'blue', x: 300 },
];

const clenchedMass = reactive<MassX>({
  mass: 10,
  size: 70,
  type: 'triangle',
  color: 'green',
  x: 100,
});

const minX = (sceneWidth - leverLength) / 2;
const centerX = sceneWidth / 2;

const { startMoveLeft, startMoveRight, stopMove } = useClenchedMove(
  clenchedMass,
  minX,
  centerX
);
</script>
