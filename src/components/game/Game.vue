<template>
  <GlobalEvents
    @keydown.left="startMoveLeft"
    @keydown.right="startMoveRight"
    @keydown.enter="dropMass"
    @keyup="stopMove"
  />
  <Scene :swingRotation="swingRotation" :masses="positionedMasses" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { GlobalEvents } from 'vue-global-events';
import GameMass from '@/interfaces/GameMass';
import Scene from '../Scene.vue';
import useClenchedMove from './useClenchedMove';
import useDraw from './useDraw';
import { moveMass } from '@/services/MovableService';
import { posToSwing, swingToPos } from '@/services/SwingService';
import PositionedMass from '@/interfaces/PositionedMass';
import { degToRad } from '@/utils/angle';

const {
  state: {
    settings: { sceneWidth, sceneHeight, leverLength, speedMult },
  },
} = useStore();

const swingRotation = 15;
const swingAngleRad = degToRad(swingRotation);

const masses = ref<GameMass[]>([
  {
    id: 1,
    mass: 10,
    size: 70,
    type: 'triangle',
    color: 'red',
    x: { pos: -100, v: 0, a: 0 },
    y: { pos: 0, v: 0, a: 0 },
    status: 'on-swing',
  },
  {
    mass: 10,
    size: 70,
    type: 'triangle',
    color: 'green',
    x: { pos: 300, v: 0, a: 0 },
    y: { pos: 100, v: 0, a: 0 },
    status: 'clenched',
  },
]);

const positionedMasses = computed<PositionedMass[]>(() =>
  masses.value.map(({ status, ...mass }) => {
    const position =
      status === 'on-swing'
        ? swingToPos(mass.x.pos, swingAngleRad)
        : { x: mass.x.pos, y: mass.y.pos };
    const rotation = status === 'on-swing' ? swingRotation : 0;
    return {
      ...mass,
      width: mass.size,
      height: mass.size,
      ...position,
      rotation,
    };
  })
);

const minX = (sceneWidth - leverLength) / 2;
const centerX = sceneWidth / 2;

const clenchedMass = computed<GameMass>(() =>
  masses.value.find(({ status }) => status === 'clenched')
);

const { startMoveLeft, startMoveRight, stopMove } = useClenchedMove(
  clenchedMass,
  speedMult
);

const dropMass = () => {
  if (clenchedMass.value === undefined) return;
  clenchedMass.value.x = { ...clenchedMass.value.x, v: 0, a: 0 };
  clenchedMass.value.y = { ...clenchedMass.value.y, v: 0, a: 1000 };
  clenchedMass.value.status = 'falling';
};

useDraw((delay: number) => {
  for (let mass of masses.value) {
    if (mass.status === 'clenched') {
      moveMass(clenchedMass.value, delay, { min: minX, max: centerX });
    } else if (mass.status === 'falling') {
      moveMass(mass, delay, undefined, { min: 0, max: sceneHeight });
      const dist = posToSwing(mass, swingAngleRad);
      if (dist !== undefined) {
        mass.x = { pos: dist, v: 0, a: 0 };
        mass.y = { pos: 0, v: 0, a: 0 };
        mass.status = 'on-swing';
      }
    }
  }
});
</script>
