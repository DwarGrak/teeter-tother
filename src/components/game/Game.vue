<template>
  <GlobalEvents
    @keydown.left="startMoveLeft"
    @keydown.right="startMoveRight"
    @keydown.enter="dropMass"
    @keydown.space="switchState"
    @keyup="stopMove"
  />
  <Scene
    :swingRotation="swingAngle"
    :masses="positionedMasses"
    :started="isStarted"
    :paused="isPaused"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { GlobalEvents } from 'vue-global-events';
import GameMass, { GameMassStatus } from '@/interfaces/GameMass';
import Scene from '../Scene.vue';
import useClenchedMove from './useClenchedMove';
import useDraw from './useDraw';
import { moveMass } from '@/services/MovableService';
import { posToSwing, swingToPos } from '@/services/SwingService';
import PositionedMass from '@/interfaces/PositionedMass';
import { calcDisplacement, getRandomInt, getRandomItem } from '@/utils/calc';
import { svgMap } from '../svg';
import MovableMass from '@/interfaces/MovableMass';

const {
  state: {
    settings: { sceneWidth, sceneHeight, leverLength, speedMult },
  },
} = useStore();

const swingAngle = ref(0);
const swingSpeed = ref(0);
const swingMoment = ref(0);

const masses = ref<GameMass[]>([]);

const positionedMasses = computed<PositionedMass[]>(() =>
  masses.value.map(({ status, ...mass }) => {
    const position =
      status === 'on-swing'
        ? swingToPos(mass.x.pos, swingAngle.value)
        : { x: mass.x.pos, y: mass.y.pos };
    const rotation = status === 'on-swing' ? swingAngle.value : 0;
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

const isStarted = ref(false);
const isPaused = ref(true);

const addMoment = (moment: number) => {
  swingMoment.value -= moment / 5000;
};
const addMassToSwing = (mass: MovableMass) => {
  const moment = mass.x.pos * mass.mass;
  addMoment(moment);
};

const { start: startDraw } = useDraw((delay: number) => {
  if (isPaused.value) return false;

  swingSpeed.value = calcDisplacement(
    swingSpeed.value,
    swingMoment.value,
    delay
  );
  swingAngle.value = calcDisplacement(
    swingAngle.value,
    swingSpeed.value,
    delay
  );

  for (let mass of masses.value) {
    if (mass.status === 'clenched') {
      moveMass(clenchedMass.value, delay, { min: minX, max: centerX });
    } else if (mass.status === 'falling') {
      moveMass(mass, delay, undefined, { min: 0, max: sceneHeight });
      const dist = posToSwing(mass, swingAngle.value);
      if (dist !== undefined) {
        mass.x = { pos: dist, v: 0, a: 0 };
        mass.y = { pos: 0, v: 0, a: 0 };
        mass.status = 'on-swing';
        addMassToSwing(mass);
      }
    }
  }
  return true;
});

const createRandomMass = (status: GameMassStatus) => {
  const colors = ['red', 'green', 'yellow', 'orange'];
  const color = getRandomItem(colors);
  const mass = 1 + getRandomInt(10);
  const size = 60 + getRandomInt(40);
  const type = getRandomItem(Object.keys(svgMap));
  const x =
    status === 'clenched'
      ? minX + getRandomInt(centerX - minX)
      : 100 + getRandomInt(leverLength / 2 - 200);
  const y = status === 'clenched' ? size : 0;

  return {
    mass,
    size,
    type,
    color,
    x: { pos: x, v: 0, a: 0 },
    y: { pos: y, v: 0, a: 0 },
    status,
  };
};

const startGame = () => {
  const swingedMass = createRandomMass('on-swing');
  const clenchedMass = createRandomMass('clenched');
  masses.value = [swingedMass, clenchedMass];
  addMassToSwing(swingedMass);
  isStarted.value = true;
  isPaused.value = false;
};

const switchState = () => {
  if (!isStarted.value) startGame();
  else isPaused.value = !isPaused.value;
  if (!isPaused.value) startDraw();
};
</script>
