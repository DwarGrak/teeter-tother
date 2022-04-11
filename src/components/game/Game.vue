<template>
  <GlobalEvents
    @keydown.left="startMoveLeft"
    @keydown.right="startMoveRight"
    @keydown.enter="dropMass"
    @keyup="stopMove"
  />
  <Scene :swingRotation="swingRotation" :masses="masses" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { GlobalEvents } from 'vue-global-events';
import MovableMass from '@/interfaces/MovableMass';
import { calcMassCoordinatesOnSwing } from '@/utils/calc';
import Scene from '../Scene.vue';
import useClenchedMove from './useClenchedMove';
import { moveMass } from '@/services/MovableService';
import PositionedMass from '@/interfaces/PositionedMass';

const {
  state: {
    settings: { sceneWidth, sceneHeight, leverLength, speedMult },
  },
} = useStore();

const swingRotation = 15;

const attachedMasses: PositionedMass[] = [
  {
    id: 1,
    mass: 10,
    size: 70,
    type: 'triangle',
    color: 'red',
    x: 100,
    y: 0,
    rotation: 0,
  },
  {
    id: 2,
    mass: 5,
    size: 50,
    type: 'square',
    color: 'blue',
    x: 300,
    y: 0,
    rotation: 0,
  },
];

const clenchedMass = ref<MovableMass | undefined>({
  mass: 10,
  size: 70,
  type: 'triangle',
  color: 'green',
  x: { pos: 300, v: 0, a: 0 },
  y: { pos: 100, v: 0, a: 0 },
});

const fallingMasses = ref<MovableMass[]>([]);

const masses = computed<PositionedMass[]>(() => {
  const positionedMasses = [...fallingMasses.value];
  if (clenchedMass.value) positionedMasses.push(clenchedMass.value);
  return [
    ...attachedMasses.map(({ x, size, ...mass }) => ({
      ...mass,
      width: size,
      height: size,
      ...calcMassCoordinatesOnSwing(x, swingRotation),
      rotation: swingRotation,
    })),
    ...positionedMasses.map(({ size, x, y, ...mass }) => ({
      ...mass,
      width: size,
      height: size,
      x: x.pos,
      y: y.pos,
    })),
  ];
});

const minX = (sceneWidth - leverLength) / 2;
const centerX = sceneWidth / 2;

const { startMoveLeft, startMoveRight, stopMove } = useClenchedMove(
  clenchedMass,
  speedMult
);

const dropMass = () => {
  if (clenchedMass.value === undefined) return;
  clenchedMass.value.x = { ...clenchedMass.value.x, v: 0, a: 0 };
  clenchedMass.value.y = { ...clenchedMass.value.y, v: 0, a: 1000 };
  fallingMasses.value.push(clenchedMass.value);
  clenchedMass.value = undefined;
};

const tickTime = ref(Date.now());

const tick = () => {
  const now = Date.now();
  const delay = now - tickTime.value;
  if (clenchedMass.value) {
    moveMass(clenchedMass.value, delay, { min: minX, max: centerX });
  }
  for (let mass of fallingMasses.value) {
    moveMass(mass, delay, undefined, { min: 0, max: sceneHeight });
  }
  tickTime.value = now;
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
</script>
