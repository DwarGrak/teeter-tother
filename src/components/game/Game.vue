<template>
  <GlobalEvents
    @keydown.left="startMoveLeft"
    @keydown.right="startMoveRight"
    @keydown.down="dropMass"
    @keydown.space="switchState"
    @keyup="stopMove"
  />
  <Scene :swingRotation="swingAngle" :masses="positionedMasses" :score="score">
    <UI
      :started="isStarted"
      :paused="isPaused"
      :score="isStarted ? 0 : score"
    />
  </Scene>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { GlobalEvents } from 'vue-global-events';
import GameMass, { GameMassStatus } from '@/interfaces/GameMass';
import Scene from '../Scene.vue';
import UI from '../UI.vue';
import useClenchedMove from './useClenchedMove';
import useDraw from './useDraw';
import useSwing from './useSwing';
import { moveMass } from '@/services/MovableService';
import { posToSwing, swingToPos } from '@/services/SwingService';
import PositionedMass from '@/interfaces/PositionedMass';
import { getRandomInt, getRandomItem } from '@/utils/calc';
import { svgMap } from '../svg';
import { radToDeg } from '@/utils/angle';

const {
  state: {
    settings: {
      sceneWidth,
      sceneHeight,
      leverLength,
      speedMult,
      maxAngle,
      momentAcceleration,
      gravityAcceleration,
    },
  },
} = useStore();

const { swingAngle, addMassToSwing, rotateSwing } =
  useSwing(momentAcceleration);

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

const clenchedMass = computed<GameMass | undefined>(() =>
  masses.value.find(({ status }) => status === 'clenched')
);

const { startMoveLeft, startMoveRight, stopMove } = useClenchedMove(
  clenchedMass,
  speedMult
);

const dropMass = () => {
  if (clenchedMass.value === undefined) return;
  clenchedMass.value.x = { ...clenchedMass.value.x, v: 0, a: 0 };
  clenchedMass.value.y = {
    ...clenchedMass.value.y,
    v: 0,
    a: gravityAcceleration,
  };
  clenchedMass.value.status = 'falling';
};

const isStarted = ref(false);
const isPaused = ref(true);
const timer = ref(0);
const score = ref(0);

const { start: startDraw } = useDraw((delay: number) => {
  if (isPaused.value) return false;

  score.value = Date.now() - timer.value;
  rotateSwing(delay);

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

  if (Math.abs(radToDeg(swingAngle.value)) > maxAngle) {
    finishGame();
    return false;
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

const finishGame = () => {
  isStarted.value = false;
  isPaused.value = true;
};

const startGame = () => {
  const swingedMass = createRandomMass('on-swing');
  const clenchedMass = createRandomMass('clenched');
  masses.value = [swingedMass, clenchedMass];
  addMassToSwing(swingedMass);
  timer.value = Date.now();
  isStarted.value = true;
  isPaused.value = false;
};

const switchState = () => {
  if (!isStarted.value) startGame();
  else isPaused.value = !isPaused.value;
  if (!isPaused.value) startDraw();
};
</script>
