<template>
  <div class="scene" :style="style">
    <Swing :rotation="props.swingRotation" />
    <ShapeFabric v-if="clenchedProps" :wrapper="Mass" v-bind="clenchedProps" />
    <ShapeFabric
      v-for="mass in attachedProps"
      :key="mass.id"
      :wrapper="Mass"
      v-bind="mass"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import Swing from './Swing.vue';
import Mass from './shapes/Mass.vue';
import ShapeFabric from './shapes/ShapeFabric.vue';
import { calcMassCoordinatesOnSwing } from '@/utils/calc';
import MassType from '@/interfaces/Mass';

const props = defineProps({
  swingRotation: { type: Number, default: 0 },
  attachedMasses: { type: Array as MassType[], default: () => [] },
  clenchedMass: { type: Object as MassType },
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

const attachedProps = computed(() =>
  props.attachedMasses.map(({ x, size, ...mass }: MassType) => ({
    ...mass,
    width: size,
    height: size,
    ...calcMassCoordinatesOnSwing(x, props.swingRotation),
    rotation: props.swingRotation,
  }))
);

const clenchedProps = computed(() =>
  props.clenchedMass
    ? {
        ...props.clenchedMass,
        width: props.clenchedMass.size,
        height: props.clenchedMass.size,
      }
    : null
);

console.log(props, clenchedProps);
</script>

<style scoped lang="scss">
.scene {
  position: relative;
  margin: 20px;
  border: 1px dashed black;
  overflow: hidden;
}
</style>
