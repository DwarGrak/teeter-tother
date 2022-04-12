<template>
  <div class="scene" :style="style">
    <Swing :rotation="props.swingRotation" />
    <ShapeFabric
      v-for="mass in masses"
      :key="mass.id"
      :wrapper="Mass"
      v-bind="mass"
    />
    <div v-if="!props.started" class="scene__banner">
      Press space to start...
    </div>
    <div v-else-if="props.paused" class="scene__banner">
      Press space to continue...
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import Swing from './Swing.vue';
import Mass from './shapes/Mass.vue';
import ShapeFabric from './shapes/ShapeFabric.vue';
import PositionedMass from '@/interfaces/PositionedMass';

const props = defineProps({
  swingRotation: { type: Number, default: 0 },
  masses: { type: Array as PositionedMass[], default: () => [] },
  started: { type: Boolean, default: false },
  paused: { type: Boolean, default: false },
});

const {
  state: {
    settings: { sceneWidth, sceneHeight },
  },
} = useStore();

const style = computed(() => ({
  width: sceneWidth + 'px',
  height: sceneHeight + 'px',
}));
</script>

<style scoped lang="scss">
.scene {
  position: relative;
  margin: 20px;
  border: 1px dashed black;
  overflow: hidden;
  
  &__banner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    font-size: 48px;
    padding-top: 200px;
  }
}
</style>
