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
import useScore from './useScore';
import useDrop from './useDrop';
import useGameState from './useGameState';
import { moveMass } from '@/services/MovableService';
import { posToSwing, swingToPos } from '@/services/SwingService';
import PositionedMass from '@/interfaces/PositionedMass';
import { getRandomInt, getRandomItem } from '@/utils/calc';
import { svgMap, svgName } from '../svg';
import { radToDeg } from '@/utils/angle';

// store
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
      dropDelay,
      gameOverMass,
    },
  },
} = useStore();

const minX = (sceneWidth - leverLength) / 2;
const centerX = sceneWidth / 2;

//vars & comps
const masses = ref<GameMass[]>([]);

const clenchedMass = computed<GameMass | undefined>(() =>
  masses.value.find(({ status }) => status === 'clenched')
);

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

// uses
const { swingAngle, initSwing, addMassToSwing, rotateSwing } =
  useSwing(momentAcceleration);
const { score, clearScore, updateScore } = useScore();
const { startMoveLeft, startMoveRight, stopMove } = useClenchedMove(
  clenchedMass,
  speedMult
);
const { isStarted, isPaused, setStartState, setFinishState } = useGameState();

// check end game
const checkMaxAngle = (): boolean =>
  Math.abs(radToDeg(swingAngle.value)) > maxAngle;

const checkMaxMass = (): boolean => {
  let leftMass = 0;
  let rightMass = 0;

  for (let mass of masses.value) {
    if (mass.status !== 'on-swing') continue;
    if (mass.x.pos < 0) leftMass += mass.mass;
    else rightMass += mass.mass;
  }

  return leftMass >= gameOverMass || rightMass >= gameOverMass;
};

const checkGameEnd = (massAddedToSwing: boolean): boolean => {
  return checkMaxAngle() || (massAddedToSwing && checkMaxMass());
};

// draw
const moveClenchedMass = (mass: GameMass, delay: number) =>
  moveMass(mass, delay, {
    min: minX,
    max: minX + leverLength,
  });

const moveFallingMass = (mass: GameMass, delay: number): boolean => {
  moveMass(mass, delay, undefined, { min: 0, max: sceneHeight });
  const dist = posToSwing(mass, swingAngle.value);
  if (dist !== undefined && dist > -leverLength / 2) {
    mass.x = { pos: dist, v: 0, a: 0 };
    mass.y = { pos: 0, v: 0, a: 0 };
    mass.status = 'on-swing';
    addMassToSwing(mass);
    return true;
  }
  return false;
};

const { start: startDraw } = useDraw((now: number, delay: number) => {
  if (isPaused.value) return false;

  updateScore();
  rotateSwing(delay);

  let massAddedToSwing = false;
  for (let mass of masses.value) {
    if (mass.status === 'clenched') {
      moveClenchedMass(mass, delay);
    } else if (mass.status === 'falling') {
      massAddedToSwing = massAddedToSwing || moveFallingMass(mass, delay);
    }
  }

  if (checkGameEnd(massAddedToSwing)) {
    finishGame();
    return false;
  }

  checkDropTimer(now);

  return true;
});

// add mass
const createRandomMass = (status: GameMassStatus): GameMass => {
  const colors = ['red', 'green', 'yellow', 'orange'];
  const color = getRandomItem(colors);
  const mass = 1 + getRandomInt(10);
  const size = 60 + mass * 4;
  const type = getRandomItem(Object.keys(svgMap)) as svgName;
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

const addNewClenchedMass = () => {
  masses.value.push(createRandomMass('clenched'));
};

const addStartMasses = () => {
  const swingedMass = createRandomMass('on-swing');
  const clenchedMass = createRandomMass('clenched');
  masses.value = [swingedMass, clenchedMass];
  addMassToSwing(swingedMass);
};

// drop mass
const { dropMass, checkDropTimer, clearDropTimer } = useDrop(
  clenchedMass,
  addNewClenchedMass,
  gravityAcceleration,
  dropDelay
);

// pause/start/end game
const switchState = () => {
  if (!isStarted.value) startGame();
  else isPaused.value = !isPaused.value;
  if (!isPaused.value) startDraw();
};

const startGame = () => {
  clearScore();
  initSwing();
  setStartState();
  addStartMasses();
};

const finishGame = () => {
  setFinishState();
  clearDropTimer();
};
</script>
